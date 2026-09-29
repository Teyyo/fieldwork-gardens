"""Dependency-free checks for local pages, assets and accessibility basics.
Run from the repository root: python scripts/check_site.py
This does not replace a rendered browser test.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import sys

ROOT = Path(__file__).resolve().parents[1] / 'dist'

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids, self.refs, self.errors = set(), [], []
        self.h1 = 0
        self.labels, self.inputs = set(), []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        identifier = attrs.get('id')
        if identifier:
            if identifier in self.ids: self.errors.append(f'duplicate id: {identifier}')
            self.ids.add(identifier)
        if tag == 'h1': self.h1 += 1
        if tag == 'label' and attrs.get('for'): self.labels.add(attrs['for'])
        if tag in ('input', 'select', 'textarea'):
            self.inputs.append((identifier, attrs.get('type')))
        if tag == 'img':
            for key in ('alt', 'width', 'height'):
                if not attrs.get(key): self.errors.append(f'image missing {key}')
        for attr in ('src', 'href'):
            if attrs.get(attr): self.refs.append(attrs[attr])
        for source in attrs.get('srcset', '').split(','):
            if source.strip(): self.refs.append(source.strip().split()[0])
        for attr in ('aria-describedby', 'aria-controls', 'aria-labelledby'):
            self.refs.extend('#' + v for v in attrs.get(attr, '').split())

pages = {}
for file in sorted(ROOT.glob('*.html')):
    parser = PageParser()
    parser.feed(file.read_text(encoding='utf-8'))
    pages[file.resolve()] = parser
errors = []
refs = 0
for file, parser in pages.items():
    errors.extend(f'{file.name}: {e}' for e in parser.errors)
    if parser.h1 != 1: errors.append(f'{file.name}: expected one h1, found {parser.h1}')
    for identifier, input_type in parser.inputs:
        if input_type != 'checkbox' and identifier not in parser.labels:
            errors.append(f'{file.name}: unlabelled control {identifier}')
    for ref in parser.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc: continue
        # The 404 base tag points at the host root; it is configuration, not a file.
        if ref == '/': continue
        target = (file.parent / unquote(url.path)).resolve() if url.path else file
        refs += 1
        if not target.is_relative_to(ROOT): errors.append(f'{file.name}: path escapes site: {ref}')
        elif not target.exists(): errors.append(f'{file.name}: missing target: {ref}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{file.name}: missing anchor: {ref}')
if errors:
    print('\n'.join(errors)); sys.exit(1)
print(f'PASS: {len(pages)} HTML pages; {refs} local references; image attributes, labels, IDs and anchors.')
