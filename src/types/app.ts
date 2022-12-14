import { RestHandler, SetupWorkerApi } from "msw";

export type MSWglobalExports = {
  worker?: SetupWorkerApi;
  rest: any;
  handlers: RestHandler[];
};

export type HandlerSortKeysType = "Select an option" | "Name" | "Method";

export type MockDefinition = {
  path: string;
  overrides: { once: boolean; body: string }[];
};

export type ErrorTypes = "FATAL_ERROR";
