import { HttpResponse } from "msw";
import { ResponseHandler } from "../../types/responseHandler";

export const jsonResponseHandler: ResponseHandler = (body) => () => HttpResponse.json(body);
