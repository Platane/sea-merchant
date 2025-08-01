import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { useStore } from "./appState/hook";

const m = new THREE.Vector3();
export const Camera = () => {
	const state = useStore().state;
	const { camera } = useThree();

	useFrame(() => {
		camera.position.set(
			state.camera.eye[0],
			state.camera.eye[1],
			state.camera.eye[2],
		);
		m.set(
			state.camera.target[0],
			state.camera.target[1],
			state.camera.target[2],
		);
		camera.lookAt(m);
	});

	return null;
};
