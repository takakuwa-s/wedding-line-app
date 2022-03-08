/**
 * Webhook URLにPOSTされたリクエストボディ
 * https://developers.line.biz/ja/reference/messaging-api/#webhooks
 */
 export type WebhookRequestBody = {
  /** Webhookイベントを受信すべきボットのユーザーID */
  destination: string;
  /** イベントの情報の配列 */
  events: WebhookEvent[];
};

/** イベントの送信元情報 */
export type WebhookEventSource = {
  /** イベントの送信元情報のタイプ */
  type: WebhookEventSourceType;
  /** 送信元ユーザーのID */
  userId?: string;
  /** 送信元グループのID (グループのみ) */
  groupId?: string;
  /** 送信元トークルームのID(トークルームのみ) */
  roomId?: string;
};

/** イベントの送信元情報のタイプ */
export enum WebhookEventSourceType {
  /** ユーザー */
  USER = 'user',
  /** グループ */
  GROUP = 'group',
  /** トークルーム */
  ROOM = 'room',
}

/** Webhookイベントのタイプ */
export enum WebhookEventType {
  /** メッセージが送信された際のイベント */
  MESSAGE = 'message',
  /** LINE公式アカウントが友だち追加またはブロック解除されたことを示すイベント */
  FOLLOW = 'follow',
  /** LINE公式アカウントがブロックされたことを示すイベント */
  UNFOLLOW = 'unfollow',
  /** ユーザーが、ポストバックアクションを実行したことを示すイベントオブジェクト */
  POSTBACK = 'postback',
}

/** Webhookイベントの情報 */
export type WebhookEvent = {
  /** Webhookイベントのタイプ */
  type: WebhookEventType;
  /** チャネルの状態 */
  mode: string;
  /** イベントの発生時刻（ミリ秒） */
  timestamp: number;
  /** イベントの送信元情報 */
  source: WebhookEventSource;
};

/**
 * Webhookフォローイベントの情報
 * typeはfollow
*/
export type WebhookFollowEvent = WebhookEvent & {
  /** イベントへの応答に使用するトークン */
  replyToken: string;
};

/**
 * Webhookポストバックアクションイベントの情報
 * typeはpostback
*/
export type WebhookPostbackEvent = WebhookEvent & {
  /** イベントへの応答に使用するトークン */
  replyToken: string;

  postback: {
    /** ポストバックデータ */
    data: string;
    /** 日時選択アクションを介してユーザーが選択した日時を含むJSONオブジェクト */
    params?: PostbackEventTimepickerParam;
  }
};

/** 日時選択アクションを介してユーザーが選択した日時を含むJSONオブジェクト */
export type PostbackEventTimepickerParam = {
  /** ユーザーが選択した日付。dateモードの場合にのみ含まれます。 */
  date?: string;

  /** ユーザーが選択した時刻。timeモードの場合にのみ含まれます。 */
  time?: string;

  /** ユーザーが選択した日付と時刻。datetimeモードの場合にのみ含まれます。 */
  datetime?: string;
};

/**
 * Webhookメッセージイベントの情報
 * typeはmessage
*/
export type WebhookMessageEvent = WebhookEvent & {
    /** イベントへの応答に使用するトークン */
  replyToken: string;
    /** 送信されたメッセージ内容 */
  message: SentMessage;
};

/** 送信されたメッセージタイプ */
export enum SentMessageType {
  /** テキスト */
  TEXT = 'text',
  /** 画像 */
  IMAGE = 'image',
  /** 動画 */
  VIDEO = 'video',
  /** 音声 */
  AUDIO = 'audio',
  /** ファイル */
  FILE = 'file',
  /** 位置情報 */
  LOCATION = 'location',
  /** スタンプ */
  STICKER = 'sticker',
}

/** 送信されたメッセージ */
export type SentMessage = {
  /** メッセージID */
  id: string;
  /** 送信されたメッセージタイプ */
  type: SentMessageType;
};

/** 送信されたメッセージ */
export type SentTextMessage = SentMessage & {
    /** テキストメッセージ */
  text: string;
};

/** 送信されたメッセージ */
export type SentImageMessage = SentMessage & {
  /** 画像メッセージ(type = imageの場合のみ) */
  contentProvider?: {

    /** 画像ファイルの提供元 lineまたはexternal */
    type: string;

    /** 画像ファイルのURL。 externalの場合にのみ */
    originalContentUrl?: string;

    /** プレビュー画像のURL。 externalの場合にのみ */
    previewImageUrl?: string;
  };
};
