import { rest } from "msw";

export const mswRest = rest;

export const handlers = [
  rest.post("/create-user", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: "This is the original response message" })
    );
  }),
];
