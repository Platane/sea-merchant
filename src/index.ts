import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { preload as preloadBanana } from "./app/Game/Model/BananaModel";
import { preload as preloadGrapes } from "./app/Game/Model/GrapesModel";
import { preload as preloadPortModel } from "./app/Game/Model/PortModel";
import { preload as preloadPumpkin } from "./app/Game/Model/PumpkinModel";
import { preload as preloadShipModel } from "./app/Game/Model/SailBoatModel";

Promise.all([
	preloadBanana(),
	preloadGrapes(),
	preloadPortModel(),
	preloadPumpkin(),
	preloadShipModel(),
]).then(() => {
	const root = createRoot(document.body);
	root.render(React.createElement(App));
});
