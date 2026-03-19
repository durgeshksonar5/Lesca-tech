import os
import re

cdn_link = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">'

pages = [
    'index.html',
    'about.html',
    'service.html',
    'gallery.html',
    'contact.html',
    'service/service-detail-1.html'
]

# Regex to find any link pointing to all.min.css (could be vendor/all.min.css or ../vendor/all.min.css)
pattern = re.compile(r'<link\s+[^>]*href=["\'](?:[^"\']*/)?all\.min\.css["\'][^>]*>', re.IGNORECASE)

for page in pages:
    if os.path.exists(page):
        with open(page, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if pattern.search(content):
            new_content = pattern.sub(cdn_link, content)
            with open(page, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {page}")
        else:
            print(f"No match found in {page}")
