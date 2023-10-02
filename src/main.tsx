import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { YMock } from "./YMock";
import { getRoot } from "./lib/htmlElements";
import { RenderFn } from "./types/ymock";
import { MSWContextProvider } from "./components/MSWContext";

const renderFn: RenderFn =
  (window) =>
  ({ worker, handlers }) => {
    const rootElement = getRoot(window);
    const reactRoot = ReactDOM.createRoot(rootElement as HTMLElement);

    reactRoot.render(
      <React.StrictMode>
        <MSWContextProvider {...{ worker, handlers }}>
          <App />
        </MSWContextProvider>
      </React.StrictMode>
    );

    return reactRoot;
  };

export const ymock = new YMock(renderFn);
