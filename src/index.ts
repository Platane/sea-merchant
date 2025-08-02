import React from "react";
import { createRoot } from "react-dom/client";
import { generateIcons } from "./app/Game/Icon/ResourceIcon";
import { preload as preloadBanana } from "./app/Game/Model/BananaModel";
import { preload as preloadGrapes } from "./app/Game/Model/GrapesModel";
import { preload as preloadPortModel } from "./app/Game/Model/PortModel";
import { preload as preloadPumpkin } from "./app/Game/Model/PumpkinModel";
import { preload as preloadShipModel } from "./app/Game/Model/SailBoatModel";

Promise.all([
	import("./app/App"),
	generateIcons(),
	preloadPortModel(),
	preloadShipModel(),
]).then(([{ App }]) => {
	// for (const r of [1, 2, 3]) {
	// 	const img = document.createElement("img");
	// 	img.style.width = "256px";
	// 	img.style.height = "256px";
	// 	img.src = getResourceIconUri(r, 256);
	// 	document.body.appendChild(img);
	// }

	const root = createRoot(document.body);
	root.render(React.createElement(App));
});
