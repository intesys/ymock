import { passthrough } from "msw";
import { ResponseHandler } from "../../types/responseHandler";

export const passthroughResponseHandler: ResponseHandler = () => () => passthrough()
