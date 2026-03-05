import os
import re
import json

base_dir = r"c:\Users\User\Desktop\DISEÑADOR GRAFICO\Plantillas\27) Google Antigravity\das museum 2\public"

# We want to target specific tags that contain text
target_tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li', 'label', 'div']

# Exclude tags that usually don't contain raw text or where we already added a specific translation
# e.g., the language flags themselves which we don't want to translate further
exclude_classes = ['flag-es', 'flag-en', 'flag-ec', 'material-symbols-outlined']

# Regex to find tags: <tag ...>content</tag>
# Need to be careful with nested tags.
# A simpler approach is to use BeautifulSoup if available, but assuming it might not be,
# we can use a more robust regex or parse it carefully.
# Given the complexity, finding inner text without regex is safer.

def get_html_files(directory):
    html_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                html_files.append(os.path.join(root, file))
    return html_files

def generate_key(text):
    # Create a safe key from the text
    text = re.sub(r'<[^>]+>', '', text) # remove inner html tags
    cleaned = re.sub(r'[^a-zA-Z0-9\s]', '', text).strip().lower()
    words = cleaned.split()
    if not words:
        return None
    return "_".join(words[:6])

def process_files():
    files = get_html_files(base_dir)
    dictionary = {}
    
    # We will use BeautifulSoup since it's much safer for HTML parsing in Python
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        print("BeautifulSoup not found. Please install it: pip install beautifulsoup4")
        return
        
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        soup = BeautifulSoup(content, 'html.parser')
        
        # Add script tag if not present
        body = soup.find('body')
        if body:
            script_found = False
            for script in soup.find_all('script'):
                if script.get('src') and 'i18n.js' in script.get('src'):
                    script_found = True
                    break
            
            if not script_found:
                # Add it before main.js
                main_script = None
                for script in soup.find_all('script'):
                    if script.get('src') and 'main.js' in script.get('src'):
                        main_script = script
                        break
                
                # Determine correct path to i18n.js based on depth
                rel_path = os.path.relpath(base_dir, os.path.dirname(file_path))
                if rel_path == '.':
                    script_src = 'js/i18n.js'
                else:
                    script_src = os.path.join(rel_path.replace('\\', '/'), 'js/i18n.js')
                    
                new_script = soup.new_tag('script', src=script_src, defer=True)
                if main_script:
                    main_script.insert_before(new_script)
                else:
                    body.append(new_script)
            
        # Find translatable text
        for tag_name in target_tags:
            for tag in soup.find_all(tag_name):
                # Skip if it already has data-i18n but add to dictionary
                if tag.has_attr('data-i18n'):
                    key = tag['data-i18n']
                    inner_html = "".join([str(c) for c in tag.contents]).strip()
                    dictionary[key] = inner_html
                    continue
                    
                # Skip if it has an excluded class
                if tag.has_attr('class'):
                    classes = tag['class']
                    if any(c in classes for c in exclude_classes):
                        continue
                
                # We only want to translate tags that have DIRECT text children 
                # or very simple inner tags like <br> or <span> that represent formatting.
                
                # A good heuristic: if the tag has text, and all its children are NavigableStrings 
                # or formatting tags (b, i, span, br), we can probably translate its innerHTML as a block.
                
                # To simplify and be safe, let's only grab tags whose immediate inner content is mostly text.
                # If a <div> contains other <div>s or structure, we don't want to replace the whole <div>.
                
                # Check if it has direct non-empty text
                direct_text = ''.join([t for t in tag.contents if isinstance(t, str)]).strip()
                
                if direct_text and len(direct_text) > 2:
                    
                    # Ensure it doesn't contain block elements that would be destroyed
                    has_block_children = any(c.name in ['div', 'section', 'nav', 'ul', 'li', 'p', 'h1', 'h2', 'h3'] for c in tag.children if c.name)
                    
                    if not has_block_children:
                        # Extract inner HTML preserving <br>, <strong>, etc.
                        inner_html = "".join([str(c) for c in tag.contents]).strip()
                        
                        # Generate key based on inner text (without HTML tags)
                        key = generate_key(tag.get_text())
                        
                        if key:
                            # Handle duplicates by adding a number if needed
                            original_key = key
                            counter = 1
                            while key in dictionary and dictionary[key] != inner_html:
                                key = f"{original_key}_{counter}"
                                counter += 1
                                
                            dictionary[key] = inner_html
                            tag['data-i18n'] = key

        # Find translatable attributes (placeholder, alt, title)
        for tag in soup.find_all(True):
            for attr in ['placeholder', 'alt', 'title']:
                if tag.has_attr(f'data-i18n-{attr}'):
                    key = tag[f'data-i18n-{attr}']
                    dictionary[key] = tag[attr]
                elif tag.has_attr(attr) and tag[attr].strip():
                    val = tag[attr].strip()
                    key = generate_key(val)
                    if key:
                        original_key = key
                        counter = 1
                        while key in dictionary and dictionary[key] != val:
                            key = f"{original_key}_{counter}"
                            counter += 1
                        dictionary[key] = val
                        tag[f'data-i18n-{attr}'] = key

        # Save the modified HTML
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(str(soup))
            
    # Save the dictionary
    dict_path = os.path.join(base_dir, 'js', 'es_dictionary.json')
    with open(dict_path, 'w', encoding='utf-8') as f:
        json.dump(dictionary, f, ensure_ascii=False, indent=4)
        
    print(f"Processed {len(files)} files. Extracted {len(dictionary)} unique strings.")
    print(f"Dictionary saved to {dict_path}")

if __name__ == "__main__":
    process_files()
