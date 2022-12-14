/* ---------------------------------
App
--------------------------------- */

import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React, { useState } from "react";
import { DEFAULT_THEME } from "./constants";
import Routes from "./Routes";

function App() {
  // https://mantine.dev/theming/dark-theme/
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_THEME);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-right" limit={3} autoClose={4000} zIndex={999}>
          <div className="App">
            <Routes />
          </div>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
