#!/usr/bin/env python3
import json, pathlib, sys

ROOT=pathlib.Path(__file__).resolve().parents[1]

def load(rel):
    p=ROOT/rel
    if not p.exists():
        raise AssertionError(f"Missing file: {rel}")
    with p.open(encoding="utf-8") as f:
        return json.load(f)

errors=[]
def check(cond,msg):
    if not cond: errors.append(msg)

folders=load("data/folder-map.json")
published=load("data/published.json")
manifest=load("search/manifest.json")

folder_ids=[x["id"] for x in folders.get("folders",[])]
check(len(folder_ids)==len(set(folder_ids)),"Duplicate folder IDs in data/folder-map.json")
check(folders.get("private",{}).get("id") not in folder_ids,"Private folder present in public folder map")
check(folders.get("review",{}).get("id") not in folder_ids,"Review folder present in public folder map")

canonical_categories={x["category"] for x in folders.get("folders",[])}
legacy_categories={"conciliacio","organitzacio","formacio"}
allowed_categories=canonical_categories|legacy_categories

docs=published.get("documents",[])
meetings=published.get("meetings",[])
all_items=docs+meetings
ids=[x.get("id") for x in all_items if x.get("id")]
drive_ids=[x.get("driveId") for x in docs if x.get("driveId")]

check(len(ids)==len(set(ids)),"Duplicate published item IDs")
check(len(drive_ids)==len(set(drive_ids)),"Duplicate document driveId values")

for x in all_items:
    item_id=x.get("id","<missing>")
    check(bool(x.get("id")),f"Published item without id")
    check(x.get("category") in allowed_categories,f"{item_id}: unknown category {x.get('category')!r}")
    title=x.get("title") or {}
    check(bool(title.get("ca")),f"{item_id}: missing Catalan title")
    check(bool(title.get("es")),f"{item_id}: missing Spanish title")

for x in docs:
    item_id=x.get("id","<missing>")
    check(bool(x.get("driveId")),f"{item_id}: document missing driveId")
    desc=x.get("desc") or {}
    check(bool(desc.get("ca")),f"{item_id}: missing Catalan description")
    check(bool(desc.get("es")),f"{item_id}: missing Spanish description")

for x in meetings:
    item_id=x.get("id","<missing>")
    intro=x.get("intro") or {}
    check(bool(intro.get("ca")),f"{item_id}: meeting missing Catalan intro")
    check(bool(intro.get("es")),f"{item_id}: meeting missing Spanish intro")
    actions=x.get("actions") or []
    has_drive_action=any((a.get("url") or "").startswith(("https://drive.google.com/","https://docs.google.com/")) for a in actions)
    # Historical manually-authored meeting entries may predate source actions.
    # New sync-generated entries are validated by stable Drive identity elsewhere.
    if x.get("driveId"):
        check(has_drive_action,f"{item_id}: meeting has driveId but no Google Drive source action")

files=manifest.get("files") or []
check(len(files)==len(set(files)),"Duplicate search index paths in search/manifest.json")

published_ids=set(ids)
published_drive_ids={x.get("driveId") for x in all_items if x.get("driveId")}
for rel in files:
    normalized=rel[2:] if rel.startswith("./") else rel
    p=ROOT/normalized
    check(p.exists(),f"Search manifest references missing file: {rel}")
    if not p.exists():
        continue
    try:
        data=json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        errors.append(f"{rel}: invalid JSON: {e}")
        continue
    for chunk in data.get("chunks",[]):
        cid=chunk.get("id","<missing>")
        check(bool(chunk.get("id")),f"{rel}: chunk without id")
        check(bool(chunk.get("text")),f"{rel}/{cid}: empty text")
        check(bool(chunk.get("docId")),f"{rel}/{cid}: missing docId")
        if chunk.get("docId"):
            identity_ok=chunk["docId"] in published_ids or (chunk.get("driveId") and chunk.get("driveId") in published_drive_ids)
            check(identity_ok,f"{rel}/{cid}: orphan identity docId={chunk['docId']} driveId={chunk.get('driveId')}")
        check(bool(chunk.get("driveId")) or chunk.get("docId") in {m.get("id") for m in meetings},
              f"{rel}/{cid}: no stable Drive identity and not tied to a meeting entry")

if errors:
    print("CONTENT VALIDATION FAILED")
    for e in errors:
        print(f"- {e}")
    sys.exit(1)

print(f"OK: {len(docs)} documents, {len(meetings)} meetings, {len(files)} search indexes")
