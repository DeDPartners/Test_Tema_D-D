#!/bin/bash
cd "$(dirname "$0")"
echo "🛑 Fermando Odoo..."
docker compose down
echo "✅ Odoo fermato. Dati preservati nei volumi Docker."
