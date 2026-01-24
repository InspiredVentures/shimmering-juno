
import zipfile
import xml.etree.ElementTree as ET
import sys

def extract_text_from_docx(docx_path):
    try:
        with zipfile.ZipFile(docx_path, 'r') as z:
            with z.open('word/document.xml') as f:
                xml_content = f.read()
                
        root = ET.fromstring(xml_content)
        
        # XML namespace for Word
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        text = []
        for p in root.findall('.//w:p', ns):
            paragraph_text = []
            for t in p.findall('.//w:t', ns):
                if t.text:
                    paragraph_text.append(t.text)
            if paragraph_text:
                text.append(''.join(paragraph_text))
                
        return '\n'.join(text)
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    filename = "Mark Pattison - Brand Marketing Guide.docx"
    content = extract_text_from_docx(filename)
    with open("marketing_guide_content.txt", "w", encoding="utf-8") as f:
        f.write(content)
    print("Content extracted to marketing_guide_content.txt")
