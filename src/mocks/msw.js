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
        callFrame:
          "RestHandler@http://localhost:3000/static/js/bundle.js:22897:5",
      },
    },
    {
      shouldSkip: false,
      ctx: {},
      info: {
        header: "GET https://jsonplaceholder.typicode.com/todos/100",
        path: "https://jsonplaceholder.typicode.com/todos/100",
        method: "GET",
        callFrame:
          "RestHandler@http://localhost:3000/static/js/bundle.js:22897:5",
      },
    },
    {
      shouldSkip: false,
      ctx: {},
      info: {
        header: "GET https://jsonplaceholder.typicode.com/posts/100/comments",
        path: "https://jsonplaceholder.typicode.com/posts/100/comments",
        method: "GET",
        callFrame:
          "RestHandler@http://localhost:3000/static/js/bundle.js:22897:5",
      },
    },
  ],
};
