
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\js\i18n.js'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

replacements = {
    'BÃºsqueda': 'Búsqueda',
    'InformaciÃ³n': 'Información',
    'UbicaciÃ³n': 'Ubicación',
    'PolÃ\xadtica': 'Política',
    'TÃ©rminos': 'Términos',
    'pÃ¡gina': 'página',
    'travÃ©s': 'través',
    'EjÃ©rcito': 'Ejército',
    'aÃ±o': 'año',
    'ingenierÃ\xada': 'ingeniería',
    'VisÃ\xadtanos': 'Visítanos',
    'PolÃ\xadtica': 'Política',
    'PolÃtica': 'Política'
}
# wait, it's easier to just encode to latin1 and decode to utf8 for those corrupted parts, or just explicit manually.
# Let's fix explicitly based on what we replaced in multi_replace_file_content

reps2 = {
    'BÃºsqueda': 'Búsqueda',
    'InformaciÃ³n': 'Información',
    'UbicaciÃ³n': 'Ubicación',
    'PolÃtica': 'Política',
    'TÃ©rminos': 'Términos',
    'pÃ¡gina': 'página',
    'travÃ©s': 'través',
    'EjÃ©rcito': 'Ejército',
    'aÃ±o': 'año',
    'ingenierÃa': 'ingeniería',
    'VisÃtanos': 'Visítanos',
    'PolÃ\xadtica': 'Política',
    'VisÃ\xadtanos': 'Visítanos',
    'ingenierÃ\xada': 'ingeniería'
}

for old, new in reps2.items():
    text = text.replace(old, new)


with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fixed i18n.js corruptions")
