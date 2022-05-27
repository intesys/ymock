export const MOCK_PATH_1 = "https://jsonplaceholder.typicode.com/users";
export const MOCK_PATH_2 = "https://jsonplaceholder.typicode.com/todos/100";
export const MOCK_PATH_3 =
  "https://jsonplaceholder.typicode.com/posts/100/comments";

export const APP_BASE_PATH = process.env.APP_BASE_PATH || "";

export const EXAMPLE_TYPE = `
  let msw: MSWglobalExports;

  type MSWglobalExports = {
    worker: SetupWorkerApi;
    rest: any;
    handlers: RestHandler<MockedRequest<DefaultRequestBody>>[];
  };
`;
