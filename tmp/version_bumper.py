import os
import re

def update_version(root_dir, old_version, new_version):
    print(f"Buscando archivos para actualizar de v={old_version} a v={new_version}...")
    
    # Patrones para buscar (pueden ser ?v=XXX o &v=XXX)
    patterns = [
        (re.compile(re.escape(f'v={old_version}')), f'v={new_version}'),
        # También buscamos scripts recién agregados que podrían no tener versión o tener una genérica
        (re.compile(r'realtime\.js(\?v=\d+\.\d+)?'), f'realtime.js?v={new_version}'),
    ]

    count = 0
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                content = None
                encodings = ['utf-8', 'latin-1', 'cp1252']
                
                for enc in encodings:
                    try:
                        with open(file_path, 'r', encoding=enc) as f:
                            content = f.read()
                        break
                    except:
                        continue
                
                if content:
                    new_content = content
                    for pattern, replacement in patterns:
                        new_content = pattern.sub(replacement, new_content)
                    
                    if new_content != content:
                        for enc in encodings:
                            try:
                                with open(file_path, 'w', encoding=enc) as f:
                                    f.write(new_content)
                                print(f"Actualizado: {file_path}")
                                count += 1
                                break
                            except:
                                continue
    print(f"Total de archivos actualizados: {count}")

if __name__ == "__main__":
    # La versión actual detectada era 308, subimos a 309
    update_version('public', '308', '309')
