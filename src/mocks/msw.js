export default {
  worker: {},
  rest: {},
  handlers: [
    {
      shouldSkip: false,
      ctx: {},
      info: {
        header: "GET https://jsonplaceholder.typicode.com/users",
        path: "https://jsonplaceholder.typicode.com/users",
        method: "GET",
      },
    },
    {
      shouldSkip: false,
      ctx: {},
      info: {
        header: "POST https://jsonplaceholder.typicode.com/todos/100",
        path: "https://jsonplaceholder.typicode.com/todos/100",
        method: "POST",
      },
    },
    {
      shouldSkip: false,
      ctx: {},
      info: {
        header: "GET https://jsonplaceholder.typicode.com/posts/100/comments",
        path: "https://jsonplaceholder.typicode.com/posts/100/comments",
        method: "GET",
      },
    },
    {
      shouldSkip: false,
      ctx: {},
      info: {
        header: "GET https://jsonplaceholder.typicode.com/z",
        path: "https://jsonplaceholder.typicode.com/z",
        method: "GET",
      },
    },
    {
      shouldSkip: false,
      ctx: {},
      info: {
        header: "DELETE https://jsonplaceholder.typicode.com/a",
        path: "https://jsonplaceholder.typicode.com/a",
        method: "DELETE",
      },
    },
  ],
};
