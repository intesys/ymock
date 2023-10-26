import { Outlet } from "react-router-dom";
import { ApiList } from "./ApiList";
import { Header } from "./Header";

export const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <header>
        <Header />
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
