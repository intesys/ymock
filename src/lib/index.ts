/* ---------------------------------
lib
--------------------------------- */

import { SetupWorkerApi } from "msw";

type RuntimeRequestHandlerArgsType = {
  body: any;
  path: any;
  method?: any;
  once?: boolean;
};

export type RuntimeRequestHandlerType = (args: RuntimeRequestHandlerArgsType) => any;

// TODO types, error handling...
export function setRuntimeRequestHandler(
  worker: SetupWorkerApi,
  rest: {
    [x: string]: (arg0: string, arg1: (req: any, res: any, ctx: any) => any) => any;
  }
): RuntimeRequestHandlerType {
  return function ({ body, path, method = "get", once = false }) {
    worker.use(
      rest[method.toLowerCase()](path, (req: any, res: any, ctx: any) => {
        const responseBody = ctx.json(body);

        return once ? res.once?.(responseBody) : res(responseBody);
      })
    );
  };
}
