import { HttpData } from '../model/http-data';
import { WebhookRequestBody } from '../model/webhook-event';
import { LineBotRouting } from '../line-messaging-api/line-bot-routing';

/**
 * LINE Messaging APIからのwebhook
 * @param e HttpData
 */
function doPost(e: HttpData): void {
  console.log(e);
  const contents: string = e.postData.contents;
  const webhookRequestBody: WebhookRequestBody = JSON.parse(contents);
  for (const event of webhookRequestBody.events) {
    LineBotRouting.handleEvent(event);
  }
}
