import { useGLTF } from "@react-three/drei";
import React from "react";

import shippingPort_url from "../../../assets/models/shipping-port.glb?url";

useGLTF.preload(shippingPort_url);

export const ShippingPortModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(shippingPort_url) as any;

	return (
		<group {...props} dispose={null}>
			<group
				rotation={[-Math.PI / 2, 0, 0]}
				scale={100}
				position={[-0.5, 0, 0.65]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Port_FirstAge_Level1_1.geometry}
					material={materials.Wood_Light}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Port_FirstAge_Level1_2.geometry}
					material={materials.Wood}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Port_FirstAge_Level1_3.geometry}
					material={materials.Fabric}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Port_FirstAge_Level1_4.geometry}
					material={materials.Metal_Light}
				/>
			</group>
		</group>
	);
};
