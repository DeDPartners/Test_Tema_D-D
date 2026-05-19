{
    'name': 'D&D Partners Theme',
    'version': '19.0.1.0.0',
    'category': 'Theme',
    'summary': 'D&D Partners Corporate Theme',
    'author': 'D&D Partners',
    'depends': [
        'website',
        'website_sale',
        'website_blog',
    ],
    'data': [
        'views/templates.xml',
        'views/snippets.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'theme_ded_partners/static/src/scss/style.scss',
            'theme_ded_partners/static/src/js/main.js',
        ],
    },
    'installable': True,
    'application': False,
}