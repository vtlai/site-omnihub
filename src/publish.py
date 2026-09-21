"""Generate a minimal Cloudflare Pages artifact using only referenced assets."""
from pathlib import Path
import re
import runpy
import shutil

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
runpy.run_path(str(ROOT / 'src/build.py'), run_name='__main__')
if DIST.is_symlink():
    raise RuntimeError('dist must be a generated directory, not a symlink')
if DIST.exists():
    shutil.rmtree(DIST)
DIST.mkdir()
pages = ['index.html', '404.html', 'planos/index.html', 'sobre/index.html',
         'condicoes/index.html', 'obrigado/index.html']
files = pages + ['styles.css', 'app.js', 'robots.txt', 'sitemap.xml', '_redirects']
assets = set()
for name in files:
    source = ROOT / name
    destination = DIST / name
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)
    assets.update(re.findall(r'/assets/[^\s\"\'()<>]+', source.read_text()))
for asset in sorted(assets):
    relative = Path(asset.lstrip('/'))
    source = ROOT / relative
    if not source.is_file() or not source.resolve().is_relative_to((ROOT / 'assets').resolve()):
        raise RuntimeError(f'Missing or invalid asset: {asset}')
    destination = DIST / relative
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)
print(f'Cloudflare Pages: dist/ — {len(pages)} pages, {len(assets)} assets.')
