import { handleCatalogoRequest } from '../catalogo-service.js';

export default function handler(req, res) {
  return handleCatalogoRequest(req, res);
}
