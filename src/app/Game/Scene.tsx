import { MapControls } from "@react-three/drei";
import React from "react";
import { arrayEquals } from "../../utils/array";
import { Ground } from "../Ground/Ground";
import { useGame, useSelector, useStore } from "./appState/hook";
import { SimpleDockModel } from "./Model/SimpleDockModel";
import { Port } from "./Port/Port";
import { Ship } from "./Ship/Ship";

export const Scene = () => (
	<>
		<MapControls
			maxDistance={60}
			minDistance={12}
			enabled={true}
			enableDamping
			maxPolarAngle={Math.PI / 2 - Math.PI / 6}
			minPolarAngle={Math.PI / 12}
		/>

		<LightRig />

		<Ships />

		<Ports />

		{/*<mesh>
			<boxGeometry args={[0.5, 0.5, 0.5]} />
		</mesh>*/}

		<Water />

		<Ground />
	</>
);

export const LightRig = () => (
	<>
		<ambientLight intensity={1.8} />
		<directionalLight position={[0.2, 1, 0.5]} intensity={2} />
	</>
);

const Water = () => {
	const { onGroundPointerDown, onGroundPointerMove, onGroundPointerUp } =
		useStore();

	return (
		<mesh
			scale={[1, 1, 1]}
			rotation={[-Math.PI / 2, 0, 0]}
			onPointerDown={(e) => onGroundPointerDown([e.point.x, e.point.z])}
			onPointerMove={(e) => onGroundPointerMove([e.point.x, e.point.z])}
			onPointerUp={(e) => onGroundPointerUp([e.point.x, e.point.z])}
		>
			<planeGeometry args={[200, 200, 100, 100]} />
			<meshStandardMaterial color="#5075e2" />
		</mesh>
	);
};

const Ships = () => {
	const { ships } = useGame();
	useSelector(({ game }) => game.ships.map((ship) => ship.id), arrayEquals);

	return ships.map((ship) => <Ship key={ship.id} ship={ship} />);
};

const Ports = () => {
	const { ports } = useGame();
	useSelector(({ game }) => game.ports.map((port) => port.id), arrayEquals);

	return ports.map((port) => <Port key={port.id} port={port} />);
};
