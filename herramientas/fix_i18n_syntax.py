import json
import os
import re

base_dir = r"c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\js"
i18n_path = os.path.join(base_dir, 'i18n.js')

with open(i18n_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace double quotes surrounding strings that contain newlines with backticks
# regex looks for: " then anything with a newline then "
# We must capture the inner content and put it in backticks.
new_content = re.sub(r'"([^"]*?\n[^"]*?)"', r'`\1`', content, flags=re.DOTALL)

with open(i18n_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed multiline strings in i18n.js.")
