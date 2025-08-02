import React from "react";
import * as THREE from "three";
import { Line2 } from "three/addons/lines/Line2.js";
import { LineGeometry } from "three/addons/lines/LineGeometry.js";
import { LineMaterial } from "three/addons/lines/LineMaterial.js";
import { Route as RouteType } from "../../../game/type";

export const Route = ({
	route,
	color,
	...props
}: {
	route: RouteType;
	color: string;
} & React.ComponentProps<"group">) => {
	return (
		<group
			{...props}
			ref={React.useCallback(
				(g: THREE.Group | null) => {
					if (!g) return;

					g.clear();

					const geometry = new LineGeometry();
					geometry.setPositions(computeRouteCurve(route));

					const material = new LineMaterial({
						color: color,

						worldUnits: false,
						linewidth: 25, // in pixel since worldUnits=false

						dashed: true,
						alphaToCoverage: true,
					});

					const line = new Line2(geometry, material);

					line.computeLineDistances(); // required for dashed lines

					g.add(line);
				},
				[route, color],
			)}
		/>
	);
};

const computeRouteCurve = (route: RouteType) => {
	const h = 0.001;
	const positions = route.legs.flatMap(({ port }) => [
		port.position[0],
		h,
		port.position[1],
	]);

	positions.push(
		route.legs[0].port.position[0],
		h,
		route.legs[0].port.position[1],
	);

	return positions;
};
