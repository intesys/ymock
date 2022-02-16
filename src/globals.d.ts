import {
  DefaultRequestBody,
  MockedRequest,
  RestHandler,
  SetupWorkerApi,
} from "msw";

declare global {
  interface Window {
    msw: {
      worker: SetupWorkerApi;
      rest: any;
      handlers: RestHandler<MockedRequest<DefaultRequestBody>>[];
    };
  }
}

export {};
