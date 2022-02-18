/* ---------------------------------
lib
--------------------------------- */

import { SetupWorkerApi } from "msw";

// TODO types, error handling...
export function setRuntimeRequestHandler(
  worker: SetupWorkerApi,
  rest: {
    [x: string]: (
      arg0: string,
      arg1: (req: any, res: any, ctx: any) => any
    ) => any;
  }
) {
  return function (body: string, path: string, method: string = "get") {
    worker.use(
      rest[method](path, (req: any, res: any, ctx: any) => {
        return res.once(ctx.json(JSON.parse(body)));
      })
    );
  };
}
