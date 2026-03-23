import os
import re

service_dir = r"e:\Durgesh work\lesca-tech\service"

items = [
    ("pp-frp-scrubber.html", "PP FRP Scrubber"),
    ("pp-frp-tanks.html", "PP FRP Tanks"),
    ("storage-tank.html", "Storage Tanks"),
    ("pp-frp-pipe.html", "PP FRP Pipe"),
    ("frp-reactor.html", "FRP Reactor"),
    ("high-pressure-blower.html", "High Pressure Blower"),
    ("centrifugal-blower.html", "Centrifugal Blower"),
    ("dust-collector.html", "Dust Collector"),
    ("hvac-duct.html", "HVAC Duct"),
    ("mild-steel-structure.html", "Mild Steel Structure"),
    ("frp-pressure-vessel.html", "FRP Pressure Vessel"),
    ("frp-pipes.html", "FRP Pipes"),
    ("solar-system-installation-service.html", "Solar System Installation\n                                        Service")
]

for filename in os.listdir(service_dir):
    if not filename.endswith(".html"):
        continue
    filepath = os.path.join(service_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = re.compile(r'(<h2 class="page-category-list-title">Explore Our Services</h2>\s*)<ul>.*?</ul>', re.DOTALL)
    
    if pattern.search(content):
        new_ul = "<ul>\n"
        for href, text in items:
            if href == filename:
                new_ul += f'                                <li class="active"><a href="{href}">{text}</a></li>\n'
            else:
                new_ul += f'                                <li><a href="{href}">{text}</a></li>\n'
        new_ul += "                            </ul>"
        
        new_content = pattern.sub(r'\g<1>' + new_ul, content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")
    else:
        print(f"List not found in {filename}")
