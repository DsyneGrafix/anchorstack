
import os
from bs4 import BeautifulSoup

CONTENT_DIR = "/home/ricky/anchorstack/content"
SIDEBAR_JS = "/home/ricky/anchorstack/public/js/sidebar.js"

EXCLUDE_PATTERNS = ['__drafts__', '_test', '_backup', '.bak']

def should_exclude(path):
    return any(p in str(path) for p in EXCLUDE_PATTERNS)

def get_article_metadata(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f, "html.parser")
            title = soup.title.string.strip() if soup.title else file_path.stem.replace("_", " ").title()
            slug = os.path.relpath(file_path, CONTENT_DIR).replace('\\', '/')
            return title, slug
    except:
        return "Untitled", str(file_path)

def scan_and_update_sidebar():
    entries = []
    for root, _, files in os.walk(CONTENT_DIR):
        for file in files:
            if file.endswith((".html", ".md")):
                full_path = os.path.join(root, file)
                if should_exclude(full_path):
                    continue
                title, slug = get_article_metadata(full_path)
                entries.append((title, slug))

    with open(SIDEBAR_JS, "w", encoding="utf-8") as f:
        f.write("const sidebarLinks = [\n")
        for title, slug in sorted(entries):
            f.write(f"  {{ title: `{title}`, url: `/content/{slug}` }},\n")
        f.write("];\n")

    print(f"✅ Sidebar updated with {len(entries)} entries.")

if __name__ == "__main__":
    scan_and_update_sidebar()
