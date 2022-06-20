import create from "zustand";
import { APP_NAME } from "../constants";
import { GlobalState } from "../types";
import { devtools, persist, PersistOptions } from "zustand/middleware";

type ZustandStateMerger = any; // TODO (s: GlobalState) => Partial<GlobalState>

// https://github.com/pmndrs/zustand/wiki/Persisting-the-store's-data
const persistOpts: PersistOptions<GlobalState, Partial<GlobalState>> = {
  name: `${APP_NAME}_store`,
  partialize: (state) =>
    Object.fromEntries(
      Object.entries(state).filter(
        ([key]) => !["mocks", "actions"].includes(key)
      )
    ),
};

const devToolsOpts = { name: `${APP_NAME}_persisted_store` };

const store: (setter: ZustandStateMerger) => GlobalState = (set) => ({
  actions: {
    setRuntimeOverride: (id, once, body) =>
      set((state: GlobalState) => {
        const override = { once, body };

        return {
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
  devtools(persist(store, persistOpts), devToolsOpts)
);
