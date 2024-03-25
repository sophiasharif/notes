import markdown
import sys
import os
import datetime
import firebase_admin
from firebase_admin import credentials, firestore

note_path = sys.argv[1]

'''
assumes note is formated like the following:

# Title

Tags: tag1, tag2, tag3
Summary: one-line description of note

content of note
'''

with open(note_path, "r") as file:

    # get note content and convert to html
    lines = file.readlines()
    
    # title
    title = lines[0].strip("# \n")
    if not lines[0].startswith("# ") or not title:
        print(f"Missing title in {note_path}")
        sys.exit(1)
    
    # tags
    tag_data = lines[2][6:].split(",")
    tags = []
    for tag in tag_data:
        cleaned_tag = tag.strip()
        if cleaned_tag:
            tags.append(cleaned_tag)
    if not lines[2].startswith("Tags: ") or not tags:
        print(f"Missing tags in {note_path}")
        sys.exit(1)

    # summary
    summary = lines[3][9:].strip()
    if not lines[3].startswith("Summary: ") or not summary:
        print(f"Missing summary in {note_path}")
        sys.exit(1)

    # content
    content = "".join(lines[4:])
    if not content:
        print(f"Missing content in {note_path}")
        sys.exit(1)
    html = markdown.markdown(content, extensions=['fenced_code', 'codehilite'])

    # date (from file metadata)
    timestamp = os.stat(note_path).st_ctime
    date = datetime.datetime.fromtimestamp(timestamp).isoformat()

    # deterministic doc_id so that updates don't create new docs
    doc_id = title.replace(" ", "-").lower() + "-" + date.split("T")[0]
    
    # upload to firebase
    cert_location = "/Users/sophiasharif/Desktop/projects/blog/note-upload/blog-fcb54-firebase-adminsdk-l7q62-5879920725.json"
    cred = credentials.Certificate(cert_location)
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    doc_ref = db.collection('notes').document(doc_id)
    doc_ref.set({"title": title, "date": date, "tags": tags, "summary": summary, "content": html}) # TODO: tags
