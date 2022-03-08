/** 環境設定を取得する */
export class Env {

  public static getval() {
    return Env.develop;
  }

  /** DEVELOP環境 */
  private static readonly develop = {
    lineBot: {
      accessToken : "yQco+CHsLOGztrlCwwXXHGk4sd1qRHNj5gPZSvmoW1NoIEOKyFK5oBJp36QHkpu/5tj/SkoojUBLfldpw3/4qOJHTlrv7wWXjdrhKY9QowzaPwbZGMnPwbqVYdQbx5Ha58ZmXLxg6TUNRz6tHylDgAdB04t89/1O/w1cDnyilFU="
    }
  };
}