import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("blog-fcb54-firebase-adminsdk-l7q62-5879920725.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()
print(db)
