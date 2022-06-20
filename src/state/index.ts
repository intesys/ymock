import create from "zustand";
import { APP_NAME } from "../constants";
import { GlobalState } from "../types";
import { devtools, persist } from "zustand/middleware";

type ZustandStateMerger = any; // TODO (s: GlobalState) => Partial<GlobalState>

const store: (setter: ZustandStateMerger) => GlobalState = (set) => ({
  actions: {
    setRuntimeOverride: (id, once, body) =>
      set((state: GlobalState) => {
        const override = { once, body };

        return {
          ...state,
          mocks: {
            ...state.mocks,

            [id]: {
              ...(state.mocks[id] ?? { path: id }),
              overrides: [override].concat(state.mocks[id]?.overrides ?? []),
            },
          },
        };
      }),
  },

  meta: {
    app: APP_NAME,
    source: "https://github.com/intesys/ymock/",
  },
  mocks: {},
  settings: {},
});

export const useStore = create(
  devtools(persist(store, { name: `${APP_NAME}_persisted_store` }), {
    name: `${APP_NAME}_store`,
  })
);
