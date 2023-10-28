import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Main } from "./components/Main";
import { Layout } from "./components/Layout";
import { Welcome } from "./components/Welcome";
import { Styles } from "./css/Styles";

export const App: React.FC = () => {
  return (
    <MemoryRouter>
      <Styles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path=":method">
            <Route path="*" element={<Main />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
