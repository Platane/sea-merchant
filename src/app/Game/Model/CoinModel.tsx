import { useGLTF } from "@react-three/drei";
import React from "react";

import coin_url from "../../../assets/models/coin.glb?url";

useGLTF.preload(coin_url);

export const CoinModel = (props: React.ComponentProps<"group">) => {
	const { nodes, materials } = useGLTF(coin_url) as any;

	return (
		<group {...props} dispose={null}>
			<group rotation={[-Math.PI / 2, 0, 0]} scale={50}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Coin_1.geometry}
					material={materials.Yellow}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Coin_2.geometry}
					material={materials.DarkYellow}
				/>
			</group>
		</group>
	);
};
