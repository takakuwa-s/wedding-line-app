import { WebhookFollowEvent } from '../model/webhook-event';
import { LineBotCommon } from './line-bot-common';
import { MessageType } from '../model/message';

export class LineBotMessage {

  private constructor() {}

  // -------------------------- public method ---------------------------------------------

  public static handleMessageEvent(event: WebhookFollowEvent): void {
    const messages = [
      {
        type: MessageType.TEXT,
        text: 'message',
      }
    ];
    LineBotCommon.reply(messages, event.replyToken);
  }
}