/* ---------------------------------
App
--------------------------------- */

import React from "react";
import Layout from "./components/Layout";
import _msw from "./mocks/msw";

function App() {
  const { msw } = window;
  // const { worker, rest, handlers } = msw ?? {};
  const { worker, rest, handlers } = _msw;

  if (!worker || !rest || !handlers) {
    return <div>Error</div>;
  }

  return (
    <div className="App">
      <Layout {...{ worker, rest, handlers }} />
    </div>
  );
}

export default App;
