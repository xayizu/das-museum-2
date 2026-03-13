import os
import re

def fix_html_files(root_dir):
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
                
                if content is None:
                    print(f"Could not read {file_path}")
                    continue

                if 'supabase/stats.js' in content and 'supabase/realtime.js' not in content:
                    print(f"Fixing {file_path}")
                    match = re.search(r'<script src="([^"]*?)js/supabase/stats.js', content)
                    if match:
                        prefix = match.group(1)
                        new_script = f'\n    <script src="{prefix}js/supabase/realtime.js?v=1.1"></script>'
                        
                        if 'supabase/leaderboard.js' in content:
                            content = re.sub(r'(<script src="[^"]*?js/supabase/leaderboard.js[^"]*?"></script>)', 
                                           r'\1' + new_script, content)
                        else:
                            content = re.sub(r'(<script src="[^"]*?js/supabase/stats.js[^"]*?"></script>)', 
                                           r'\1' + new_script, content)
                        
                        # Write back with same encoding
                        for enc in encodings:
                            try:
                                with open(file_path, 'w', encoding=enc) as f:
                                    f.write(content)
                                break
                            except:
                                continue

if __name__ == "__main__":
    fix_html_files('public')
