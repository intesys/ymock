import { Title } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { ApiList } from "./ApiList";

export const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <header>
        <div>yMock dashboard</div>
      </header>
      <div className="content-wrapper">
        <nav>
          <ApiList />
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
