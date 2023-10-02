import { DefaultBodyType, MockedRequest, RestHandler, SetupWorker } from "msw";
import ReactDOM from "react-dom/client";

export
  type RenderFnParams = {
    worker: SetupWorker;
    handlers: RestHandler<MockedRequest<DefaultBodyType>>[];
  };

export interface RenderFn {
  (window: Window): (params: RenderFnParams) => ReactDOM.Root
}

