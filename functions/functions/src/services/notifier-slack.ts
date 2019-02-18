import * as functions from 'firebase-functions';
import { WebClient, ChatPostMessageArguments, WebAPICallResult, IncomingWebhook, IncomingWebhookSendArguments, IncomingWebhookResult } from '@slack/client';

/** Post to a slack channel via an Web API. */
export const postByWebApi = async (message: ChatPostMessageArguments): Promise<WebAPICallResult> => {

    const authToken = functions.config().slack.auth.oauth;
    const client = new WebClient(authToken);
    const result =  await client.chat.postMessage(message);
    return result;
}

/** Post to a slack channel via an Incoming Webhook. */
export const postByWebhook = async (channelToken: string, message: IncomingWebhookSendArguments): Promise<IncomingWebhookResult> => {

    const webhookUrl = functions.config().slack.webhookurl + channelToken;
    const webhook = new IncomingWebhook(webhookUrl);
    const result = await webhook.send(message);
    return result;
}
