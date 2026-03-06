
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

with open(file_path, 'rb') as f:
    data = f.read()

# find first occurrence of "Hist" and print following bytes
idx = data.find(b'Hist')
if idx != -1:
    print(f"Found 'Hist' at {idx}")
    print(f"Following bytes: {data[idx:idx+15]}")

idx2 = data.find(b'Contrase')
if idx2 != -1:
    print(f"Found 'Contrase' at {idx2}")
    print(f"Following bytes: {data[idx2:idx2+15]}")
