import { MSWglobalExports } from "./types";

declare global {
  interface Window {
    msw: MSWglobalExports;
  }
}

export {};
