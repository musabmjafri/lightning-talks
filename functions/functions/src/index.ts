import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
//import * as talks from './firestore-collections/talks';
//import * as team from './firestore-collections/team';
//import * as gifstore from './firestore-collections/gifstore';
//import * as slack from './services/slack-service'

admin.initializeApp({ credential: admin.credential.applicationDefault() });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const submissionConfirmation = functions.firestore.document('talks/{talk}').onCreate((snap, context) => {
    // Sends emails to speakers when their Talk is submitted by them or by us on their behalf
    // The speakers will be informed of when they might get scheduled approximately 
    // A slack message will be sent us to notify that a Talk has been proposed
});

export const postSpeakerReminder = functions.https.onRequest((request, response) => {
    // Posts a reminder to the speakers via emails that the Talk is coming in few days
    // One reminder 4 working days before the Talk
    // One reminder 2 working days before the Talk
    // Slack reminders will be an improvement
});

export const postAnnoucement = functions.https.onRequest((request, response) => {
    // Posts annoucement to Slack General about the Talk 1 working day before
    // Personal subscriptions of 10P employees will be an improvement
});

export const slackBotEventListener = functions.https.onRequest((request, response) => {
    // Receives Slackbot event payloads to respond back
});

// export const postSlackTestMessage = functions.https.onRequest((request, response) => {
//     const slackWebhook = functions.config().slack.webhookurl + functions.config().slack.webhooktoken.general;
//     slack.postToChannel(slackWebhook, '{"text":"a"}').
//         then((res) => {
//             response.send(res)
//         })
//         .catch((err) => {
//             response.send(err);
//         });
// });

// export const obtainLeastUsedGif = functions.https.onRequest((request, response) => {
//     gifstore.getLeastUsedGif()
//         .then((res) => {
//             response.send(res);
//         })
//         .catch((err) => {
//             response.send(err);
//         });
// });