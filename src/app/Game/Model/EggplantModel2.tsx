import { useGLTF } from "@react-three/drei";
import React from "react";

import eggplant2_url from "../../../assets/models/eggplant2.glb?url";

useGLTF.preload(eggplant2_url);

export const EggplantModel2 = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(eggplant2_url) as any;

	return (
		<group {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Eggplant_1.geometry}
					material={materials.Purple}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Eggplant_2.geometry}
					material={materials.DarkGreen}
				/>
			</group>
		</group>
	);
};
