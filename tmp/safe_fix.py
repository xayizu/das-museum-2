
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

with open(file_path, 'r', encoding='utf-8', errors='replace') as f:
    text = f.read()

replacements = {
    'Hist\ufffdrica': 'Histórica',
    'ubicaci\ufffdn': 'ubicación',
    'informaci\ufffdn': 'información',
    'pol\ufffdtica': 'política',
    't\ufffdrminos': 'términos',
    'B\ufffdsqueda': 'Búsqueda',
    'Colecci\ufffdn': 'Colección',
    'Sesi\ufffdn': 'Sesión',
    't\ufffdticos': 'tácticos',
    'L\ufffdderes': 'Líderes',
    'AUTENTICACI\ufffdN': 'AUTENTICACIÓN',
    'MEN\ufffdS': 'MENÚS',
    'Men\ufffd': 'Menú',
    'Secci\ufffdn': 'Sección',
    'P\ufffdGINA': 'PÁGINA',
    '\ufffdNDICE': 'ÍNDICE',
    'EDICI\ufffdN': 'EDICIÓN',
    '\ufffdnico': 'Único',
    '\ufffdnica': 'Única',
    'Muse\ufffdstico': 'Museístico',
    'm\ufffds': 'más',
    'veh\ufffdculos': 'vehículos',
    'arquitect\ufffdnica': 'arquitectónica',
    'cl\ufffdsico': 'clásico',
    'Divisi\ufffdn': 'División',
    'D\ufffda/Noche': 'Día/Noche',
    'Misi\ufffdn': 'Misión',
    'Visi\ufffdn': 'Visión',
    'hist\ufffdrica': 'histórica',
    'n\ufffdmero': 'número',
    'acci\ufffdn': 'acción',
    'galer\ufffda': 'galería',
    'Desaf\ufffdo': 'Desafío',
    'p\ufffdgina': 'página',
    'Contrase\ufffda': 'Contraseña',
    'Ubicaci\ufffdn': 'Ubicación',
    'R\ufffdcords': 'Récords',
    '\ufffdlite': 'élite',
    'Pol\ufffdtica': 'Política',
    'T\ufffdrminos': 'Términos',
    'histrico">Hist\ufffdrico': 'histrico">Histórico',
    '\ufffd©': '©',
    'Estad\ufffdsticas': 'Estadísticas',
    '\ufffd¡participa': '¡participa',
    '\ufffd\u00e9lite': 'élite',
    '\ufffdParticipa': '¡Participa',
    '\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd': '••••••••'
}

for old, new in replacements.items():
    text = text.replace(old, new)
    text = text.replace(old.upper(), new.upper())
    text = text.replace(old.title(), new.title())

# Write back as utf-8 safely
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Targeted replacements done safely without mutating original layout")
