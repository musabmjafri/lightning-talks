import * as functions from 'firebase-functions';
import * as slack from './notifier-slack'
import * as gifstore from './collection-gifstore';

/** 
 * Posts annoucement to Slack General about the Talk 1 working day before.
 * Personal subscriptions of 10P employees will be an improvement.
 */
export const send = async (request: functions.Request, response: functions.Response) => {

    const slackWebhooktoken = functions.config().slack.webhooktoken.general;
    const gifLink: string = await gifstore.getBygoneGif();

    slack.postAnnoucement(slackWebhooktoken, gifLink). //TODO: Actual message instead of just the gif link
        then((res) => {
            response.send(res)
        })
        .catch((err) => {
            response.send(err);
        });
}