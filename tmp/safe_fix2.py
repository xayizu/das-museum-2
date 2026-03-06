
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    text = f.read()

replacements = {
    'M\ufffdsica': 'Música',
    '\ufffdparticipa': '¡participa',
    'Estrat\ufffdgicos': 'Estratégicos',
    'R\ufffdnking': 'Ránking',
    'Restauraci\ufffdn': 'Restauración',
    'Galer\ufffda': 'Galería',
    '\ufffd 2026': '© 2026',
    'estrat\ufffdgica': 'estratégica',
    'Exhibici\ufffdn': 'Exhibición',
    'ESTRAT\ufffdGICOS': 'ESTRATÉGICOS',
    'trav\ufffds': 'través',
    'Artiller\ufffda': 'Artillería',
    'H\ufffdroes': 'Héroes',
    'lideres_t\ufffdticos': 'lideres_tácticos',
    'a\ufffdos': 'años',
    '\ufffdNo tienes cuent': '¿No tienes cuent',
    'caballer\ufffda': 'caballería',
    'TEL\ufffdFONO': 'TELÉFONO',
    'Configuraci\ufffdn': 'Configuración',
    'P\ufffdrez': 'Pérez',
    'Animaci\ufffdn': 'Animación',
    'ingenier\ufffda': 'ingeniería',
    'D\ufffda': 'Día',
    'PA\ufffdOL': 'PAÑOL',
}

for old, new in replacements.items():
    text = text.replace(old, new)
    text = text.replace(old.upper(), new.upper())

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Final cleanup pass done")
