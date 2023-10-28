import { SetupWorker } from "msw/lib/browser";
import { FormValues } from "../components/form/Form";
import { Method } from "../types/method";
import { HttpResponse, http } from "msw";

export const mock = (worker: SetupWorker) => (method: Method = 'get', path: string = '/') => (data: FormValues) => {
  const _method: Method = (method?.toLowerCase() as Method) ?? "get";

  // TODO: implement different response types
  const { responseType, body } = data;

  worker.use(
    http[_method](`/${path}`, () => {
      return HttpResponse.json(body);
    })
  );
};
