import {
  DefaultRequestBody,
  MockedRequest,
  RestHandler,
  SetupWorkerApi,
} from "msw";

export type MSWglobalExports = {
  worker: SetupWorkerApi;
  rest: any;
  handlers: RestHandler<MockedRequest<DefaultRequestBody>>[];
};

export type HandlerSortKeysType = "Select an option" | "Name" | "Method";
