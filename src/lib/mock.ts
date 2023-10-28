import { http } from "msw";
import { SetupWorker } from "msw/lib/browser";
import { FormValues } from "../components/form/Form";
import { Method } from "../types/method";
import { ResponseHandler } from "../types/responseHandler";
import { jsonResponseHandler } from "./responseHandlers/jsonResponseHandler";

/**
 * TODO: document
 */
export const mock = (worker: SetupWorker) => (method: Method = 'get', path: string = '/') => (responseHandler: ResponseHandler = jsonResponseHandler) => (data: FormValues) => {
  const _method: Method = (method?.toLowerCase() as Method) ?? "get";

  const { body } = data;

  worker.use(
    http[_method](`/${path}`, responseHandler(body))
  );
};
