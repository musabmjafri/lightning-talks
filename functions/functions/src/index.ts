import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as submissionConfirmations from './services/function-submissionConfimations'
import * as speakerReminders from './services/function-speakerreminders'
import * as talkAnnoucements from './services/function-talkannoucements'
import * as slockbot from './services/function-slackbot'

admin.initializeApp({ credential: admin.credential.applicationDefault() });

export const postSubmissionConfirmation = functions.firestore.document('talks/{talk}').onCreate(submissionConfirmations.send);

export const postSpeakerReminder = functions.https.onRequest(speakerReminders.send);

export const postTalkAnnoucement = functions.https.onRequest(talkAnnoucements.send);

export const slackBot = functions.https.onRequest(slockbot.eventListener);
