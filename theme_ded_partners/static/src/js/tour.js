/** @odoo-module */
import { registry } from "@web/core/registry";
import { _t } from "@web/core/l10n/translation";

registry.category("website_configurator_features").add("ded_partners_hero", {
    title: _t("D&D Hero Section"),
    description: _t("Full-screen hero with particle network and typing animation"),
    icon: "fa-rocket",
    suggestedImages: [],
});
