import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ApiList } from "./components/ApiList";
import { ConfigureResponse } from "./components/ConfigureResponse";

export const Navigation: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<ApiList />} />
      <Route path=":method">
        <Route path="*" element={<ConfigureResponse />} />
      </Route>
    </Route>
  </Routes>
);
