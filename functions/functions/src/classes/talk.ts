export class Talk {
    id: string;
    talkTitle: string;
    speakerNameList: Array<string>;
    speakerEmailList: Array<string>;
    talkExcerpt: string;
    dateSubmission: Date;
    dateSchedule: Date;
    dateModified: Date;
    urlPresentation: string;
    urlVideo: string;
    dislikeCount: number;
    dislikeList: Array<string>;
    likeCount: number;
    likeList: Array<string>;
    isSpecialTalk: boolean;
    isActive: boolean;

    constructor(id: string, talkTitle: string, speakerNameList: Array<string>, speakerEmailList: Array<string>,
        talkExcerpt: string, dateSubmission: Date, dateSchedule: Date, dateModified: Date, urlPresentation: string, urlVideo: string,
        dislikeCount: number, dislikeList: Array<string>, likeCount: number, likeList: Array<string>,
        isSpecialTalk: boolean, isActive: boolean) {
        this.id = id;
        this.talkTitle = talkTitle;
        this.speakerNameList = speakerNameList;
        this.speakerEmailList = speakerEmailList;
        this.talkExcerpt = talkExcerpt;
        this.dateSubmission = dateSubmission;
        this.dateSchedule = dateSchedule;
        this.dateModified = dateModified;
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
