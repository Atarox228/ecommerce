import express from 'express';
import dotenv from 'dotenv';
import { handleCatalogoRequest } from './catalogo-service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/api/catalogo', handleCatalogoRequest);

app.listen(PORT, () => {
  console.log(`Catalog proxy server running on http://localhost:${PORT}`);
});
