
import os

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

replacements = {
    'Musestico': 'Museístico',
    'Histrica': 'Histórica',
    'galera': 'galería',
    'ms': 'más',
    'Rcords': 'Récords',
    'lite': 'élite',
    'participa': '¡participa',
    'Poltica': 'Política',
    'Trminos': 'Términos',
    'Ubicacin': 'Ubicación',
    'Contrasea': 'Contraseña',
    'Histrica': 'Histórica',
    'Ubicacin': 'Ubicación',
    'data-i18n="histrica"': 'data-i18n="historica"',
    'data-i18n="ubicacin"': 'data-i18n="ubicacion"',
    'data-i18n="informacin"': 'data-i18n="informacion"',
    'data-i18n="poltica_de_privacidad"': 'data-i18n="poltica_de_privacidad_1"',
    'data-i18n="trminos_de_uso"': 'data-i18n="trminos_de_uso_1"',
    'placeholder=""': 'placeholder="••••••••"',
    ' 2026': '© 2026',
}

with open(file_path, 'rb') as f:
    content = f.read()

# We need to handle the specific corrupted bytes. 
# The symbol  often comes from latin-1 encoding being read as utf-8 or vice versa.
# In the terminal output it showed up as , but the actual bytes might vary.
# Let's try to decode as latin-1 and then encode as utf-8 after replacing.

try:
    decoded_content = content.decode('utf-8', errors='replace')
    for old, new in replacements.items():
        decoded_content = decoded_content.replace(old, new)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(decoded_content)
    print("Replacements done successfully in index.html")
except Exception as e:
    print(f"Error: {e}")
