import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";

const root = createRoot(document.body);
root.render(React.createElement(App));
