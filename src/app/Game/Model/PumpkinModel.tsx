import { useGLTF } from "@react-three/drei";
import React from "react";

import pumpkin_url from "../../../assets/models/pumpkin.glb?url";

export const preload = () => useGLTF.preload(pumpkin_url);

export const PumpkinModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(pumpkin_url) as any;

	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.pumpkin.geometry}
				material={materials.None}
				scale={[0.3, 0.3, 0.3]}
			/>
		</group>
	);
};
