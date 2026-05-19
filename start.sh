#!/bin/bash
# ============================================================
# D&D Partners Theme - Avvio rapido con Docker
# ============================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
ORANGE='\033[0;33m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   D&D Partners Theme — Odoo 17 Docker       ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════╝${NC}"
echo ""

# Check Docker
if ! command -v docker &>/dev/null; then
  echo "❌ Docker non trovato. Scaricalo da: https://www.docker.com/products/docker-desktop"
  exit 1
fi

if ! docker info &>/dev/null; then
  echo "❌ Docker non è in esecuzione. Avvia Docker Desktop e riprova."
  exit 1
fi

echo -e "${GREEN}✅ Docker trovato${NC}"
echo ""

# Go to script directory
cd "$(dirname "$0")"

# Start containers
echo "🚀 Avvio Odoo 17 + PostgreSQL..."
docker compose up -d

echo ""
echo "⏳ Attendo che Odoo sia pronto (30-60 secondi)..."

# Wait for Odoo to be ready
MAX_WAIT=120
ELAPSED=0
while ! curl -s http://localhost:8069/web/database/selector &>/dev/null; do
  sleep 3
  ELAPSED=$((ELAPSED + 3))
  if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo "⚠️  Timeout. Controlla: docker compose logs odoo"
    break
  fi
  echo -n "."
done

echo ""
echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ ODOO È PRONTO!                         ║${NC}"
echo -e "${GREEN}╠══════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}║   🌐  http://localhost:8069                  ║${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}║   SETUP INIZIALE:                           ║${NC}"
echo -e "${GREEN}║   1. Vai su http://localhost:8069            ║${NC}"
echo -e "${GREEN}║   2. Crea database: odoo                     ║${NC}"
echo -e "${GREEN}║   3. Email: admin@example.com                ║${NC}"
echo -e "${GREEN}║   4. Password: admin                         ║${NC}"
echo -e "${GREEN}║   5. Installa modulo «Website»               ║${NC}"
echo -e "${GREEN}║   6. Vai su Website → Configurazione → Temi ║${NC}"
echo -e "${GREEN}║   7. Attiva «D&D Partners Theme»             ║${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════╝${NC}"
echo ""

# Open browser on Mac
if command -v open &>/dev/null; then
  sleep 2
  open http://localhost:8069
fi
