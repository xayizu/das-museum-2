```python
import json
import os

base_dir = r"c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public"
dict_path = os.path.join(base_dir, 'es_dictionary.json')
i18n_path = os.path.join(base_dir, 'i18n.js')

with open(dict_path, 'r', encoding='utf-8') as f:
    es_dict = json.load(f)

# Comprehensive translations manually mapped for all key UI elements
# English and Kichwa (approximate for Kichwa based on common terms)
translations_db = {
    # Buttons, Nav, Common UI
    "inicio": {"en": "Home", "qu": "Kallari"},
    "explora": {"en": "Explore", "qu": "Maskay"},
    "informacin": {"en": "Information", "qu": "Willay"},
    "informacin_1": {"en": "Information", "qu": "Willay"},
    "contacto": {"en": "Contact", "qu": "Willana"},
    "buscar": {"en": "Search", "qu": "Maskay"},
    "buscar_1": {"en": "Search", "qu": "Maskay"},
    "eventos": {"en": "Events", "qu": "Ruraykuna"},
    "historia": {"en": "History", "qu": "Wiñay Kawsay"},
    "noticias": {"en": "News", "qu": "Willaykuna"},
    "visitas": {"en": "Visits", "qu": "Puruqkuna"},
    "preguntas": {"en": "FAQ", "qu": "Tapuykuna"},
    "donaciones": {"en": "Donations", "qu": "Quykuna"},
    "ver_detalles": {"en": "View Details", "qu": "Uku Rikuy"},
    "comprar_entradas": {"en": "Buy Tickets", "qu": "Yaykunakuna Randiy"},
    "comprar_tickets": {"en": "BUY TICKETS", "qu": "YAYKUNAKUNA RANDIY"},

    # Authentication & Forms
    "bienvenido": {"en": "Welcome", "qu": "Alli Shamushka"},
    "bienvenidos": {"en": "Welcome", "qu": "Alli Shamushka"},
    "iniciar_sesin": {"en": "Log In", "qu": "Yaykuy"},
    "contrasea": {"en": "Password", "qu": "Pakak Shimi"},
    "email_usuario": {"en": "Email / Username", "qu": "Chaski / Suti"},
    "crear_nueva_cuenta": {"en": "Create New Account", "qu": "Mushuk Yaykuy Ruray"},
    "olvid_su_contrasea": {"en": "Forgot your password?", "qu": "¿Pakak shimita qunqarkanki?"},
    "no_tiene_una_cuenta": {"en": "Don't have an account?", "qu": "¿Mana yaykuyta charinki?"},
    "ingrese_sus_credenciales_para_acceder_al": {"en": "Enter your credentials to access the complex.", "qu": "Yaykunapak qampaq killkakunata churay."},
    "portal_de_usuario": {"en": "User Portal", "qu": "Rurakpak Punku"},
    "escribe_para_buscar_contenidos_en_esta": {"en": "Type to search content on this page...", "qu": "Kay pankanpi maskanapak killkay..."},
    "escribe_para_buscar_contenidos_en_esta_1": {"en": "Type to search content on this page...", "qu": "Kay pankanpi maskanapak killkay..."},
    "tu_correo_electrnico": {"en": "Your email address", "qu": "Kikinpak chaski postawya"},

    # Museum Themes
    "museo_de_tanques": {"en": "Tank Museum", "qu": "Antawa Awqa Rikuchik"},
    "museo_de_tanques_1": {"en": "TANK MUSEUM", "qu": "ANTAWA AWQA RIKUCHIK"},
    "casa_histrica": {"en": "Historical House", "qu": "Ñawpa Wasi"},
    "la_casa_histrica": {"en": "THE HISTORICAL HOUSE", "qu": "ÑAWPA WASI"},
    "museos_tapi": {"en": "TAPI Museums", "qu": "TAPI Rikuchikkuna"},
    "museos_tapi_1": {"en": "TAPI Museums", "qu": "TAPI Rikuchikkuna"},
    "museo_historia": {"en": "Museum (History)", "qu": "Rikuchik (Wiñay Kawsay)"},
    "complejo": {"en": "Complex", "qu": "Tantachiy"},
    "musestico": {"en": "Museum", "qu": "Rikuchik"},
    "galera_3d": {"en": "3D Gallery", "qu": "3D Rikuchik"},
    "galera": {"en": "Gallery", "qu": "Rikuchik"},
    "colecciones": {"en": "Collections", "qu": "Tantachiskakuna"},
    "exposiciones": {"en": "Exhibitions", "qu": "Rikuchiykuna"},
    "vehculos": {"en": "Vehicles", "qu": "Antawakuna"},
    "vehculos_1": {"en": "Vehicles", "qu": "Antawakuna"},
    "blindados": {"en": "Armored Vehicles", "qu": "Awqa Antawakuna"},
    "entrar_al_museo_principal": {"en": "Enter Main Museum", "qu": "Hatun Rikuchikman Yaykuy"},
    "visitar_casona": {"en": "Visit Historical House", "qu": "Ñawpa Wasiman Rillay"},

    # Footer & Legal
    "red_de": {"en": "Network of", "qu": "Tantanakuy"},
    "museo_de_tanques": {"en": "Tank Museum", "qu": "Awqa Antawa Rikuchik"},
    "museo_de_1": {"en": "Museum of", "qu": "Awqa Antawakuna"},
    "museo_de": {"en": "Museum of", "qu": "Awqa Antawakuna"},
    "tanques": {"en": "Tanks", "qu": "Rikuchik"},
    "la_casa_1": {"en": "The Historical", "qu": "Ñawpa"},
    "la_casa": {"en": "The Historical", "qu": "Ñawpa"},
    "histrica": {"en": "House", "qu": "Wasi"},
    "acero_puro": {"en": "Pure", "qu": "Chuya"},
    "puro": {"en": "Steel", "qu": "Anta"},
    "legado_vivo": {"en": "Living", "qu": "Kawsay"},
    "vivo": {"en": "Legacy", "qu": "Wiñay"},
    "coleccin_permanente": {"en": "Permanent Collection", "qu": "Wiñaypaq Tantachiska"},
    "casa_histrica": {"en": "Historical House", "qu": "Ñawpa Wasi"},
    "inicio_tanques": {"en": "Tanks Home", "qu": "Antawa Kallariy"},
    "galera_de_blindados": {"en": "Armored Gallery", "qu": "Awqa Antawa Rikuchik"},
    "exhibiciones_y_eventos": {"en": "Exhibitions & Events", "qu": "Rikuchiykuna Ruraykunapash"},
    "preguntas_frecuentes": {"en": "Frequent Questions", "qu": "Tapuykuna"},
    "apoyo_y_donaciones": {"en": "Support & Donations", "qu": "Yanapay Quykunapash"},
    "inicio_casa": {"en": "House Home", "qu": "Wasi Kallariy"},
    "nuestra_historia": {"en": "Our History", "qu": "Ñukanchik Wiñay Kawsay"},
    "archivo_documental": {"en": "Documentary Archive", "qu": "Willay Kamukuna Wakaychiy"},
    "boletn_oficial": {"en": "Official Bulletin", "qu": "Willay Panka"},
    "exposiciones_poca": {"en": "Period Exhibitions", "qu": "Ñawpa Rikuchiykuna"},
    "exhibicin_actual": {"en": "Current Exhibition", "qu": "Kunan Rikuchiy"},
    
    "trminos_de_uso": {"en": "Terms of Use", "qu": "Rurana Kamachiykuna"},
    "trminos_de_uso_1": {"en": "Terms of Use", "qu": "Rurana Kamachiykuna"},
    "poltica_de_privacidad": {"en": "Privacy Policy", "qu": "Pakalla Kamachiykuna"},
    "poltica_de_privacidad_1": {"en": "Privacy Policy", "qu": "Pakalla Kamachiykuna"},
    "2026_museos_tapi_todos_los_derechos": {"en": "© 2026 TAPI Museums. All rights reserved.", "qu": "© 2026 TAPI Rikuchikkuna. Tukuy hayñikuna wakaychishkata."},
    "2026_museo_de_tanques_todos_los": {"en": "© 2026 Tank Museum. All rights reserved.", "qu": "© 2026 Awqa Antawa Rikuchik. Tukuy hayñikuna wakaychishkata."},
    "2026_museo_de_tanques_todos_los_1": {"en": "© 2026 Tank Museum. All rights reserved.", "qu": "© 2026 Awqa Antawa Rikuchik. Tukuy hayñikuna wakaychishkata."},
    "2026_la_casa_histrica_todos_los": {"en": "© 2026 Historical House. All rights reserved.", "qu": "© 2026 Ñawpa Wasi. Tukuy hayñikuna wakaychishkata."},
    "contacto_nico": {"en": "Main Contact", "qu": "Hatun Willana"},
    "estadsticas_del_complejo": {"en": "Complex Statistics", "qu": "Tantanakuypak Yupa"},
    "visitantes": {"en": "Visitors", "qu": "Puruqkuna"},
    "total_visitantes": {"en": "Total Visitors", "qu": "Tukuy Puruqkuna"},
    "piezas_de_archivo": {"en": "Archive Pieces", "qu": "Willay Kamukuna"},
    "piezas_de_archivo_1": {"en": "Archive Pieces", "qu": "Willay Kamukuna"},
    "vehculos_y_armas": {"en": "Vehicles & Weapons", "qu": "Antawa Ayñikunapash"},

    # Attributes (alt, placeholders)
    "animacin_tanque": {"en": "Tank Animation", "qu": "Antawa Awqa Kuyuy"},
    "animacin_caballo": {"en": "Horse Animation", "qu": "Kallpa Kuyuy"},
    "logo": {"en": "Logo", "qu": "Unancha"},
    "museos_tapi_logo": {"en": "TAPI Museums Logo", "qu": "TAPI Rikuchikkuna Unancha"},
    "m4_sherman_tank_side_profile": {"en": "M4 Sherman tank side profile", "qu": "M4 Sherman panpa rikuy"},
    "modern_tank_in_desert_camouflage": {"en": "Modern tank in desert camouflage", "qu": "Mushuk awqa antawa chaqi pachapi"},
    "t34_soviet_tank_monument": {"en": "T-34 soviet tank monument", "qu": "T-34 sovietico awqa antawa"},
    "leopard_2a4_on_field": {"en": "Leopard 2A4 on field", "qu": "Leopard 2A4 panpapi"},
    "light_tank_renault_ft17": {"en": "Light tank Renault FT-17", "qu": "Pishqa awqa antawa Renault FT-17"},
    "challenger_2_british_tank": {"en": "Challenger 2 British tank", "qu": "Challenger 2 Britanico awqa antawa"},
    "centurion_tank_on_display": {"en": "Centurion tank on display", "qu": "Centurion awqa antawa rikuchikpi"},
    "reloj_de_bolsillo_antiguo": {"en": "Antique Pocket Watch", "qu": "Ñawpa pacha reloj"},
    "libros_antiguos": {"en": "Antique Books", "qu": "Ñawpa Kamukuna"},
    "mobiliario_siglo_xviii": {"en": "18th Century Furniture", "qu": "XVIII pachamanta tiyarinakuna"},

    # Hero UI
    "acero_puro": {"en": "Pure <br/><span class=\"text-gray-400\" data-i18n=\"puro\">Steel</span>", "qu": "Chuya <br/><span class=\"text-gray-400\" data-i18n=\"puro\">Anta</span>"},
    "legado_vivo": {"en": "Living <br/><span class=\"text-accent-gold italic font-light\" data-i18n=\"vivo\">Legacy</span>", "qu": "Kawsak <br/><span class=\"text-accent-gold italic font-light\" data-i18n=\"vivo\">Rikuchiy</span>"},
    "siente_la_fuerza_bruta_de_ms": {"en": "Feel the brute force of over 150 restored armored vehicles. An immersive experience in military engineering.", "qu": "150 pacha awqa antawakuna kallariyta yachay. Awqanakuy ruraypi hatun yachay."},
    "descubre_la_intimidad_del_pasado_a": {"en": "Discover the intimacy of the past through everyday objects that narrate 200 years of family histories.", "qu": "Ñawpa pachata riqsiy sapa puncha laya imakunawan, 200 wata ayllu wiñay kawsayta willaspa."},
    "guardamos_la_historia_de_los_tanques": {"en": "We preserve the history of tanks and the legacy of cavalry. A frontier where modern steel meets classic honor.", "qu": "Awqa antawakunapa wiñay kawsayta challayta wakaychinchik. Mushuk antapa ñawpa alli puriskawan tarinakun."},
    "aliados_estratgicos": {"en": "Strategic<br>Allies", "qu": "Mashi<br>Tantanaku"},
    "preservando_nuestro_patrimonio_cultural_y_arquitectnico": {"en": "Preserving our cultural and architectural heritage. A window to the elegance of the past, available to celebrate your historical moments.", "qu": "Ayñi kawsay tukuy ruraykunata wakaychispa. Ñawpa pachapak sumak rikuy, kikinpak yallik pachakunata ruranapak."},
    "preservando_la_historia_del_combate_blindado": {"en": "Preserving the history of armored combat for future generations. A unique immersive educational experience in the world.", "qu": "Awqa antawa makanakuyta shamuk wawakunapak wakaychispa. Kay pachapi sapalla hatun yachakuy."},
}

# English generic substitutions for basic words missing from the comprehensive map
en_replacements = {
    "Museo de Tanques": "Tank Museum",
    "Casa Histórica": "Historical House",
    "Colección": "Collection",
    "ColecciÃ³n": "Collection",
    "Entradas": "Tickets",
    "Exhibiciones": "Exhibitions",
    "Exposición": "Exhibition",
    "Exposiciones": "Exhibitions",
    "ExposiciÃ³n": "Exhibition",
    "Vehículos": "Vehicles",
    "Adultos": "Adults",
    "Niños": "Children",
    "NiÃ±os": "Children",
    "Ver Detalles": "View Details",
    "Comprar": "Buy ",
    "Horario": "Schedule",
    "Dirección": "Address",
    "Ubicación": "Location",
    "Búsqueda Global": "Global Search",
    "BÃºsqueda Global": "Global Search",
    "Aliados": "Allies",
    "Información": "Information",
    "InformaciÃ³n": "Information",
    "Acción": "Action",
    "AÃ±o": "Year",
    "GalerÃ­a": "Gallery",
    "CÃ³mo llegar": "How to get there",
    "PolÃ­tica": "Policy",
    "TÃ©rminos": "Terms",
    "nombre@ejemplo.com": "name@example.com",
    "Recuérdame": "Remember me",
    "Contraseña": "Password"
}

qu_replacements = {
    "Museo de Tanques": "Awqa Antawakuna Rikuchik",
    "Casa Histórica": "Ñawpa Wasi",
    "Colección": "Tantachiskakuna",
    "ColecciÃ³n": "Tantachiskakuna",
    "Entradas": "Yaykunakuna",
    "Exhibiciones": "Rikuchiykuna",
    "Vehículos": "Antawakuna",
    "Adultos": "Hatun Runakuna",
    "Niños": "Wawakuna",
    "NiÃ±os": "Wawakuna",
    "Ver Detalles": "Uku Rikuy",
    "Comprar": "Randiy ",
    "Horario": "Pacha",
    "Dirección": "Maypi",
    "Ubicación": "Kuskayky",
    "Búsqueda Global": "Tukuy Maskana",
    "BÃºsqueda Global": "Tukuy Maskana",
    "Aliados": "Mashikuna",
    "Información": "Willay",
    "InformaciÃ³n": "Willay",
    "AÃ±o": "Wata",
    "GalerÃ­a": "Rikuchik",
    "CÃ³mo llegar": "Imashina chayana",
    "PolÃ­tica": "Kamachiy",
    "TÃ©rminos": "Kamachiy",
    "nombre@ejemplo.com": "suti@ejemplo.com",
    "Recuérdame": "Yuyariway",
    "Contraseña": "Pakak Shimi"
}

en_dict = {}
qu_dict = {}

def apply_text_translation(key, original_es, lang, replacement_map):
    # If explicitly mapped 
    if key in translations_db:
        return translations_db[key][lang]
        
    # If not explicitly mapped, check replacements
    text = original_es
    for search, replace in replacement_map.items():
        if search in text:
            text = text.replace(search, replace)
            
    # Default return modified string
    return text

for key, es_text in es_dict.items():
    if "<svg" in es_text:
        # Avoid translating raw SVGs
        en_dict[key] = es_text
        qu_dict[key] = es_text
        continue
    en_dict[key] = apply_text_translation(key, es_text, 'en', en_replacements)
    qu_dict[key] = apply_text_translation(key, es_text, 'qu', qu_replacements)

def dict_to_js_string(d):
    lines = []
    for k, v in d.items():
        vStr = str(v).replace('`', '\\`').replace('${', '\\${')
        lines.append(f"        \"{k}\": `{vStr}`")
    return "{\n" + ",\n".join(lines) + "\n    }"

js_content = f"""// public/js/i18n.js

// 1. Base de datos del motor de idiomas
const diccionario = {{
    es: {dict_to_js_string(es_dict)},
    en: {dict_to_js_string(en_dict)},
    qu: {dict_to_js_string(qu_dict)}
}};

// 2. Función de Ejecución (La que cambia el texto y atributos)
window.cambiarIdioma = function(idioma) {{
    if (!diccionario[idioma]) return;

    // Cambiar el texto de elementos normales
    document.querySelectorAll('[data-i18n]').forEach(elemento => {{
        const clave = elemento.getAttribute('data-i18n');
        if (diccionario[idioma][clave]) {{
            elemento.innerHTML = diccionario[idioma][clave];
        }}
    }});

    // Cambiar placeholders de inputs/textareas
    document.querySelectorAll('[data-i18n-placeholder]').forEach(elemento => {{
        const clave = elemento.getAttribute('data-i18n-placeholder');
        if (diccionario[idioma][clave]) {{
            elemento.placeholder = diccionario[idioma][clave];
        }}
    }});

    // Cambiar alts de imágenes
    document.querySelectorAll('[data-i18n-alt]').forEach(elemento => {{
        const clave = elemento.getAttribute('data-i18n-alt');
        if (diccionario[idioma][clave]) {{
            elemento.alt = diccionario[idioma][clave];
        }}
    }});

    // Cambiar títulos
    document.querySelectorAll('[data-i18n-title]').forEach(elemento => {{
        const clave = elemento.getAttribute('data-i18n-title');
        if (diccionario[idioma][clave]) {{
            elemento.title = diccionario[idioma][clave];
        }}
    }});

    // Guardar la preferencia en la memoria del navegador
    localStorage.setItem('idioma_preferido_tapi', idioma);
}};

// 3. Protocolo de Arranque (Al cargar la página)
document.addEventListener('DOMContentLoaded', () => {{
    const idiomaGuardado = localStorage.getItem('idioma_preferido_tapi') || 'es';
    
    const flagsEs = document.querySelectorAll('.flag-es');
    const flagsEn = document.querySelectorAll('.flag-en');
    const flagsEc = document.querySelectorAll('.flag-ec');
    
    if (idiomaGuardado === 'en') {{
        flagsEs.forEach(f => f.classList.add('hidden'));
        flagsEn.forEach(f => f.classList.remove('hidden'));
        flagsEc.forEach(f => f.classList.add('hidden'));
    }} else if (idiomaGuardado === 'qu') {{
        flagsEs.forEach(f => f.classList.add('hidden'));
        flagsEn.forEach(f => f.classList.add('hidden'));
        flagsEc.forEach(f => f.classList.remove('hidden'));
    }} else {{
        flagsEs.forEach(f => f.classList.remove('hidden'));
        flagsEn.forEach(f => f.classList.add('hidden'));
        flagsEc.forEach(f => f.classList.add('hidden'));
    }}
    
    cambiarIdioma(idiomaGuardado);
}});
"""

with open(i18n_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Regenerated {i18n_path} with {len(es_dict)} strings, including placeholder and alt logic.")
