
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

replacements = {
    'estrat\ufffdgicos': 'estratégicos',
    'lideres_t\ufffdticos': 'lideres_tácticos',
    '\ufffd¡participa': '¡participa',
}
for old, new in replacements.items():
    text = text.replace(old, new)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fix applied to index.html third pass")
