import markdown
import sys
import datetime
import firebase_admin
from firebase_admin import credentials, firestore

# TODO: get path to note
note_path = sys.argv[1]

with open(note_path, "r") as file:

    # get note content and convert to html
    note = file.read()
    title = note.split("\n")[0].strip("# ") # get title from first line
    html = markdown.markdown(note)
    date = datetime.datetime.now().isoformat()
    doc_id = title.replace(" ", "-").lower() + "-" + date.split("T")[0]
    
    # connect to firebase
    cert_location = "/Users/sophiasharif/Desktop/projects/blog/note-upload/blog-fcb54-firebase-adminsdk-l7q62-5879920725.json"
    cred = credentials.Certificate(cert_location)
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    doc_ref = db.collection('users').document(doc_id)
    doc_ref.set({"title": title, "date": date, "content": html}) # TODO: tags

# TODO: add exit statuses