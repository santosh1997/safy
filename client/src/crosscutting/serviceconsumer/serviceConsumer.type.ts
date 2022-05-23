export type Request =
  | {
      type: RequestType.GET;
      relativeURL: string;
      authType: AuthType;
    }
  | {
      type: RequestType.POST;
      relativeURL: string;
      content: ContentType.JSON;
      data: {};
      authType: AuthType;
    }
  | {
      type: RequestType.POST;
      relativeURL: string;
      content: ContentType.FORM_DATA;
      data: FormData;
      authType: AuthType;
    };

enum RequestType {
  POST = "POST",
  GET = "GET",
}

enum ContentType {
  JSON = "application/json",
  FORM_DATA = "multipart/form-data",
}

enum AuthType {
  PUBLIC,
  PRIVATE,
}

export interface APIError {
  message: string;
  name: string;
}

export { RequestType, ContentType, AuthType };
