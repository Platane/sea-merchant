import { useGLTF } from "@react-three/drei";
import React from "react";

import eggplant_url from "../../../assets/models/eggplant.glb?url";

useGLTF.preload(eggplant_url);

export const EggplantModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(eggplant_url) as any;

	return (
		<group {...props} dispose={null}>
			<group
				scale={[0.0045, 0.0045, 0.0045]}
				rotation={[0, Math.PI / 2, 0]}
				position={[-0.035, 0, 0]}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.pasted__pCylinder1_group_1.geometry}
					material={materials.blinn12SG}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.pasted__pCylinder1_group_1_1.geometry}
					material={materials.blinn9SG}
				/>
			</group>
		</group>
	);
};
