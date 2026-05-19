{
    'name': 'D&D Partners Theme',
    'description': 'Modern Tech Theme for D&D Partners S.r.l.',
    'category': 'Theme/Corporate',
    'summary': 'IT Consulting, AI Agents, Software Development, Odoo Partner',
    'sequence': 100,
    'version': '19.0.1.0.0',
    'depends': ['theme_common'],
    'data': [
        'data/generate_primary_template.xml',
        'data/menus.xml',
        'views/layout.xml',
        'views/pages/home.xml',
        'views/pages/about.xml',
        'views/pages/services.xml',
        'views/pages/portfolio.xml',
        'views/pages/contact.xml',
        'views/pages/certifications.xml',
        'views/snippets/s_ded_hero.xml',
        'views/snippets/s_ded_services.xml',
        'views/snippets/s_ded_stats.xml',
        'views/snippets/s_ded_about.xml',
        'views/snippets/s_ded_partners.xml',
        'views/snippets/s_ded_cta.xml',
        'views/snippets/s_ded_team.xml',
        'views/snippets/s_ded_portfolio.xml',
        'views/snippets/s_ded_testimonials.xml',
        'views/snippets/s_ded_tech_stack.xml',
        'views/new_page_template.xml',
        'views/images.xml',
    ],
    'configurator_snippets': {
        'homepage': ['s_ded_hero', 's_ded_services', 's_ded_stats', 's_ded_cta'],
    },
    'author': 'D&D Partners S.r.l.',
    'website': 'https://www.dedpartners.com',
    'license': 'LGPL-3',
    'assets': {
        'web._assets_primary_variables': [
            'theme_ded_partners/static/src/scss/primary_variables.scss',
        ],
        ('prepend', 'web._assets_frontend_helpers'): [
            'theme_ded_partners/static/src/scss/bootstrap_overridden.scss',
        ],
        'website.assets_frontend': [
            'theme_ded_partners/static/src/scss/theme.scss',
            'theme_ded_partners/static/src/js/ded_effects.js',
        ],
        'website.assets_editor': [
            'theme_ded_partners/static/src/js/tour.js',
        ],
    }
}
