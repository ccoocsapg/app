#!/usr/bin/env python3
import json, pathlib, re, sys
from urllib.parse import urlparse

ROOT=pathlib.Path(__file__).resolve().parents[1]
errors=[]

def check(cond,msg):
    if not cond:
        errors.append(msg)

def read(rel):
    return (ROOT/rel).read_text(encoding="utf-8")

app=read("app.js")
index=read("index.html")
sw=read("sw.js")
manifest=json.loads(read("manifest.webmanifest"))
version=json.loads(read("version.json"))
published=json.loads(read("data/published.json"))

def grab(pattern,text,label):
    m=re.search(pattern,text)
    if not m:
        errors.append(f"Missing {label}")
        return ""
    return m.group(1)

app_v=grab(r"version:\s*'([^']+)'",app,"CONFIG version")
shell_v=grab(r"SHELL_VERSION\s*=\s*'([^']+)'",index,"shell version")
sw_v=grab(r"const VERSION\s*=\s*'([^']+)'",sw,"service-worker version")
start_v=grab(r"_appv=([0-9.]+)",manifest.get("start_url",""),"manifest start version")
json_v=str(version.get("version",""))

check(len({app_v,shell_v,sw_v,start_v,json_v})==1,
      f"Version mismatch: app={app_v}, shell={shell_v}, sw={sw_v}, manifest={start_v}, version.json={json_v}")

check("$$$(" not in app,"Invalid $$$ selector found")
check(not re.search(r"(^|[^$])\$\([^\n;]*\)\.forEach",app,re.M),
      "querySelector(...).forEach detected; use $$() for collections")
check("function safeActionUrl" in app,"Missing safeActionUrl guard")
check("return '<a class=\"filter-chip" in app,"Novetats category filters are not durable anchor links")

required_routes={"inicio","documents","reunions","eines","contacte","cookies","privacitat","avisos"}
route_match=re.search(r"return \[([^\]]+)\]\.includes\(value\)",app)
if route_match:
    declared=set(re.findall(r"'([^']+)'",route_match.group(1)))
    check(required_routes.issubset(declared),f"Missing declared routes: {sorted(required_routes-declared)}")
else:
    errors.append("Could not inspect route declaration")

for href in re.findall(r'href="([^"]+)"',index):
    check(href != "#", "Dead href=# found in index.html")
    check(not href.lower().startswith("javascript:"), f"Unsafe javascript href: {href}")
    if href.startswith("#/"):
        route=href[2:].split("?",1)[0]
        check(route in required_routes,f"Unknown internal route in index.html: {href}")

check("drive.google.com/thumbnail" not in index,
      "apple-touch icon still depends on old Drive thumbnail")
check("./icon.svg" in index,"Local app icon missing from index.html")

for item in published.get("meetings",[]):
    for action in item.get("actions") or []:
        url=(action.get("url") or "").strip()
        check(bool(url),f"{item.get('id')}: empty action URL")
        if not url:
            continue
        if url.lower().startswith("mailto:"):
            continue
        parsed=urlparse(url)
        check(parsed.scheme=="https" and bool(parsed.netloc),
              f"{item.get('id')}: invalid/non-HTTPS action URL {url!r}")

for doc in published.get("documents",[]):
    check(bool(doc.get("driveId")),f"{doc.get('id')}: missing Drive ID")

if errors:
    print("NAVIGATION VALIDATION FAILED")
    for e in errors:
        print(f"- {e}")
    sys.exit(1)

print(f"OK: navigation integrity, {len(published.get('documents',[]))} document links and "
      f"{sum(len(x.get('actions') or []) for x in published.get('meetings',[]))} action links")
