import { useGLTF } from "@react-three/drei";
import React from "react";

import greenPepper_url from "../../../assets/models/green-pepper.glb?url";

export const preload = () => useGLTF.preload(greenPepper_url);

export const GreenPepperModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(greenPepper_url) as any;

	return (
		<group {...props} dispose={null}>
			<group
				scale={[0.14, 0.14, 0.14]}
				rotation={[0, -Math.PI / 2, 0]}
				position={[0, -0.04, 0]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["Node-Mesh"].geometry}
					material={materials.lambert2SG}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes["Node-Mesh_1"].geometry}
					material={materials.lambert3SG}
				/>
			</group>
		</group>
	);
};
