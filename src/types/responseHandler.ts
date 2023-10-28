import { DefaultBodyType, ResponseResolver } from "msw";

export type ResponseHandler = (body: DefaultBodyType) => ResponseResolver;
