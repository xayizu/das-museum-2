
import os
import json

i18n_path = r'c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public\js\i18n.js'

with open(i18n_path, 'r', encoding='utf-8') as f:
    text = f.read()

# Determine where to insert the new keys
# For ES
es_entries = """        "msg_institucional": "Declaración Institucional",
        "msg_titulo": `Mensaje Comando:<br/><span class="text-primary-light">Digitalizando Nuestro Legado</span>`,
        "msg_desc": "Una visión estratégica para la preservación y accesibilidad de la historia blindada en el siglo XXI.",
        "msg_director_nombre": "General Carlos Montoya",
        "msg_director_cargo": "Director del Museo de Tanques",
        "msg_año_lanzamiento": "Año de Lanzamiento",
        "msg_hoja_ruta": "Hoja de Ruta",
        "msg_cita": '"Estamos uniendo la historia y la tecnología para preservar el legado de nuestras fuerzas blindadas para las futuras generaciones. El proyecto de digitalización no es un mero avance; es un cambio fundamental en nuestra forma de honrar el pasado."',
        "msg_p1": "Al embarcarnos en este ambicioso viaje entre 2024 y 2030, nuestra misión sigue siendo clara: asegurar que las maravillas mecánicas y las historias de los valientes que las operaron jamás se pierdan en el tiempo. A través del escaneo 3D de alta fidelidad, la digitalización de archivos y entornos virtuales, abrimos las puertas de nuestro museo al mundo entero.",
        "msg_p2": "La digitalización nos permite analizar especificaciones técnicas con precisión sin precedentes y compartir recursos educativos con escuelas e investigadores sin fronteras. Es nuestro deber adaptarnos a la era digital manteniendo la solemnidad y el honor que representan estas exhibiciones.",
        "msg_p3": "Juntos, estamos construyendo un museo que vive no solo entre muros, sino al alcance de cada mente curiosa.",
        "msg_cargo_inferior": "Director General, Museo de Tanques",
        "msg_vision_titulo": "Visión Estratégica 2024-2030",
        "msg_vision_desc": "Nuestra hoja de ruta para convertirnos en líderes globales del archivo militar digital.",
        "msg_preservacion_titulo": "Preservación Inmersiva",
        "msg_preservacion_desc": "Convirtiendo cada vehículo blindado en un modelo 3D de alta fidelidad para recorridos virtuales y estudio técnico.",
        "msg_conectividad_titulo": "Conectividad Global",
        "msg_conectividad_desc": "Construyendo un archivo digital habilitado por API para universidades y sociedades históricas de todo el mundo.",
        "msg_educacion_titulo": "Educación Interactiva",
        "msg_educacion_desc": "Creando contenido alineado al currículo escolar en Realidad Aumentada para programas educativos.",
        "msg_hitos_titulo": "Hitos Clave del Proyecto",
        "msg_fase1_titulo": "Fase 1: Inventario y Escaneo",
        "msg_fase1_fecha": "Q1 2024",
        "msg_fase1_desc": "Escaneo completado de la colección de 'Tigers' usando tecnología Lidar.",
        "msg_fase2_titulo": "Fase 2: Lanzamiento del Portal de Archivo",
        "msg_fase2_fecha": "Q4 2024",
        "msg_fase2_desc": "El portal interactivo del museo entra en línea para historiadores registrados.",
        "msg_fase3_titulo": "Fase 3: Integración de RV",
        "msg_fase3_fecha": "2025",
        "msg_fase3_desc": "Soporte completo de realidad virtual para aulas remotas y estaciones dentro del museo.",
        "msg_compromiso_titulo": "Compromiso con la Comunidad",
        "msg_compromiso_desc": "Más allá del acero y la tecnología, nuestros esfuerzos se centran en las personas. Creemos firmemente que la historia pertenece a la comunidad y que el acceso jamás debe estar restringido por la geografía o las habilidades físicas.",
        "msg_compromiso_li1": "Accesibilidad histórica para estudiantes con discapacidades mediante la interacción virtual y sensorial.",
        "msg_compromiso_li2": "Preservando las historias orales de los veteranos de combate y enlazándolas con sus respectivos vehículos.",
        "msg_compromiso_li3": "Proveyendo en tiempo real activos educativos de código abierto para investigadores académicos en todo el mundo.","""

