// import { IncomingWebhook } from '@slack/client';

// export async function postToChannel(slackhook: string, message: string): Promise<any> {

//     const webhook = new IncomingWebhook(slackhook);

//     return webhook.send(message)
//         .then((result) => {
//             return result.text;
//         })
//         .catch((err) => {
//             return err.message;
//         });
// }