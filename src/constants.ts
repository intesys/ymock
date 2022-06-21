/* ---------------------------------
constants
--------------------------------- */

// env
export const isDevMode = process.env.NODE_ENV === "development";
export const isStandaloneMode =
  isDevMode && process.env.STANDALONE_MODE === "on";
export const isHostedMode = isDevMode && !isStandaloneMode;

// errors
export const ERROR__LAUNCHER_FATAL_ERROR = `Fatal Error: Please ensure your app is passing a \`msw\` object to the \`Launcher\` component.`;

export const ERROR__GLOBAL_FATAL_ERROR = `Fatal Error: Please ensure your app is saving a \`msw\` object to the global scope.
      
      Hints:
      
      - Did you mean to launch the app in hosted mode? Please visit the \`/\` route and launch it from there.
      - Are you trying to run the app in standalone mode? Please enable STANDALONE_MODE in .env and re-run the server.
      `;

// labels
export const APP_NAME = "yMock";
export const MESSAGE__SELECT_FROM_SIDEBAR = `Please select an item from the sidebar.`;

// URLs
export const APP_ROOT = `__${APP_NAME}`;
export const APP_HOME = isStandaloneMode ? "/" : `/${APP_ROOT}`;

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
