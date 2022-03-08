import { WebhookFollowEvent } from '../model/webhook-event';
import { LineBotCommon } from './line-bot-common';
import { MessageType } from '../model/message';

export class LineBotFollow {

  private constructor() {}

  // -------------------------- public method ---------------------------------------------

  public static handleFollowEvent(event: WebhookFollowEvent): void {
    const messages = [
      {
        type: MessageType.TEXT,
        text: 'フォローありがとう',
      },
      {
        type: MessageType.STICKER,
        packageId: '11538',
        stickerId: '51626522',
      },
    ];
    LineBotCommon.reply(messages, event.replyToken);
  }
}