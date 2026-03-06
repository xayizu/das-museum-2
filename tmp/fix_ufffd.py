
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    text = f.read()

replacements = {
    'B\ufffdsqueda': 'Búsqueda',
    'Hist\ufffdrica': 'Histórica',
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
    '\ufffdNo tienes cuent': '¿No tienes cuent',
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
    '\ufffdparticipa': '¡participa',
    'R\ufffdcords': 'Récords',
    '\ufffdlite': 'élite',
    'Pol\ufffdtica': 'Política',
    'T\ufffdrminos': 'Términos',
    '\ufffd©': '©',
    'histrico">Hist\ufffdrico': 'histrico">Histórico',
    '\ufffd©': '©',
    '\ufffd': '', # Any remaining ones we just delete for safety, wait, maybe not.
}

for old, new in replacements.items():
    if old != '\ufffd':
        text = text.replace(old, new)

# And clear the remaining standalone ones if any, or just inspect them!
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Fix applied to index.html")
