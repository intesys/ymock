import create from "zustand";
import { APP_NAME } from "../constants";
import { GlobalState } from "../types";
import { devtools } from "zustand/middleware";

const store = (set) => ({
  actions: {
    setRuntimeOverride: (id, once, body) =>
      set((state) => {
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

export const useStore = create<GlobalState>(
  devtools(store, { name: `${APP_NAME}_store` })
);
