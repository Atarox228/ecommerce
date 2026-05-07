import Papa from 'papaparse';

const CACHE_TTL = Number(process.env.CACHE_TTL_SECONDS || 3600) * 1000;

let cache = { ts: 0, data: null };

function parsePrice(raw) {
  if (raw == null) return 0;

  const s = String(raw).trim();
  if (s === '') return 0;

  let cleaned = s.replace(/[^0-9.,-]/g, '');

  if (cleaned.indexOf('.') !== -1 && cleaned.indexOf(',') !== -1) {
    cleaned = cleaned.replace(/\./g, '');
    cleaned = cleaned.replace(/,/g, '.');
  } else {
    const dotCount = (cleaned.match(/\./g) || []).length;
    const commaCount = (cleaned.match(/,/g) || []).length;

    if (dotCount > 0 && commaCount === 0) {
      cleaned = cleaned.replace(/\./g, '');
    }

    if (commaCount > 0 && dotCount === 0) {
      cleaned = cleaned.replace(/,/g, '.');
    }
  }

  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

function normalizeHeader(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '_');
}

async function loadCatalogoData() {
  const now = Date.now();

  if (cache.data && now - cache.ts < CACHE_TTL) {
    return cache.data;
  }

  const SHEET_ID = process.env.SHEET_ID || '';
  const GID = process.env.GID || '';

  if (!SHEET_ID || !GID) {
    throw new Error('Server not configured: missing SHEET_ID or GID');
  }

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;
  const r = await fetch(url, { cache: 'no-store' });

  if (!r.ok) {
    throw new Error(`Failed to fetch sheet: ${r.status}`);
  }

  const text = await r.text();
  const parsed = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  if (parsed.errors?.length) {
    throw new Error(parsed.errors[0].message || 'CSV parse error');
  }

  const items = (parsed.data || []).map((row) => {
    const normalized = {};

    Object.entries(row).forEach(([key, value]) => {
      normalized[normalizeHeader(key)] = typeof value === 'string' ? value.trim() : value;
    });

    return normalized;
  });

  const packs = items.map((it, idx) => {
    const id = String(it.id ?? `row_${idx + 1}`).trim();
    const nombre = String(it.nombre ?? '').trim();
    const rawPrecio = String(it.precio ?? '').trim();
    const precio = parsePrice(rawPrecio);
    const imagen = String(it.imagen_url ?? it.imagen ?? '').trim();

    return {
      id,
      nombre,
      precio,
      imagen,
      stock: true,
    };
  });

  const data = { packs, promos: [], productos: [] };

  cache = { ts: now, data };

  return data;
}

export async function handleCatalogoRequest(req, res) {
  if (req?.method && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await loadCatalogoData();
    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load catalogo from sheet', details: String(err) });
  }
}
