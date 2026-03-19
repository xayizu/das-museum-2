import os
import re
import sys

def get_next_version(main_js_path):
    """Lee main.js para encontrar la versión actual e incrementarla."""
    try:
        with open(main_js_path, 'r', encoding='utf-8') as f:
            content = f.read()
            # Busca: const VERSION = '403';
            match = re.search(r"const VERSION = ['\"](\d+)['\"]", content)
            if match:
                current_version = int(match.group(1))
                return str(current_version + 1)
    except Exception as e:
        print(f"Error leyendo versión en main.js: {e}")
    return "500" # Fallback si algo falla

def update_version(root_dir):
    main_js_path = os.path.join(root_dir, 'js', 'main.js')
    new_version = get_next_version(main_js_path)
    
    print(f"🚀 Iniciando Bumper de Versión: v={new_version}")
    
    # Patrones de búsqueda
    # 1. Busca ?v= seguido de números (ya existente)
    pattern_v = re.compile(r'v=\d+')
    
    # 2. Busca scripts y links que no tengan versión para añadírsela
    # Captura el src/href y se asegura de que sea un archivo local (.js o .css)
    pattern_js = re.compile(r'(src=["\'])(?!http|//)(.*?\.js)(\?(?:v=\d+|[^"\'>]*))?([\s"\'])')
    pattern_css = re.compile(r'(href=["\'])(?!http|//)(.*?\.css)(\?(?:v=\d+|[^"\'>]*))?([\s"\'])')

    # 3. Meta tags de cache (para forzar al móvil)
    cache_meta = '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">\n    <meta http-equiv="Pragma" content="no-cache">\n    <meta http-equiv="Expires" content="0">'

    count = 0
    for root, dirs, files in os.walk(root_dir):
        # Excluir carpetas críticas
        if 'Tour_Virtual' in dirs:
            dirs.remove('Tour_Virtual')
        if 'recursos' in dirs: # No solemos versionar imágenes/audio directamente en el HTML de esta forma
            dirs.remove('recursos')
            
        for file in files:
            file_path = os.path.join(root, file)
            
            # Solo procesar HTML, JS y CSS
            if not (file.endswith('.html') or file.endswith('.js') or file.endswith('.css')):
                continue

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
                original_content = content
                
                # A. Reemplazar versiones existentes v=XXX
                new_content = pattern_v.sub(f'v={new_version}', content)
                
                # B. Inyectar versión en archivos que no la tengan (solo en HTML)
                if file.endswith('.html'):
                    # JS: src="script.js" -> src="script.js?v=XXX"
                    new_content = pattern_js.sub(lambda m: f"{m.group(1)}{m.group(2)}?v={new_version}{m.group(4)}", new_content)
                    # CSS: href="style.css" -> href="style.css?v=XXX"
                    new_content = pattern_css.sub(lambda m: f"{m.group(1)}{m.group(2)}?v={new_version}{m.group(4)}", new_content)
                    
                    # C. Asegurar Meta Tags de Cache en el <head>
                    if '<head>' in new_content and 'Cache-Control' not in new_content:
                        new_content = new_content.replace('<head>', f'<head>\n    {cache_meta}')

                # D. Caso especial para la constante VERSION en main.js
                if file == 'main.js':
                    new_content = re.sub(r"const VERSION = ['\"]\d+['\"]", f"const VERSION = '{new_version}'", new_content)

                # Si hubo cambios, guardar
                if new_content != original_content:
                    try:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"✅ [%s] v={new_version}" % os.path.relpath(file_path, root_dir))
                        count += 1
                    except Exception as e:
                        print(f"❌ Error guardando {file}: {e}")

    print(f"\n✨ ¡Listo! Se actualizaron {count} archivos a la versión {new_version}.")
    print("💡 IMPORTANTE: Recuerda subir estos cambios a tu servidor/Cloudflare para que surta efecto.")

if __name__ == "__main__":
    # Ejecutar sobre la carpeta 'public'
    base_path = os.path.join(os.path.dirname(__file__), '..', 'public')
    update_version(os.path.abspath(base_path))
