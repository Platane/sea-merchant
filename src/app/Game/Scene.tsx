import { OrbitControls } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { arrayEquals } from "../../utils/array";
import { useGame, useSelector, useStore } from "./appState/hook";
import { Camera } from "./Camera";
import { Port } from "./Port/Port";
import { Ship } from "./Ship/Ship";

export const Scene = () => (
	<>
		<OrbitControls />
		{/*<Camera />*/}

		<LightRig />

		<Ships />

		<Ports />

		<Ground />
	</>
);

export const LightRig = () => (
	<>
		<ambientLight intensity={1.8} />
		<directionalLight position={[0.2, 1, 0.5]} intensity={2} />
	</>
);

const Ground = () => {
	const { onGroundPointerDown, onGroundPointerMove, onGroundPointerUp } =
		useStore();

	return (
		<mesh
			scale={[25, 25, 25]}
			rotation={[-Math.PI / 2, 0, 0]}
			onPointerDown={(e) => onGroundPointerDown([e.point.x, e.point.z])}
			onPointerMove={(e) => onGroundPointerMove([e.point.x, e.point.z])}
			onPointerUp={(e) => onGroundPointerUp([e.point.x, e.point.z])}
		>
			<planeGeometry args={[1, 1]} />
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
