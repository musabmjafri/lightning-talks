import * as functions from 'firebase-functions';
import { IncomingWebhook } from '@slack/client';

/** Post to a slack channel. */
export const postAnnoucement = async (channelToken: string, message: string): Promise<any> => {

    const webhookUrl = functions.config().slack.webhookurl + channelToken;
    const webhook = new IncomingWebhook(webhookUrl);

    return webhook.send(message)
        .then((result) => {
            return result.text;
        })
        .catch((err) => {
            return err.message;
        });
}