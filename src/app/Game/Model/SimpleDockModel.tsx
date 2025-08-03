import { useGLTF } from "@react-three/drei";
import React from "react";

import simpleDock_url from "../../../assets/models/simple-dock.glb?url";

useGLTF.preload(simpleDock_url);

export const SimpleDockModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(simpleDock_url) as any;

	return (
		<group {...props} dispose={null}>
			<group
				rotation={[-Math.PI / 2, 0, 0]}
				scale={100}
				position={[0.38, 0, -0.3]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Houses_FirstAge_3_Level1_1.geometry}
					material={materials.Wood}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Houses_FirstAge_3_Level1_2.geometry}
					material={materials.Wood_Light}
				/>
			</group>
		</group>
	);
};
