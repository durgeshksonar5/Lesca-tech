import os
import xml.etree.ElementTree as ET

def extract_text_from_ppt_xml(slide_xml_dir):
    all_text = []
    ns = {'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
          'p': 'http://schemas.openxmlformats.org/presentationml/2006/main'}
    
    # Sort slides by slide number
    slide_files = sorted([f for f in os.listdir(slide_xml_dir) if f.startswith('slide') and f.endswith('.xml')], 
                         key=lambda x: int(x.replace('slide', '').replace('.xml', '')))
    
    for slide_file in slide_files:
        tree = ET.parse(os.path.join(slide_xml_dir, slide_file))
        root = tree.getroot()
        slide_text = []
        for t in root.findall('.//a:t', ns):
            if t.text:
                slide_text.append(t.text.strip())
        
        if slide_text:
            all_text.append(f"--- Slide {slide_file.replace('slide', '').replace('.xml', '')} ---")
            all_text.append(" ".join(slide_text))
            
    return "\n\n".join(all_text)

if __name__ == "__main__":
    xml_dir = r"e:\Durgesh work\lesca-tech\ppt_contents\ppt\slides"
    result = extract_text_from_ppt_xml(xml_dir)
    with open("extracted_text_from_xml.txt", "w", encoding="utf-8") as f:
        f.write(result)
    print("Content extracted successfuly to extracted_text_from_xml.txt")
