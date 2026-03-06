
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('lideres_t\ufffdticos', 'lideres_tácticos')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fix applied to index.html fourth pass")
