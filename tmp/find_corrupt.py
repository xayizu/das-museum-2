
import os
import re

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

matches = set(re.findall(r'.{0,15}.{0,15}', text))
for m in matches:
    print(m.strip())
