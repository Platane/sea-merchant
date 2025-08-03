import { useGLTF } from "@react-three/drei";
import React from "react";

import grapes_url from "../../../assets/models/grapes.glb?url";

useGLTF.preload(grapes_url);

export const GrapesModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(grapes_url) as any;

	return (
		<group {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.pasted__pSphere26_group_1.geometry}
				material={materials.blinn12SG}
				scale={[0.005, 0.005, 0.005]}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.pasted__pSphere26_group_1_1.geometry}
				material={materials.blinn10SG}
				scale={[0.005, 0.005, 0.005]}
			/>
		</group>
	);
};
