/* ---------------------------------
constants
--------------------------------- */

import { ColorScheme } from "@mantine/core";

// env
export const DEV_MODE = import.meta.env.DEV;

// errors
export const ERROR__LAUNCHER_FATAL_ERROR = `Fatal Error: Please ensure your app is passing a \`msw\` object to the \`Launcher\` component.`;

export const ERROR__GLOBAL_FATAL_ERROR = `Fatal Error: Please ensure your app is saving a \`msw\` object to the global scope.
      
      Hints:
      
      - Did you mean to launch the app in hosted mode? Please visit the \`/\` route and launch it from there.
      - Are you trying to run the app in standalone mode? Please enable STANDALONE_MODE in .env and re-run the server.
      `;

// labels
export const APP_NAME = "yMock";
export const APP_DIR = "__ymock";
export const MESSAGE__SELECT_FROM_SIDEBAR = `Please select an item from the sidebar.`;

// URLs
export const APP_ROOT = `/${APP_DIR}/index.html#/`;
export const APP_SOURCE = "https://github.com/intesys/ymock/";

// values
export const DEFAULT_THEME: ColorScheme = "dark";

// other
export const EXAMPLE_TYPE = `
  let msw: MSWglobalExports;

  type MSWglobalExports = {
    worker: SetupWorkerApi;
    rest: any;
    handlers: RestHandler<MockedRequest<DefaultRequestBody>>[];
  };
`;
