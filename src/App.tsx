import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ApiList } from "./components/ApiList";
import { ConfigureResponse } from "./components/ConfigureResponse";
import { Styles } from "./css/Styles";

export const App: React.FC = () => {
  return (
    <MemoryRouter>
      <Styles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ApiList />} />
          <Route path=":method">
            <Route path="*" element={<ConfigureResponse />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
