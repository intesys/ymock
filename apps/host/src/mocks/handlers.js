// src/mocks/handlers.js
import { rest } from "msw";
import {
  MOCK_PATH_1,
  MOCK_PATH_2,
  MOCK_PATH_3,
} from "../../../../src/constants";

export const handlers = [
  rest.get(MOCK_PATH_1, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        title: "MOCKED RESPONSE 1!",
      })
    );
  }),

  rest.get(MOCK_PATH_2, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        title: "MOCKED RESPONSE 2!",
      })
    );
  }),

  rest.get(MOCK_PATH_3, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        title: "MOCKED RESPONSE 3!",
      })
    );
  }),
];
