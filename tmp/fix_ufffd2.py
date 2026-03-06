
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

replacements = {
    'Exhibici\ufffdn': 'Exhibición',
    'caballer\ufffda': 'caballería',
    'Estrat\ufffdgicos': 'Estratégicos',
    'ESTRAT\ufffdGICOS': 'ESTRATÉGICOS',
    'Estad\ufffdsticas': 'Estadísticas',
    'B\ufffdSQUEDA': 'BÚSQUEDA',
    'ingenier\ufffda': 'ingeniería',
    'a\ufffdos': 'años',
    'Artiller\ufffda': 'Artillería',
    'H\ufffdroes': 'Héroes',
    'Configuraci\ufffdn': 'Configuración',
    'P\ufffdrez': 'Pérez',
    't\ufffdticos': 'tácticos',
    '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd': '••••••••',
    'Animaci\ufffdn': 'Animación',
    'trav\ufffds': 'través',
    'R\ufffdnking': 'Ránking',
    'Restauraci\ufffdn': 'Restauración',
    '\ufffd\u00e9lite': 'élite', # 'élite' - let's do this safely
    'M\ufffdsica': 'Música',
    'TEL\ufffdFONO': 'TELÉFONO',
    'Galer\ufffda': 'Galería',
    'PA\ufffdOL': 'PAÑOL',
    'estrat\ufffdgica': 'estratégica',
    'D\ufffda': 'Día',
    'HIST\ufffdRICA': 'HISTÓRICA',
    'Hist\ufffdrica': 'Histórica',
    'ubicaci\ufffdn': 'ubicación',
    'UBICACI\ufffdN': 'UBICACIÓN',
    '\ufffdparticipa': '¡participa',
}
# handle the double symbol: 'élite' -> 'élite'
text = text.replace('\ufffd\u00e9lite', '\u00e9lite')

for old, new in replacements.items():
    text = text.replace(old, new)

# And clear the remaining standalone ones if any, or just inspect them!
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fix applied to index.html second pass")
