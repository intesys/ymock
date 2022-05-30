/* ---------------------------------
constants
--------------------------------- */

// env
export const isDevMode = process.env.NODE_ENV === "development";
export const isStandaloneMode = process.env.STANDALONE_MODE === "on";
export const APP_BASE_PATH = process.env.APP_BASE_PATH || "";

// errors
export const ERROR__FATAL_ERROR = `Fatal Error: Please ensure your app is passing a \`msw\` object to the \`Launcher\` component.`;

export const ERROR__FATAL_ERROR_DEV_VARIANT = `Fatal Error: Please ensure your app is saving a \`msw\` object to the global scope.
      
      Hints:
      
      - Are you trying to run the app in standalone mode? Please enable STANDALONE_MODE in .env and re-run the server.
      - Did you mean to launch the app in hosted mode? Please visit the /demo route and launch it from there.
      `;

// labels
export const APP_NAME = "yMock";

// mocks
export const MOCK_PATH_1 = "https://jsonplaceholder.typicode.com/users";
export const MOCK_PATH_2 = "https://jsonplaceholder.typicode.com/todos/100";
export const MOCK_PATH_3 =
  "https://jsonplaceholder.typicode.com/posts/100/comments";

export const EXAMPLE_TYPE = `
  let msw: MSWglobalExports;

  type MSWglobalExports = {
    worker: SetupWorkerApi;
    rest: any;
    handlers: RestHandler<MockedRequest<DefaultRequestBody>>[];
  };
`;
