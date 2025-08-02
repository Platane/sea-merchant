import { useGLTF } from "@react-three/drei";
import React from "react";

import boat_url from "../../../assets/models/boat.glb?url";

export const preload = () => useGLTF.preload(boat_url);

export const BoatModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(boat_url) as any;

	return (
		<group {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
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
					material={materials.Wood}
				/>
			</group>
		</group>
	);
};
