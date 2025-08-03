import { useGLTF } from "@react-three/drei";
import React from "react";

import pumpkin2_url from "../../../assets/models/pumpkin2.glb?url";

export const preload = () => useGLTF.preload(pumpkin2_url);

export const PumpkinModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(pumpkin2_url) as any;

	return (
		<group {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Pumpkin_1.geometry}
					material={materials.Brown}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Pumpkin_2.geometry}
					material={materials.Orange}
				/>
			</group>
		</group>
	);
};
