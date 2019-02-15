import { Timestamp } from "@google-cloud/firestore";

export class Talk {

    id: string;
    talkTitle: string;
    speakerNameList: string[];
    speakerEmailList: string[];
    speakerSlackList: string[];
    talkExcerpt: string;
    dateSubmission: Date;
    dateTentative: Date;
    dateSchedule: Date;
    dateModified: Date;
    urlPresentation: string;
    urlVideo: string;
    dislikeCount: number;
    dislikeList: string[];
    likeCount: number;
    likeList: string[];
    isSpecialTalk: boolean;
    isActive: boolean;

    constructor(id: string, talkTitle: string, speakerNameList: string[], speakerEmailList: string[], speakerSlackList: string[],
        talkExcerpt: string, dateSubmission: Timestamp, dateTentative: Timestamp, dateSchedule: Timestamp, dateModified: Timestamp,
        urlPresentation: string, urlVideo: string, dislikeCount: number, dislikeList: string[], likeCount: number,
        likeList: string[], isSpecialTalk: boolean, isActive: boolean) {

        this.id = id;
        this.talkTitle = talkTitle;
        this.speakerNameList = speakerNameList;
        this.speakerEmailList = speakerEmailList;
        this.speakerSlackList = speakerSlackList;
        this.talkExcerpt = talkExcerpt;
        this.dateSubmission = dateSubmission.toDate();
        this.dateTentative = dateTentative.toDate();
        this.dateSchedule = dateSchedule.toDate();
        this.dateModified = dateModified.toDate();
        this.urlPresentation = urlPresentation;
        this.urlVideo = urlVideo;
        this.dislikeCount = dislikeCount;
        this.dislikeList = dislikeList;
        this.likeCount = likeCount;
        this.likeList = likeList;
        this.isSpecialTalk = isSpecialTalk;
        this.isActive = isActive;
    }

    static documentToObject (document: FirebaseFirestore.QueryDocumentSnapshot) : Talk {
    
        return new Talk(document.get('id'), document.get('talkTitle'), document.get('speakerNameList'), document.get('speakerEmailList'), document.get('speakerSlackList'),
        document.get('talkExcerpt'), document.get('dateSubmission'), document.get('dateTentative'), document.get('dateSchedule'), document.get('dateModified'),
        document.get('urlPresentation'), document.get('urlVideo'), document.get('dislikeCount'), document.get('dislikeList'), document.get('likeCount'),
        document.get('likeList'), document.get('isSpecialTalk'), document.get('isActive'));
    }
    
}
