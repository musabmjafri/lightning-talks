import * as admin from 'firebase-admin';
import { Timestamp } from '@google-cloud/firestore';

export class Gif {
    id: string;
    link: string;
    lastUsed: Date;
    isActive: boolean;

    constructor(id: string, link: string, lastUsed: Timestamp, isActive: boolean) {
        this.id = id;
        this.link = link;
        this.lastUsed = lastUsed.toDate();
        this.isActive = isActive;
    }
}

/** Get least used gif */
export async function getLeastUsedGif(): Promise<any> {
    return getAllActiveRecords('gifstore')
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
            return gifs[0];
        })
        .catch((err) => {
            return err;
        });
}

async function getAllActiveRecords(collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    return collectionRef.where('isActive', '==', true).get()
}