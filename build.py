#!/usr/bin/env python3
"""Build the live site from src/.

Reads src/*.html, src/*.css, src/main.js, src/config.js, src/assets/*.webp
and writes self-contained index.html and thank-you.html to the repo root
(CSS, JS, settings and the three photos are inlined). videos/ and logos/
stay as separate files at the repo root.

Usage:  python3 build.py
"""
import base64
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")


def read(name):
    with open(os.path.join(SRC, name), encoding="utf-8") as f:
        return f.read()


def mincss(s):
    s = re.sub(r"/\*.*?\*/", "", s, flags=re.S)
    s = re.sub(r"\s+", " ", s)
    s = re.sub(r"\s*([{};:,>])\s*", r"\1", s)
    return s.replace(";}", "}").replace("and(", "and (").strip()


FAVICON = (
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E"
    "%3Crect width='64' height='64' rx='14' fill='%230E1B33'/%3E"
    "%3Ctext x='32' y='45' text-anchor='middle' font-family='Arial Black,Arial,sans-serif' "
    "font-weight='900' font-size='34' fill='%23FF5A1F'%3EF%3C/text%3E%3C/svg%3E"
)
FONTS = ("https://fonts.googleapis.com/css2?family=Archivo:wght@800;900"
         "&family=Caveat:wght@700&family=Inter:wght@400;500;600;700&display=swap")
FONT_TAGS = (
    f'<link rel="preload" as="style" href="{FONTS}" '
    "onload=\"this.onload=null;this.rel='stylesheet'\">\n"
    f'<noscript><link rel="stylesheet" href="{FONTS}"></noscript>'
)


def data_uri(filename):
    with open(os.path.join(SRC, "assets", filename), "rb") as f:
        return "data:image/webp;base64," + base64.b64encode(f.read()).decode()


def build(src_name, out_name, extra_css=""):
    css = read("styles.css") + extra_css
    cfg = read("config.js").replace("Edit ONLY this file", "Edit ONLY this block")
    js = read("main.js")
    h = read(src_name)
    h = re.sub(r'<link rel="icon"[^>]*>', f'<link rel="icon" href="{FAVICON}">', h)
    h = re.sub(r'<link href="https://fonts.googleapis.com/css2[^>]*>', FONT_TAGS, h)
    h = re.sub(r'<link rel="stylesheet" href="/(styles|thank-you)\.css">\n?', "", h)
    h = h.replace("</head>", f"<style>{mincss(css)}</style>\n</head>", 1)
    h = h.replace('<meta charset="utf-8">',
                  '<meta charset="utf-8">\n<script>\n' + cfg.strip() + "\n</script>", 1)
    h = h.replace('<script src="/config.js"></script>\n', "")
    h = h.replace('<script src="/main.js"></script>', "<script>\n" + js.strip() + "\n</script>")
    for f in ("ai-image.webp", "real-image.webp", "arihant.webp"):
        h = h.replace(f'src="/assets/{f}"', f'src="{data_uri(f)}"')
    h = (h.replace('"/videos/', '"videos/')
          .replace('"/logos/', '"logos/')
          .replace('content="/assets/', 'content="assets/'))
    with open(os.path.join(ROOT, out_name), "w", encoding="utf-8") as f:
        f.write(h)
    print(f"built {out_name} ({len(h):,} bytes)")


if __name__ == "__main__":
    build("index.html", "index.html")
    build("thank-you.html", "thank-you.html", read("thank-you.css"))