# For EN
en_entries = """        "msg_institucional": "Institutional Statement",
        "msg_titulo": `Commander's Message:<br/><span class="text-primary-light">Digitalizing Our Legacy</span>`,
        "msg_desc": "A strategic vision for the preservation and accessibility of armored history in the 21st century.",
        "msg_director_nombre": "General Carlos Montoya",
        "msg_director_cargo": "Director of Museo de Tanques",
        "msg_año_lanzamiento": "Launch Year",
        "msg_hoja_ruta": "Roadmap",
        "msg_cita": '"We are bridging history and technology to preserve the legacy of our armored forces for future generations. The digitalization project is not merely an upgrade; it is a fundamental shift in how we honor our past."',
        "msg_p1": "As we embark on this ambitious journey between 2024 and 2030, our mission remains clear: to ensure that the mechanical marvels and the stories of the brave men and women who operated them are never lost to time. Through high-fidelity 3D scanning, archival document digitalization, and interactive virtual environments, we are opening the gates of our museum to the entire world.",
        "msg_p2": "Digitalization allows us to analyze technical specifications with unprecedented precision and share educational resources with schools and researchers across borders. It is our duty to adapt to the digital age while maintaining the solemnity and honor that these exhibits represent.",
        "msg_p3": "Together, we are building a museum that lives not just within walls, but within reach of every curious mind.",
        "msg_cargo_inferior": "Director-General, Museo de Tanques",
        "msg_vision_titulo": "Strategic Vision 2024-2030",
        "msg_vision_desc": "Our roadmap to becoming a global leader in military digital archiving.",
        "msg_preservacion_titulo": "Immersive Preservation",
        "msg_preservacion_desc": "Converting every armored vehicle into a high-fidelity 3D model for virtual tours and technical study.",
        "msg_conectividad_titulo": "Global Connectivity",
        "msg_conectividad_desc": "Building an API-enabled digital archive for universities and historical societies worldwide.",
        "msg_educacion_titulo": "Next-Gen Education",
        "msg_educacion_desc": "Creating AR curriculum-aligned content for primary and secondary education programs.",
        "msg_hitos_titulo": "Key Project Milestones",
        "msg_fase1_titulo": "Phase 1: Inventory & Scanning",
        "msg_fase1_fecha": "Q1 2024",
        "msg_fase1_desc": "Completed scanning of the 'Tigers' collection using Lidar technology.",
        "msg_fase2_titulo": "Phase 2: Archive Portal Launch",
        "msg_fase2_fecha": "Q4 2024",
        "msg_fase2_desc": "Web-based interactive museum portal goes live for registered historians.",
        "msg_fase3_titulo": "Phase 3: VR Integration",
        "msg_fase3_fecha": "2025",
        "msg_fase3_desc": "Full VR support for remote classrooms and museum VR stations.",
        "msg_compromiso_titulo": "Commitment to the Community",
        "msg_compromiso_desc": "Beyond the steel and technology, our digitalization efforts are focused on the people. We believe that history belongs to the community, and access should never be restricted by geography or physical ability.",
        "msg_compromiso_li1": "Accessible history for students with physical disabilities through virtual interaction.",
        "msg_compromiso_li2": "Preserving oral histories from veterans and linking them to their respective vehicles.",
        "msg_compromiso_li3": "Providing open-source educational assets for academic researchers worldwide.","""

