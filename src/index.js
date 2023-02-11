import React from "react";
import ReactDOM from "react-dom/client";
import ContextApi from "./Routing/contextApi";
import { StrictMode } from "react";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ContextApi>
      <App />
    </ContextApi>
  </StrictMode>
);
