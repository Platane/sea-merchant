import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { preload as preloadPortModel } from "./app/Game/Model/PortModel";
import { preload as preloadShipModel } from "./app/Game/Model/SailBoatModel";

Promise.all([
	//
	preloadPortModel(),
	preloadShipModel(),
]).then(() => {
	const root = createRoot(document.body);
	root.render(React.createElement(App));
});
