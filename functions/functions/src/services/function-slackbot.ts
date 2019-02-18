import * as functions from 'firebase-functions';
import { slackEvent } from '../interfaces/slack-event';

/** 
 * Receives Slackbot event payloads to respond back.
 */
export const eventListener = async (request: functions.Request, response: functions.Response) => {

    try {
        const payload: slackEvent = request.body;
        response.send(payload.challenge);

        if (payload.event.type === "app_mention" && payload.event.text !== undefined) {
            
            // Responding to greetings
            if (payload.event.text.includes("hi") || payload.event.text.includes("hello") || payload.event.text.includes("good morning")) {

                // Make call to chat.postMessage using bot's token
            }
            // Apologetically inform that there is no answer so far
            else {

                // Call chat.postMessage to inform that I yet do not understand that but may do soon
            }
        }
    }
    catch (err) {
        response.send(err.message);
    }
}
