'''
assumes note is formated like the following:

# Title

Tags: tag1, tag2, tag3
Summary: one-line description of note

content of note
'''

import os, hashlib, markdown, datetime, firebase_admin
from firebase_admin import credentials, firestore

# get notes_dir from environment variable
NOTES_DIR = os.environ.get("NOTES_DIR")
PROJECTS_DIR = os.environ.get("PROJECTS_DIR")
IGNORED_FILE = f"{PROJECTS_DIR}/blog/note-upload/ignored-files.txt"

# initialize firebase
cert_location = "/Users/sophiasharif/Desktop/projects/blog/note-upload/blog-fcb54-firebase-adminsdk-l7q62-5879920725.json"
cred = credentials.Certificate(cert_location)
firebase_admin.initialize_app(cred)
db = firestore.client()

def publish_note(note_path):
    with open(note_path, "r") as file:

        # get note content and convert to html
        lines = file.readlines()
        
        # title
        title = lines[0].strip("# \n")
        if not lines[0].startswith("# ") or not title:
            raise Exception(f"Missing title in {note_path}")
        
        # tags
        tag_data = lines[2][6:].split(",")
        tags = []
        for tag in tag_data:
            cleaned_tag = tag.strip()
            if cleaned_tag:
                tags.append(cleaned_tag)
        if not lines[2].startswith("Tags: ") or not tags:
            raise Exception(f"Missing tags in {note_path}")

        # summary
        summary = lines[3][9:].strip()
        if not lines[3].startswith("Summary: ") or not summary:
            raise Exception(f"Missing summary in {note_path}")

        # content
        content = "".join(lines[4:])
        if not content:
            raise Exception(f"Missing content in {note_path}")
        html = markdown.markdown(content, extensions=['fenced_code', 'codehilite'])

        # date (from file metadata)
        timestamp = os.stat(note_path).st_ctime
        date = datetime.datetime.fromtimestamp(timestamp).isoformat()

        # make inode number the doc_id
        content_hash = calculate_file_hash(note_path)
        doc_id = content_hash
        
        # upload to firebase
        doc_ref = db.collection('notes').document(doc_id)
        doc_ref.set({"title": title, "date": date, "tags": tags, "summary": summary, "content": html}) 


def get_local_hashes_and_paths(directory):
    hashes_and_paths = {}
    for root, dirs, files in os.walk(directory):
        for file in files:
            path = os.path.join(root, file)
            hash = calculate_file_hash(path)
            hashes_and_paths[hash] = path
    return hashes_and_paths


def get_firebase_note_titles():
    notes = db.collection('notes').stream()
    note_ids = {}
    for note in notes:
        note_ids[note.id] = note.to_dict()["title"]
    return note_ids


def calculate_file_hash(filepath):
    hasher = hashlib.sha256()
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def get_ignored_files():
    with open(IGNORED_FILE, "r") as file:
        lines = file.readlines()
        return set(f"{NOTES_DIR}/{line.strip()}" for line in lines)


def sync_files():
    local_hashes_and_paths = get_local_hashes_and_paths(NOTES_DIR)
    firebase_note_titles = get_firebase_note_titles()
    ignored_files = get_ignored_files()

    # upload any local notes that don't exist in firebase
    for hash, path in local_hashes_and_paths.items():
        if path in ignored_files:
            continue
        if hash in firebase_note_titles:
            del firebase_note_titles[hash]
        else:
            try:
                publish_note(path)
                print(f"Published {path}")
            except Exception as e:
                relative_path = path.replace(NOTES_DIR, "")
                print(f"Failed to publish {relative_path}: {e}")

    # delete any firebase notes that were not mapped to local files
    for hash in firebase_note_titles:
        db.collection('notes').document(hash).delete()
        print(f"Deleted {firebase_note_titles[hash]}")
    

sync_files()
