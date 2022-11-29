import { rest, SetupWorkerApi } from "msw";

export const processChildIntent = (worker: SetupWorkerApi, data: any) => {
  worker.use(
    rest.post("/create-user", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ message: data.values.override_body })
      );
    })
  );
};
