import * as admin from 'firebase-admin';
import { Gif } from '../classes/gif';
import * as constants from '../constants';

const getAllActiveRecords = async (collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> => {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    return collectionRef.where(constants.firestoreQueryIsActive, constants.firestoreQueryEquals, true).get()
}

/** Obtain a gif link that hasn't been used recently (bygone: in the past). */
export const getBygoneGif = async (): Promise<string> => {

    try {
        const snapshot = await getAllActiveRecords(constants.firestoreCollectionTalksGifstore)

        if (snapshot.empty) {
            return constants.messageNoRecords;
        }

        const gifs: Gif[] = [];
        
        snapshot.forEach((doc) => {
            const gif: Gif = new Gif(doc.id, doc.get('link'), doc.get('lastUsed'), doc.get('isActive'));
            gifs.push(gif);
        });
        
        gifs.sort((gif1, gif2) => (gif1.lastUsed > gif2.lastUsed) ? 1 : ((gif2.lastUsed > gif1.lastUsed) ? -1 : 0))
        return gifs[0].link;
    }
    catch (err) {
        return err;
    }
}
