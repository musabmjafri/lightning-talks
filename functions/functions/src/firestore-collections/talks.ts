import * as admin from 'firebase-admin';

export class Talk {
    id: string;
    talkTitle: string;
    speakerNameList: Array<string>;
    speakerEmailList: Array<string>;
    talkExcerpt: string;
    dateSubmission: Date;
    dateSchedule: Date;
    urlPresentation: string;
    urlVideo: string;
    dislikeCount: number;
    dislikeList: Array<string>;
    likeCount: number;
    likeList: Array<string>;
    isSpecialTalk: boolean;
    isActive: boolean;

    constructor(id: string, talkTitle: string, speakerNameList: Array<string>, speakerEmailList: Array<string>,
        talkExcerpt: string, dateSubmission: Date, dateSchedule: Date, urlPresentation: string, urlVideo: string,
        dislikeCount: number, dislikeList: Array<string>, likeCount: number, likeList: Array<string>,
        isSpecialTalk: boolean, isActive: boolean) {
        this.id = id;
        this.talkTitle = talkTitle;
        this.speakerNameList = speakerNameList;
        this.speakerEmailList = speakerEmailList;
        this.talkExcerpt = talkExcerpt;
        this.dateSubmission = dateSubmission;
        this.dateSchedule = dateSchedule;
        this.urlPresentation = urlPresentation;
        this.urlVideo = urlVideo;
        this.dislikeCount = dislikeCount;
        this.dislikeList = dislikeList;
        this.likeCount = likeCount;
        this.likeList = likeList;
        this.isSpecialTalk = isSpecialTalk;
        this.isActive = isActive;
    }
}

/** Get all active Ligthing Talks */
export async function getAllActiveTalks(): Promise<any> {
    return getAllActiveRecords('talks')
        .then((snapshot) => {
            if (snapshot.empty) {
                return 'No records found';
            }
            const talks: Talk[] = [];
            snapshot.forEach((doc) => {
                const talk: Talk = new Talk(doc.get('id'), doc.get('talkTitle'), doc.get('speakerNameList'), doc.get('speakerEmailList'),
                    doc.get('talkExcerpt'), doc.get('dateSubmission'), doc.get('dateSchedule'), doc.get('urlPresentation'), doc.get('urlVideo'),
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

async function getAllActiveRecords(collectionName: string): Promise<FirebaseFirestore.QuerySnapshot> {
    const db = admin.firestore();
    const collectionRef = db.collection(collectionName);
    return collectionRef.where('isActive', '==', true).get()
}