import { message } from "antd";
import {
  AUTH_TOKEN_STORAGE_KEY,
  LOGIN_PATH,
} from "../../components/Route/PrivateRoute/PrivateRoute.constant";
import {
  APIError,
  AuthType,
  ContentType,
  Request,
  RequestType,
} from "./serviceConsumer.type";

const ServiceConsumer = (() => {
  const setHeader = (fetchOptions: RequestInit, key: string, value: string) => {
    if (!fetchOptions.headers) fetchOptions.headers = {};
    (fetchOptions.headers as { [key: string]: string })[key] = value;
  };
  const getFetchOptions = (request: Request): RequestInit => {
    const options: RequestInit = { headers: {} };
    if (request.authType === AuthType.PRIVATE) {
      setHeader(
        options,
        "authorization",
        localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || ""
      );
    }
    if (request.type === RequestType.POST) {
      options.method = request.type;
      if (request.content === ContentType.JSON) {
        setHeader(options, "Content-Type", `${request.content}`);
        options.body = JSON.stringify(request.data);
      } else if (request.content === ContentType.FORM_DATA)
        options.body = request.data;
    }
    return options;
  };

  const callService = async (
    request: Request
  ): Promise<Response | undefined> => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_CORE_API_BASE_URL}${request.relativeURL}`,
        getFetchOptions(request)
      );
      if (response.status === 200) return response;
      else {
        const APIError: APIError = await response.json();
        message.error(APIError.message);
        if (response.status === 401) {
          localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, "");
          window.location.replace(LOGIN_PATH);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return {
    callJSONService: async <ResponseDataType>(
      request: Request
    ): Promise<ResponseDataType | undefined> => {
      try {
        const response = await callService(request);
        if (response) return (await response.json()) as ResponseDataType;
      } catch (e) {
        console.error(e);
      }
    },
    callBLOBService: async (
      request: Request
    ): Promise<{ content: Blob; fileName: string } | undefined> => {
      try {
        const response = await callService(request);
        if (response) {
          const fileName =
            response.headers.get("content-disposition")?.split("=")[1] ||
            "UnnamedFile";
          return { content: await response.blob(), fileName };
        }
      } catch (e) {
        console.error(e);
      }
    },
  };
})();

export default ServiceConsumer;
