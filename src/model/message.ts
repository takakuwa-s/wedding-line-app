/**
 * line-botで送信する場合の型
 * https://developers.line.biz/ja/reference/messaging-api/#message-objects
 */
 export type Message = {
  /** メッセージタイプ */
  type: MessageType;

 /**
  * クイックリプライ機能で使用するプロパティ
  * 複数のメッセージオブジェクトを受信したユーザーには、最後のメッセージオブジェクトのquickReplyプロパティが表示されます。
  */
  quickReply?: QuickReply;
};

/** メッセージタイプ */
export enum MessageType {
  TEXT = 'text',
  STICKER = 'sticker',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  LOCATION = 'location',
  IMAGE_MAP = 'imagemap',
  TEMPLATE = 'template',
  FLEX = 'flex',
}

/**
 * line-botでtextを送信する場合の型
 * typeはtextを指定
 */
export type TextMessage = Message & {
  /** 送りたいテキスト (2000文字まで)*/
  text: string;
};

/**
 * line-botでスタンプを送信する場合の型
 * typeはstickerを指定
 * スタンプは以下から選択
 * https://developers.line.biz/media/messaging-api/sticker_list.pdf
 */
export type StickerMessage = Message & {
  /** スタンプセットのパッケージID */
  packageId: string;

  /** スタンプID */
  stickerId: string;
};

/**
 * line-botで画像を送信する場合の型
 * typeはimageを指定
 */
export type ImageMessage = Message & {
  /** 画像のURL */
  originalContentUrl: string;

  /** プレビュー画像のURL */
  previewImageUrl: string;
};

/**
 * line-botで位置情報を送信する場合の型
 * typeはlocationを指定
 */
export type LocationMessage = Message & {
  /** タイトル */
  title: string;

  /** 住所 */
  address: string;

  /** 緯度 */
  latitude: number;

  /** 経度 */
  longitude: number;
};

/**
 * line-botでテンプレートメッセージを送信する場合の型
 * typeはtemplateを指定
 * 詳細は下記記載
 * https://developers.line.biz/ja/docs/messaging-api/message-types/#template-messages
 */
export type TemplateMessage = Message & {
  /** 代替テキスト。最大文字数：400 */
  altText: string;

  /** ボタン、確認、カルーセル、または画像カルーセルオブジェクト */
  template: TemplateObject;
};

/** テンプレートメッセージのタイプ */
export enum TemplateType {
  BUTTON = 'buttons',
  CONFIRM = 'confirm',
  CAROUSEL = 'carousel',
  IMAGE_CAROUSEL = 'image_carousel',
}

/** テンプレートメッセージの内容 */
export type TemplateObject = {
  /** テンプレートメッセージのタイプ */
  type: TemplateType;
};

/** 確認テンプレート。2つのアクションボタンを表示するテンプレートです。 */
export type ConfirmTemplate = TemplateObject & {
  /** メッセージのテキスト。最大文字数：240 */
  text: string;

  /** タップされたときのアクション */
  actions: ActionObject[];
};

/** ボタンテンプレート。画像、タイトル、テキストに加えて、複数のアクションボタンが含まれたテンプレートです。 */
export type ButtonTemplate = TemplateObject & {
  /**
   * メッセージのテキスト。
   * 画像もタイトルも指定しない場合の最大文字数：160
   * 画像またはタイトルを指定する場合の最大文字数：60
   */
  text: string;

  /**
   * タップされたときのアクション
   * 最大件数：4
   */
  actions: ActionObject[];

  /** 画像、タイトル、テキストの領域全体に対して設定できる、タップされたときのアクション */
  defaultAction?: ActionObject

  /** タイトル。最大文字数：40 */
  title?: string;

  /** 画像の背景色。RGB値で設定します。デフォルト値は#FFFFFF（白）です。 */
  imageBackgroundColor?: string;

  /**
   * 画像の表示形式。以下のいずれかの値を指定します。
   * cover：画像領域全体に画像を表示します。画像領域に収まらない部分は切り詰められます。
   * contain：画像領域に画像全体を表示します。縦長の画像では左右に、横長の画像では上下に余白が表示されます。
   * すべてのカラムに適用されます。デフォルト値はcoverです。
   */
  imageSize?: string;

  /**
   * 画像のアスペクト比。以下のいずれかの値を指定します。
   * rectangle: 1.51:1
   * square: 1:1
   * すべてのカラムに適用されます。デフォルト値はrectangleです。
   */
  imageAspectRatio?: string;

  /**
   * 画像URL（最大文字数：1000）
   * HTTPS（TLS 1.2以降）
   * JPEGまたはPNG
   * 縦横比：1:1.51
   * 最大横幅サイズ：1024px
   * 最大ファイルサイズ：1MB
   */
  thumbnailImageUrl?: string;
};

