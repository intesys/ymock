// src/mocks/handlers.js
import { rest } from "msw";
import { MOCK_PATH } from "../constants";

export const handlers = [
  rest.get(MOCK_PATH, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        title: "MOCKED RESPONSE!",
      })
    );
  }),
];
