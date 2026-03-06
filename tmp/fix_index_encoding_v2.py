
import os
import re

file_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\index.html'

# Common corruption mapping
# These are typical when Latin-1 encoded files are incorrectly handled
replacements = {
    r'Musestico': 'Museístico',
    r'Musestico': 'Museístico',
    r'Histrica': 'Histórica',
    r'Histrica': 'Histórica',
    r'galera': 'galería',
    r'galea': 'galería',
    r'ms': 'más',
    r'm': 'más',
    r'Rcords': 'Récords',
    r'lite': 'élite',
    r'Poltica': 'Política',
    r'Trminos': 'Términos',
    r'Ubicacin': 'Ubicación',
    r'Contrasea': 'Contraseña',
    r' 2026': '© 2026',
    r'data-i18n="histrica"': 'data-i18n="historica"',
    r'data-i18n="ubicacin"': 'data-i18n="ubicacion"',
}

with open(file_path, 'rb') as f:
    content = f.read()

# Try to decode as latin-1 first if utf-8 fails or seems wrong
try:
    decoded = content.decode('utf-8', errors='ignore')
    # If the file was corrupted, it might have actual invalid bytes
    # Let's try to replace common patterns even if they are just the literal strings from the tool output
    for old, new in replacements.items():
        decoded = decoded.replace(old, new)
        # Also try replacing with potential raw byte representations if needed
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(decoded)
    print("Replacements done successfully in index.html (Regex/Standard)")
except Exception as e:
    print(f"Error: {e}")