/** カルーセルテンプレート。複数のカラムを表示するテンプレートです。カラムは横にスクロールして順番に表示できます。 */
export type CarouselTemplate = TemplateObject & {
  /** メッセージのテキスト。最大文字数：240 */
  text: string;

  /**
   * カラムの配列。最大カラム数：10
   */
  columns: CarouselColumn[];

  /**
   * 画像のアスペクト比。以下のいずれかの値を指定します。
   * rectangle: 1.51:1
   * square: 1:1
   * すべてのカラムに適用されます。デフォルト値はrectangleです。
   */
  imageAspectRatio?: string;

  /**
   * 画像の表示形式。以下のいずれかの値を指定します。
   * cover：画像領域全体に画像を表示します。画像領域に収まらない部分は切り詰められます。
   * contain：画像領域に画像全体を表示します。縦長の画像では左右に、横長の画像では上下に余白が表示されます。
   * すべてのカラムに適用されます。デフォルト値はcoverです。
   */
  imageSize?: string;
};

/**
 * カルーセルテンプレートのカラム内容。
 * カルーセルテンプレートメッセージには高さに制限があり、textの表示領域がこの制限を超えると、領域の下部が切り詰められます。
 * このため、メッセージのテキストが最大文字数以内であっても、文字幅によっては完全に表示されない可能性があります。
 * 各カラムのアクションの数は同じにします。
 * 画像またはタイトルの有無も、各カラムで統一してください。
 */
export type CarouselColumn = {
  /**
   * メッセージテキスト
   * 画像もタイトルも指定しない場合の最大文字数：120
   * 画像またはタイトルを指定する場合の最大文字数：60
   */
  text: string;

  /** タップされたときのアクション。最大件数：3 */
  actions: ActionObject[];

  /** タイトル。最大文字数：40 */
  title?: string;

  /**
   * 画像URL（最大文字数：1000）
   * HTTPS（TLS 1.2以降）
   * JPEGまたはPNG
   * 縦横比：1:1.51
   * 最大横幅サイズ：1024px
   * 最大ファイルサイズ：1MB
   */
  thumbnailImageUrl?: string;

  /** 画像の背景色。RGB値で設定します。デフォルト値は#FFFFFF（白）です。 */
  imageBackgroundColor?: string;

  /** 画像、タイトル、テキストの領域全体に対して設定できる、タップされたときのアクション */
  defaultAction?: ActionObject
};

export type QuickReply = {
  /** 最大数：13 */
  items: QuickReplyItem[];
};

/** ボタン形式で表示される、クイックリプライの選択肢 */
export type QuickReplyItem = {
  /** クイックリプライのタイプ */
  type: QuickReplyItemType;

  /** タップされたときのアクション */
  action: ActionObject;

  /** ボタンの先頭に表示するアイコンのURL */
  imageUrl?: string
};

/**
 * クイックリプライのタイプ
*/
export enum QuickReplyItemType {
  ACTION = 'action',
}

