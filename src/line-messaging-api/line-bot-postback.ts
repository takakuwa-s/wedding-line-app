import { WebhookFollowEvent } from '../model/webhook-event';
import { LineBotCommon } from './line-bot-common';
import { MessageType } from '../model/message';

export class LineBotPostback {

  private constructor() {}

  // -------------------------- public method ---------------------------------------------

  public static handlePostbackEvent(event: WebhookFollowEvent): void {
    const messages = [
      {
        type: MessageType.TEXT,
        text: 'postback',
      }
    ];
    LineBotCommon.reply(messages, event.replyToken);
  }
}