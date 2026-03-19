import os
import re
import xml.etree.ElementTree as ET

def extract_text_from_xml(xml_content):
    # Namespace for DrawingML
    ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main'}
    root = ET.fromstring(xml_content)
    text_elements = root.findall('.//a:t', ns)
    return ' '.join([el.text for el in text_elements if el.text])

slides_dir = r"c:\Users\Hp\Downloads\yarnex\ppt_content\ppt\slides"
output_file = r"c:\Users\Hp\Downloads\yarnex\ppt_text_summary.txt"

with open(output_file, "w", encoding="utf-8") as f:
    # Sort files slide1.xml, slide2.xml, ..., slideN.xml
    files = [fn for fn in os.listdir(slides_dir) if fn.startswith("slide") and fn.endswith(".xml")]
    files.sort(key=lambda x: int(re.search(r'\d+', x).group()))
    
    for filename in files:
        f.write(f"--- {filename} ---\n")
        path = os.path.join(slides_dir, filename)
        try:
            with open(path, "r", encoding="utf-8") as xml_file:
                content = xml_file.read()
                text = extract_text_from_xml(content)
                f.write(text + "\n\n")
        except Exception as e:
            f.write(f"Error reading {filename}: {str(e)}\n\n")

print(f"Summary written to {output_file}")
