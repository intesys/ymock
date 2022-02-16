/* ---------------------------------
App
--------------------------------- */

import React from "react";
import Layout from "./components/Layout";

function App() {
  const { msw } = window;
  const { worker, rest, handlers } = msw ?? {};

  if (!worker || !rest || !handlers) {
    return <div>Error</div>;
  }

  return (
    <div className="App">
      <Layout worker={worker} rest={rest} handlers={handlers} />
    </div>
  );
}

export default App;
