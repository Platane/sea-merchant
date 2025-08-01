import { OrbitControls } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { arrayEquals } from "../../utils/array";
import { Port } from "./Port/Port";
import { Ship } from "./Ship/Ship";
import { useGame, useGameSelector } from "./state";

export const Scene = () => (
	<>
		<OrbitControls />

		<ambientLight />

		<directionalLight position={[0.2, 1, 0.5]} />

		<Ships />

		<Ports />

		<Ground />
	</>
);

const Ground = () => {
	return (
		<mesh
			scale={[25, 25, 25]}
			rotation={[-Math.PI / 2, 0, 0]}
			onPointerMove={(e) => console.log(e.point.x, e.point.z)}
		>
			<planeGeometry args={[1, 1]} />
			<meshStandardMaterial color="#eee" />
		</mesh>
	);
};

const Ships = () => {
	const { ships } = useGame();
	useGameSelector(({ ships }) => ships.map((ship) => ship.id), arrayEquals);

	return ships.map((ship) => <Ship key={ship.id} ship={ship} />);
};

const Ports = () => {
	const { ports } = useGame();
	useGameSelector(({ ports }) => ports.map((port) => port.id), arrayEquals);

	return ports.map((port) => <Port key={port.id} port={port} />);
};