/**
 * ユーザーがメッセージ内のボタンまたは画像をタップしたときに、ボットが実行できるアクション
 * https://developers.line.biz/ja/reference/messaging-api/#action-objects
*/
export type ActionObject = {
  /** アクションタイプ */
  type: ActionObjectType;

  /**
   * アクションのラベル
   * 画像カルーセル以外のテンプレートメッセージには必須です。最大文字数：20
   * 画像カルーセルテンプレートメッセージでは省略可能です。最大文字数：12
   * リッチメニューでは省略可能です。ユーザーデバイスのアクセシビリティ機能が有効な場合に読み上げられます。最大文字数：20。iOS版LINE 8.2.0以降でサポートされます。
   * クイックリプライボタンでは必須です。最大文字数：20。Android版とiOS版のLINE 8.11.0以降でサポートされます。
   * Flex Messageでは、ボタンで必須です。ボックス、画像、およびテキストでは、指定しても表示されません。最大文字数：20
   */
  label: string,
};

/**
 * ユーザーがメッセージ内のボタンまたは画像をタップしたときに、ボットが実行できるアクションのタイプ
 * https://developers.line.biz/ja/reference/messaging-api/#action-objects
*/
export enum ActionObjectType {
  POST_BACK = 'postback',
  MESSAGE = 'message',
  URI = 'uri',
  DATE_TIME_PICKER = 'datetimepicker',
  CAMERA = 'camera',
  CAMERA_ROLL = 'cameraRoll',
  LOCATION = 'location',
}

/**
 * メッセージアクション
 * このアクションが関連づけられたコントロールがタップされると、textプロパティの文字列がユーザーからのメッセージとして送信されます。
 */
export type MessageAction = ActionObject & {
  /**
   * アクションの実行時に送信されるテキスト
   * 最大文字数：300
   */
  text: string,
};

/**
 * ポストバックアクション
 * このアクションが関連づけられたコントロールがタップされると、dataプロパティに指定された文字列を含むポストバックイベントが、Webhookを介して返されます。
 */
export type PostbackAction = ActionObject & {
  /**
   * Webhookを介して、ポストバックイベントのpostback.dataプロパティで返される文字列
   * 最大文字数：300
   */
  data: string,

  /**
   * アクションの実行時に、ユーザーのメッセージとしてLINEのトーク画面に表示されるテキスト。
   * 最大文字数：300
   */
  displayText: string;
};

/**
 * 日時選択アクション
 * 日時選択アクションは、iOS版LINE 7.9.0以降とAndroid版LINE 7.12.0以降で利用できます。
 * このアクションが関連づけられたコントロールがタップされると、日時選択ダイアログでユーザーが選択した日時を含むポストバックイベントが、Webhookを介して返されます。
 * 日時選択アクションはタイムゾーンの違いに対応していません。
 */
type DatetimePickerAction = ActionObject & {
  /**
   * Webhookを介して、ポストバックイベントのpostback.dataプロパティで返される文字列
   * 最大文字数：300
   */
  data: string,

  /**
   * アクションモード
   */
  mode: DatetimepickerModeType,

  /**
   * 日付または時刻の初期値
   */
  initial?: string,

  /**
   * 選択可能な日付または時刻の最大値。minの値より大きい必要があります。
   */
  max?: string,

  /**
   * 選択可能な日付または時刻の最小値。maxの値より小さい必要があります。
   */
  min?: string,
};

namespace DatetimePickerAction {
  /**
   * 最大値：2100-12-31
   * 最小値：1900-01-01
   * @param date Date型
   */
  export function toDate(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd');
  }

  /**
   * 最大値：23:59
   * 最小値：00:00
   * @param date Date型
   */
  export function toTime(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'hh:mm');
  }

  /**
   * 最大値：2100-12-31T23:59
   * 最小値：1900-01-01T00:00
   * @param date Date型
   */
  export function toDatetime(date: Date): string {
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-ddThh:mm');
  }
}

export { DatetimePickerAction };

/** 日時選択アクションのアクションモード種別 */
export enum DatetimepickerModeType {
  /** 日付を選択 */
  DATE = 'date',
  /** 時刻を選択 */
  TIME = 'time',
  /** 日付と日時を選択 */
  DATE_TIME = 'datetime',
}
