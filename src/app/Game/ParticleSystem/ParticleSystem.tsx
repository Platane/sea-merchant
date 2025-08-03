import type RAPIER from "@dimforge/rapier3d-compat";
import type { World } from "@dimforge/rapier3d-compat";
import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Game } from "../../../game/type";
import { useGame } from "../appState/hook";

let rapier: typeof RAPIER;
const promise = import("@dimforge/rapier3d-compat").then(async (r) => {
	await r.init();
	rapier = r;
});

export const ParticleSystem = () => {
	if (!rapier) throw promise;

	const { scene } = useThree();
	const game = useGame();
	const [system] = React.useState(() => createParticlesSystem(rapier, game));
	React.useEffect(() => {
		scene.add(system.container);
		return system.dispose;
	}, [system]);
	useFrame(system.step);

	return null;
};

const createParticlesSystem = (rapier: typeof RAPIER, game: Game) => {
	const gravity = { x: 0.0, y: -9.81, z: 0.0 };

	const world = new rapier.World(gravity);

	const container = new THREE.Object3D();

	const step = () => {};
	const dispose = () => {};

	return {
		step,
		dispose,
		container,
	};
};
