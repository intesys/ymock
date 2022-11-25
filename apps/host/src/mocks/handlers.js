// src/mocks/handlers.js
import { rest } from "msw";

// mocks
const MOCK_PATH_1 = "https://jsonplaceholder.typicode.com/users";
const MOCK_PATH_2 = "https://jsonplaceholder.typicode.com/todos/100";
const MOCK_PATH_3 = "https://jsonplaceholder.typicode.com/posts/100/comments";

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
