import { Html, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Port } from "../../game/type";
import { arrayEquals } from "../../utils/array";
import { useGame, useGameSelector } from "./Game";
import { PortModel } from "./Model/PortModel";
import { Ship } from "./Ship/Ship";

export const Scene = () => (
	<>
		<OrbitControls />

		<ambientLight />

		<directionalLight position={[0.2, 1, 0.5]} />

		<Ships />

		<Ports />
	</>
);

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

const Port = ({ port }: { port: Port }) => {
	const ref = React.useRef<THREE.Group>(null);

	useFrame(() => {
		const group = ref.current;
		if (!group) return;

		group.position.set(port.position[0], 0, port.position[1]);
	});

	return (
		<group ref={ref}>
			<PortModel />
		</group>
	);
};
