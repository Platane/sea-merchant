import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Port, Ship } from "../../game/type";
import { arrayEquals } from "../../utils/array";
import { useGame, useGameSelector } from "./Game";
import { PortModel } from "./Model/PortModel";
import { SailBoatModel } from "./Model/SailBoatModel";

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

const Ship = ({ ship }: { ship: Ship }) => {
	const ref = React.useRef<THREE.Group>(null);

	useFrame(() => {
		const group = ref.current;
		if (!group) return;

		group.position.set(ship.position[0], 0, ship.position[1]);

		const angle =
			-Math.atan2(ship.direction[1], ship.direction[0]) + Math.PI / 2;
		group.quaternion.identity();
		group.rotateY(angle);
	});

	return (
		<group ref={ref}>
			<SailBoatModel />
		</group>
	);
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
