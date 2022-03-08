/**
 * doPostまたはdoGetで取得できるデータの型
 * https://developers.google.com/apps-script/guides/web
 */
export type HttpData = {
  queryString: string;
  parameter: object;
  parameters: object;
  contextPath: string;
  contentLength: number;
  postData: {
    length: number;
    type: string;
    contents: string;
    name: string;
  };
};
