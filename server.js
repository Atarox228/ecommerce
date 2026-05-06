import express from 'express';
import dotenv from 'dotenv';
import Papa from 'papaparse';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const SHEET_ID = process.env.SHEET_ID || '';
const GID = process.env.GID || ''; // sheet gid for InfoDada
const CACHE_TTL = Number(process.env.CACHE_TTL_SECONDS || 3600) * 1000; // ms

let cache = { ts: 0, data: null };

function parsePrice(raw) {
  if (raw == null) return 0;
  const s = String(raw).trim();
  if (s === '') return 0;
  // Remove currency symbols and spaces
  let cleaned = s.replace(/[^0-9.,-]/g, '');
  // If contains both dot and comma, assume dot as thousand sep and comma as decimal
  if (cleaned.indexOf('.') !== -1 && cleaned.indexOf(',') !== -1) {
    cleaned = cleaned.replace(/\./g, '');
    cleaned = cleaned.replace(/,/g, '.');
  } else {
    // If only dots and length suggests thousand separators (e.g. 13.700), remove dots
    const dotCount = (cleaned.match(/\./g) || []).length;
    const commaCount = (cleaned.match(/,/g) || []).length;
    if (dotCount > 0 && commaCount === 0) {
      // remove dots
      cleaned = cleaned.replace(/\./g, '');
    }
    if (commaCount > 0 && dotCount === 0) {
      // replace comma with dot
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

app.get('/api/catalogo', async (req, res) => {
  try {
    const now = Date.now();
    if (cache.data && now - cache.ts < CACHE_TTL) {
      return res.json(cache.data);
    }

    if (!SHEET_ID || !GID) {
      return res.status(500).json({ error: 'Server not configured: missing SHEET_ID or GID' });
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

    return res.json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to load catalogo from sheet', details: String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`Catalog proxy server running on http://localhost:${PORT}`);
});
