#!/bin/bash
# ============================================================
# D&D Partners Theme - Git Update Script per Odoo SH
# Committa tutte le modifiche e pusha su Odoo SH
# ============================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
ORANGE='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   D&D Partners Theme — Odoo 19 Fix Push     ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════╝${NC}"
echo ""

# Change to repo root (where git lives)
cd "$(dirname "$0")"

echo -e "${ORANGE}📋 Modifiche apportate:${NC}"
echo "  ✅ version: 19.0.1.0.0 (era 1.0.0)"
echo "  ✅ depends: ['theme_common'] (rimosso website_sale)"
echo "  ✅ ir_asset.xml: sintassi <asset> Odoo 19"
echo "  ✅ generate_primary_template.xml: funzione corretta"
echo "  ✅ images.xml: rimossi model inesistenti"
echo "  ✅ layout.xml: semplificato footer override"
echo "  ✅ shop.xml: rimosso da data (no dipendenza website_sale)"
echo ""

# Show git status
echo -e "${BLUE}📦 Stato Git:${NC}"
git status --short

echo ""
echo -e "${ORANGE}Vuoi procedere con il commit e push? (y/N)${NC}"
read -r CONFIRM
if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
    echo "Annullato."
    exit 0
fi

# Stage all changes in theme_ded_partners
git add theme_ded_partners/
git add -f theme_ded_partners/__manifest__.py
git add -f theme_ded_partners/data/ir_asset.xml
git add -f theme_ded_partners/data/generate_primary_template.xml
git add -f theme_ded_partners/views/images.xml
git add -f theme_ded_partners/views/layout.xml
git add -f theme_ded_partners/views/pages/shop.xml

# Commit
git commit -m "[FIX] theme_ded_partners: Odoo 19 compatibility fixes

- version: 19.0.1.0.0
- depends: theme_common only (removed website/website_sale)
- ir_asset.xml: use <asset> shorthand (Odoo 19 syntax)
- generate_primary_template.xml: use _generate_primary_snippet_templates
- images.xml: remove invalid model references
- layout.xml: simplified header/footer
- shop.xml: removed from data list (no website_sale dependency)"

echo ""
echo -e "${GREEN}✅ Commit creato!${NC}"
echo ""

# Push to origin
echo -e "${BLUE}🚀 Push su Odoo SH...${NC}"
git push origin HEAD

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   ✅ PUSH COMPLETATO!                        ║${NC}"
echo -e "${GREEN}╠══════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}║   Ora vai su Odoo SH:                       ║${NC}"
echo -e "${GREEN}║   1. Aspetta che la build finisca (2-3 min)  ║${NC}"
echo -e "${GREEN}║   2. Vai su Apps → cerca 'D&D Partners'      ║${NC}"
echo -e "${GREEN}║   3. Installa il tema                        ║${NC}"
echo -e "${GREEN}║   4. Vai su Website → Scegli tema            ║${NC}"
echo -e "${GREEN}║                                              ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════╝${NC}"
echo ""
