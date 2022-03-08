import { MessageType } from '../model/message';
import { WebhookMessageEvent, WebhookFollowEvent, WebhookPostbackEvent,
  WebhookEventType, WebhookEvent, WebhookEventSourceType} from '../model/webhook-event';
import { LineBotCommon } from './line-bot-common';
import { LineBotFollow } from './line-bot-follow';
import { LineBotMessage } from './line-bot-message';
import { LineBotPostback } from './line-bot-postback';

/**
 * イベントに応じて、各処理の呼び出しを行う
 */
export class LineBotRouting {

  private constructor() {}

  // ------------------------１階層目（クラス外から呼ばれる。イベントが発生した場所で分類）----------------------

  /**
   * ① イベントの発生場所を基に対象メソッドを呼び出す
   * @param event WebhookEvent
   */
  public static handleEvent(event: WebhookEvent): void {
    switch (event.source.type) {
      case WebhookEventSourceType.USER:
        LineBotRouting.handleEventByUser(event);
        break;
      case WebhookEventSourceType.GROUP:
      case WebhookEventSourceType.ROOM:
        LineBotRouting.handleEventByGroup(event);
      default:
        console.log(`LINE botエラー。不明なソースから呼ばれました。 : ${event.source.type}`);
    }
  }

  // ------------------------2階層目----------------------

  /**
   * ② 個人LINEで、イベントが発生した場合
   * @param event WebhookEvent
   */
  private static handleEventByUser(event: WebhookEvent): void {
    switch (event.type) {
      case WebhookEventType.MESSAGE:
        const msgEvent: WebhookMessageEvent = event as WebhookMessageEvent;
        LineBotMessage.handleMessageEvent(msgEvent);
        break;
      case WebhookEventType.FOLLOW:
        const followEvent: WebhookFollowEvent = event as WebhookFollowEvent;
        LineBotFollow.handleFollowEvent(followEvent);
        break;
      case WebhookEventType.POSTBACK:
        const postbackEvent: WebhookPostbackEvent = event as WebhookPostbackEvent;
        LineBotPostback.handlePostbackEvent(postbackEvent);
        break;
      default:
        // ブロックなどのeventは何もしない。
    }
  }

  /**
   * ② グループLINEで、イベントが発生した場合
   * @param event WebhookEvent
   */
  private static handleEventByGroup(event: WebhookEvent): void {
    switch (event.type) {
      case WebhookEventType.MESSAGE:
        const msgEvent: WebhookMessageEvent = event as WebhookMessageEvent;
        const messages = [
          {
            type: MessageType.TEXT,
            text: '個人チャットのみで対応しています',
          },
          {
            type: MessageType.STICKER,
            packageId: '11538',
            stickerId: '51626522',
          },
        ];
        LineBotCommon.reply(messages, msgEvent.replyToken);
        break;
      default:
        // メッセージ以外のeventは何もしない。
    }
  }
}
