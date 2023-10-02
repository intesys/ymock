import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { MemoryRouter } from "react-router-dom";
import { Navigation } from "./Navigation";
import { theme } from "./config/yMock";

const yMockTheme = createTheme(theme);

export function App() {
  return (
    <MantineProvider
      // defaultColorScheme="dark"
      theme={yMockTheme}
      withCssVariables={false}
      // cssVariablesResolver={(theme) => {
      //   console.log("cssVariablesResolver", theme);
      //   return theme;
      // }}
    >
      <Notifications />
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    </MantineProvider>
  );
}
