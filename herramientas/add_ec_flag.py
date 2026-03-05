import os
import re

ec_flag = """                        <svg class="flag-ec hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" width="24" height="16" style="border-radius: 2px;">
                            <rect width="750" height="250" fill="#ffdd00"></rect>
                            <rect y="250" width="750" height="125" fill="#034ea2"></rect>
                            <rect y="375" width="750" height="125" fill="#ed1c24"></rect>
                            <ellipse cx="375" cy="250" rx="40" ry="50" fill="#55b0de" stroke="#e0b522" stroke-width="8"></ellipse>
                        </svg>"""

directory = r"c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public"

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(".html"):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            if "flag-en" in content and "flag-ec" not in content:
                # Find the end of the flag-en block
                pattern = r'(<svg class="flag-en[\s\S]*?</svg>)'
                new_content = re.sub(pattern, r'\1\n' + ec_flag, content)
                
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
