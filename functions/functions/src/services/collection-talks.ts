import * as admin from 'firebase-admin';
import { Talk } from '../classes/talk';

const getAllActiveRecords = async (collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> => {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    return collectionRef.where('isActive', '==', true).get()
}

/** Get all active Ligthing Talks */
export const getAllActiveTalks = async (): Promise<any> => {
    return getAllActiveRecords('talks')
        .then((snapshot) => {
            if (snapshot.empty) {
                return 'No records found';
            }
            const talks: Talk[] = [];
            snapshot.forEach((doc) => {
                const talk: Talk = new Talk(doc.get('id'), doc.get('talkTitle'), doc.get('speakerNameList'), doc.get('speakerEmailList'),
                    doc.get('talkExcerpt'), doc.get('dateSubmission'), doc.get('dateSchedule'), doc.get('dateModified'), doc.get('urlPresentation'), doc.get('urlVideo'),
                    doc.get('dislikeCount'), doc.get('dislikeList'), doc.get('likeCount'), doc.get('likeList'),
                    doc.get('isSpecialTalk'), doc.get('isActive'));
                talks.push(talk);
            });
            return talks;
        })
        .catch((err) => {
            return err;
        });
}
