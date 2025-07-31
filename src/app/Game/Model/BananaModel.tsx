import { useGLTF } from "@react-three/drei";
import React from "react";

import banana_url from "../../../assets/models/banana.glb?url";

export const preload = () => useGLTF.preload(banana_url);

export const BananaModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(banana_url) as any;

	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.pasted__pCube11_group_1.geometry}
				material={materials.blinn10SG}
				scale={[0.005, 0.005, 0.005]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.pasted__pCube11_group_1_1.geometry}
				material={materials.blinn2SG}
				scale={[0.005, 0.005, 0.005]}
			/>
		</group>
	);
};
