import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ConfigureResponse } from "./components/ConfigureResponse";
import { Layout } from "./components/Layout";
import { PleaseSelectApi } from "./components/PleaseSelectApi";
import { Styles } from "./css/Styles";

export const App: React.FC = () => {
  return (
    <MemoryRouter>
      <Styles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PleaseSelectApi />} />
          <Route path=":method">
            <Route path="*" element={<ConfigureResponse />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
