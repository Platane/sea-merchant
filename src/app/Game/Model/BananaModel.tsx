import { useGLTF } from "@react-three/drei";
import React from "react";

import banana_url from "../../../assets/models/banana.glb?url";

useGLTF.preload(banana_url);

export const BananaModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(banana_url) as any;

	return (
		<group {...props} dispose={null}>
			<group
				scale={[0.004, 0.004, 0.004]}
				rotation={[0, Math.PI / 2, 0]}
				position={[-0.05, -0.02, 0]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.pasted__pCube11_group_1.geometry}
					material={materials.blinn10SG}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.pasted__pCube11_group_1_1.geometry}
					material={materials.blinn2SG}
				/>
			</group>
		</group>
	);
};
