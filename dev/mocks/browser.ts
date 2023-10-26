import { SetupWorker, setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// This configures a Service Worker with the given request handlers.
export const worker: SetupWorker = setupWorker(...handlers);
