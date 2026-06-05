from firebase_config import db

db.collection("test").document("1").set({
    "message": "Hello Firestore"
})

print("Firestore Connected")