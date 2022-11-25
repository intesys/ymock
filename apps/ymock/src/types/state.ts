/* ---------------------------------
state
--------------------------------- */

import { MockDefinition } from "./app";
import { ColorScheme } from "@mantine/core";

type GlobalStateMeta = {
  app: string;
  source: string;
  version: string;
};

export type GlobalStateMocks = Partial<
  Record<
    // the path, or a UUID
    string,
    MockDefinition
  >
>;

export type GlobalStateSettings = {
  theme: ColorScheme;
};

type GlobalStateActions = {
  setRuntimeOverride(id: string, once: boolean, body: string): void;
};

export type GlobalState = {
  meta?: Partial<GlobalStateMeta>;
  mocks: GlobalStateMocks;
  settings: GlobalStateSettings;
  actions: GlobalStateActions;
};
