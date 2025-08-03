import { useGLTF } from "@react-three/drei";
import React from "react";

import sailBoat_url from "../../../assets/models/sail-boat.glb?url";

useGLTF.preload(sailBoat_url);

export const SailBoatModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(sailBoat_url) as any;

	return (
		<group {...props} dispose={null}>
			<group
				position={[-0.01, 0.04, 0.142]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={100}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Sail_1.geometry}
					material={materials.DarkWood}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Sail_2.geometry}
					material={materials.Sail}
				/>
			</group>
			<group
				position={[-0.01, -0.002, -0.004]}
				rotation={[-Math.PI / 2, 0, 0]}
				scale={100}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Boat_1.geometry}
					material={materials.DarkWood}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Boat_2.geometry}
					material={materials.LightWood}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Boat_3.geometry}
					material={materials.Steel}
				/>
			</group>
		</group>
	);
};
