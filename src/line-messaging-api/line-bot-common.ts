import { Message } from '../model/message';
import { Env } from '../environment';

export class LineBotCommon {

  private static readonly ACCESS_TOKEN: string = Env.getval().lineBot.accessToken;

  private constructor() {}

  // -------------------------- public method ---------------------------------------------

  /**
   * botに返信を行う。
   * @param message 最大長さ5の配列
   * @param token 返信用のアクセストークン
   */
  public static reply(message: Message[], token: string): void {
    const options: any = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LineBotCommon.ACCESS_TOKEN}`,
      },
      payload: JSON.stringify({
        replyToken: token,
        messages: message,
      }),
    };

    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/reply', options);
  }

  /**
   * botからメッセージを送信する。
   * @param message 最大長さ5の配列
   * @param to 最大長さ150のIDの配列
   */
  public static push(message: Message[], to: string[]): void {
    const options: any = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${LineBotCommon.ACCESS_TOKEN}`,
      },
      payload: JSON.stringify({
        to: to,
        messages: message,
      }),
    };

    UrlFetchApp.fetch('https://api.line.me/v2/bot/message/multicast', options);
  }
}
