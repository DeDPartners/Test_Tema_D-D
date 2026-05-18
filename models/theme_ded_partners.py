from odoo import models


class ThemeUtils(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_ded_partners_post_copy(self, mod):
        self.enable_view('website.template_footer_contact')
        self.enable_view('website.header_hamburger')
