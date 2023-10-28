import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Header } from "./Header";

export const Layout: React.FC = () => {
  return (
    <div className="wrapper">
      <header>
        <Header />
      </header>
      <div className="content-wrapper">
        <nav>
          <Navigation />
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
