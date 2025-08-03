import React from "react";
import { createRoot } from "react-dom/client";
import { generateIcons } from "./app/Game/Icon/ResourceIcon";

Promise.all([import("./app/App"), generateIcons()]).then(([{ App }]) => {
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
