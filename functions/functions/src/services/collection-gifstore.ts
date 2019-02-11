import * as admin from 'firebase-admin';
import { Gif } from '../classes/gif';

const getAllActiveRecords = async (collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> => {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    return collectionRef.where('isActive', '==', true).get()
}

/** Obtain a gif link that hasn't been used recently (bygone: in the past). */
export const getBygoneGif = async (): Promise<string> => {
    return await getAllActiveRecords('gifstore')
        .then((snapshot) => {
            if (snapshot.empty) {
                return 'No records found';
            }
            const gifs: Gif[] = [];
            snapshot.forEach((doc) => {
                const gif: Gif = new Gif(doc.id, doc.get('link'), doc.get('lastUsed'), doc.get('isActive'));
                gifs.push(gif);
            });
            gifs.sort((gif1, gif2) => (gif1.lastUsed > gif2.lastUsed) ? 1 : ((gif2.lastUsed > gif1.lastUsed) ? -1 : 0))
            return gifs[0].link;
        })
        .catch((err) => {
            console.log(err);
            return '';
        });
}
