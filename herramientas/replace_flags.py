import os
import re

dir_path = r"c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public"

span_es = '<span class="flag-es font-bold text-xs tracking-widest uppercase">ESP</span>'
span_en = '<span class="flag-en hidden font-bold text-xs tracking-widest uppercase">EN</span>'
span_ec = '<span class="flag-ec hidden font-bold text-xs tracking-widest uppercase">QU</span>'

replacement = f"{span_es}\n                        {span_en}\n                        {span_ec}"

pattern = re.compile(r'<svg class="flag-es"[\s\S]*?</svg>\s*<svg class="flag-en hidden"[\s\S]*?</svg>\s*<svg class="flag-ec hidden"[\s\S]*?</svg>')

changed_files = []

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            if pattern.search(content):
                new_content = pattern.sub(replacement, content)
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                changed_files.append(filepath)

print(f"Updated {len(changed_files)} files:")
for f in changed_files:
    print(f" - {f}")
