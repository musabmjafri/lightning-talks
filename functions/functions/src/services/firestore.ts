import * as admin from 'firebase-admin';

/** Get FIrebase collection reference by collection name. */
export const getCollectionReference = async (collectionName: string): Promise<FirebaseFirestore.CollectionReference> => {
    const db = admin.firestore();
    return db.collection(collectionName);
}
