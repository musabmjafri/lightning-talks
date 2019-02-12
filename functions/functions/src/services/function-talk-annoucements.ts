import * as functions from 'firebase-functions';
import * as slack from './notifier-slack'
import * as talks from './collection-talks';
import * as gifstore from './collection-gifstore';
import { Talk } from '../classes/talk';
import { attachmentMessage, attachment, field, action } from '../interfaces/slack-attachment-message';
import * as constants from '../constants';
import * as annconstants from '../constants/announcements';

const getDayOfWeek = (date: Date): string => {

    const dayNumber = date.getDay();

    switch (dayNumber) {
        case 1: return constants.monday; break;
        case 2: return constants.tuesday; break;
        case 3: return constants.wednesday; break;
        case 4: return constants.thursday; break;
        case 5: return constants.friday; break;
        case 6: return constants.saturday; break;
        default: return constants.sunday; break;
    }
}

const createAttachmentMessage = (upcomingTalk: Talk, gifLink: string): attachmentMessage => {

    const slackMessage: attachmentMessage = {
        attachments: []
    };

    const mainAttachment: attachment = {

        fallback: annconstants.header + getDayOfWeek(upcomingTalk.dateSchedule), // Needs to be completed with full inline announcement
        color: annconstants.attachmentColor,
        fields: [],
        actions: [],
        image_url: ''
    };

    let mainAttachmentField: field = {

        title: '',
        value: annconstants.header + getDayOfWeek(upcomingTalk.dateSchedule),
        short: false
    };

    mainAttachment.fields.push(mainAttachmentField);

    mainAttachmentField = {

        title: annconstants.titleHeader,
        value: upcomingTalk.talkTitle,
        short: false
    };

    mainAttachment.fields.push(mainAttachmentField);

    mainAttachmentField = {

        title: annconstants.descriptionHeader,
        value: upcomingTalk.talkExcerpt,
        short: false
    };

    mainAttachment.fields.push(mainAttachmentField);

    mainAttachmentField = {

        title: annconstants.speakersHeader,
        value: upcomingTalk.speakerNameList.toString(),
        short: true
    };

    mainAttachment.fields.push(mainAttachmentField);

    mainAttachmentField = {

        title: annconstants.dateHeader,
        value: upcomingTalk.dateSchedule.toDateString(),
        short: true
    };

    mainAttachment.fields.push(mainAttachmentField);

    mainAttachmentField = {

        title: annconstants.venueHeader,
        value: annconstants.venueValue,
        short: true
    };

    mainAttachment.fields.push(mainAttachmentField);

    mainAttachmentField = {

        title: annconstants.timeHeader,
        value: upcomingTalk.dateSchedule.toTimeString() + annconstants.timeSuffix,
        short: true
    };

    mainAttachment.fields.push(mainAttachmentField);

    slackMessage.attachments.push(mainAttachment);

    const gifAttachment: attachment = {

        fallback: gifLink,
        color: annconstants.attachmentColor,
        fields: [],
        actions: [],
        image_url: gifLink
    };

    slackMessage.attachments.push(gifAttachment);

    const actionAttachment: attachment = {

        fallback: annconstants.footer, // Needs to be completed with full inline footer
        color: annconstants.attachmentColor,
        fields: [],
        actions: [],
        image_url: ''
    };

    const actionAttachmentField: field = {

        title: annconstants.footer,
        value: '',
        short: false
    };

    actionAttachment.fields.push(actionAttachmentField);

    let actionAttachmentAction: action = {

        type: annconstants.actionType,
        style: annconstants.actionStylePrimary,
        text: annconstants.signupHeader,
        url: annconstants.signupUrl
    }

    actionAttachment.actions.push(actionAttachmentAction);

    actionAttachmentAction = {

        type: annconstants.actionType,
        style: annconstants.actionStyleDefault,
        text: annconstants.calendarHeader,
        url: annconstants.calendarUrl
    }

    actionAttachment.actions.push(actionAttachmentAction);

    actionAttachmentAction = {

        type: annconstants.actionType,
        style: annconstants.actionStyleDanger,
        text: annconstants.feedbackHeader,
        url: annconstants.feedbackUrl
    }

    actionAttachment.actions.push(actionAttachmentAction);

    slackMessage.attachments.push(actionAttachment);

    return slackMessage;
}

/** 
 * Posts annoucement to Slack General about the Talk 1 working day before.
 * Personal subscriptions of 10P employees will be an improvement.
 */
export const send = async (request: functions.Request, response: functions.Response) => {

    const upcomingTalk: Talk = await talks.getNextDayTalk();
    const gifLink = await gifstore.getBygoneGif();
    const slackMessage = createAttachmentMessage(upcomingTalk, gifLink);
    const slackWebhooktoken = functions.config().slack.webhooktoken.general;
    const result = await slack.postAnnoucement(slackWebhooktoken, JSON.stringify(slackMessage)); //TODO: Actual message
    response.send(result);
}