# For QU
qu_entries = """        "msg_institucional": "Hatun Pushakpa Rimay",
        "msg_titulo": `Apu Rimay:<br/><span class="text-primary-light">Anta Kawsayta Wakaychishpa</span>`,
        "msg_desc": "Yuyay ñan, siglo XXI pachapi antawa awqakunapa kawsayta allichinkapak.",
        "msg_director_nombre": "Apu Carlos Montoya",
        "msg_director_cargo": "Awqa Antawa Rikuchikpa Pushak",
        "msg_año_lanzamiento": "Pacha Kallari",
        "msg_hoja_ruta": "Ñan Killka",
        "msg_cita": '"Ñukanchik kawsaytapash, musuk ruraykunatapash tantachinchikmi, shamuk wiñaykunaman wakaychinkapak. Kayka mana mushukllallachu kan, ñawpa pachata yupaychanapak alli ruraymi."',
        "msg_p1": "2024 watamanta 2030 watakaman purishpa, ñukanchikpa rurayka ashka chayta rikuchin: sumak antawakunapash, chayta purichik awqakunapash, wiñay yuyarinami kan. 3D rikuypi, quillka wakaychiypi, tukuy llaktakunaman riqsichishun.",
        "msg_p2": "Hatun rimariyllataka, unancha alli yachaywan ruraykunata charishpa, yachanakunapash tukuy llaktakunapi shuyan. Kunan pachaman tikrayashpapash, respeto yupaychaytaka wakaychinchikmi.",
        "msg_p3": "Tantanashpa, mana pirqa ukullapi kawsak rikuchikta ruranchikchu, ña tukuy rurak yuyaykunamanmi paktanchik.",
        "msg_cargo_inferior": "Hatun Pushak, Awqa Antawa Rikuchik",
        "msg_vision_titulo": "Chayankapak Ñan 2024-2030",
        "msg_vision_desc": "Llaktakunapa ñan, awqa kamukuna wakaychinapi yachak tukunkapak.",
        "msg_preservacion_titulo": "Uku Rikuchiy Wakaychiy",
        "msg_preservacion_desc": "Tukuy antawakunatami 3D rikuypi ruranchik, allita yachankapak.",
        "msg_conectividad_titulo": "Llaktakunawan Tantanaku",
        "msg_conectividad_desc": "Hatarichishpa yachana wasikunapak panka rikuypi kawsay maskayta ruranchik.",
        "msg_educacion_titulo": "Shamuk Yachay",
        "msg_educacion_desc": "RA nishkawan wawakunapac, wamrakunapac yachana ruraykunata allichinchik.",
        "msg_hitos_titulo": "Hatun Kallariy Ruraykuna",
        "msg_fase1_titulo": "1 Tupu: Maskana Rikunapash",
        "msg_fase1_fecha": "Q1 2024",
        "msg_fase1_desc": "'Tigers' tantachishka antawakunata Lidar llika rikuchishka.",
        "msg_fase2_titulo": "2 Tupu: Panka Punkuta Paskashka",
        "msg_fase2_fecha": "Q4 2024",
        "msg_fase2_desc": "Wiñay kawsay maskakkunapak llika panka ña paskashka tiyan.",
        "msg_fase3_titulo": "3 Tupu: RV Tantachishka",
        "msg_fase3_fecha": "2025",
        "msg_fase3_desc": "Karu yachana wasikunapi yachankapak, RV yanapashkawan rikunapash.",
        "msg_compromiso_titulo": "Ayllu Llaktawan Minkay",
        "msg_compromiso_desc": "Antamata yachaykunatapash yallishpa, runakunamanmi chaskinchik. Wiñay kawsayka llaktapakmi kan, mana chaypi chayakkunallamanchu chayan.",
        "msg_compromiso_li1": "Mana uki ukuylla kawsakkunapak, llika ukupi riksinata charun.",
        "msg_compromiso_li2": "Aukakunapa rima willayta wakaychishpa antawan tinkinchik.",
        "msg_compromiso_li3": "Llaktakunapa yachana maskakkiman willaykunata kichkishpa kanchik.","""

text = text.replace('"iniciar_tour": "Iniciar Tour Virtual"\n    },', f'"iniciar_tour": "Iniciar Tour Virtual",\n{es_entries}\n    }},')
text = text.replace('"iniciar_tour": "Start Virtual Tour"\n    },', f'"iniciar_tour": "Start Virtual Tour",\n{en_entries}\n    }},')
text = text.replace('"iniciar_tour": "Virtual Tour Kallariy"\n    }', f'"iniciar_tour": "Virtual Tour Kallariy",\n{qu_entries}\n    }}')

with open(i18n_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("added keys safely to i18n")
