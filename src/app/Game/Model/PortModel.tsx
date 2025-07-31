import React from "react";
import { BananaModel } from "./BananaModel";
import { GrapesModel } from "./GrapesModel";
import { PumpkinModel } from "./PumpkinModel";

export const preload = () => Promise.resolve();

export const PortModel = (props: React.ComponentProps<"group">) => {
	return (
		<group {...props} dispose={null}>
			<mesh position={[0, 0.2, 0]}>
				<boxGeometry args={[1, 0.4, 1]} />
				<meshStandardMaterial color="red" />
			</mesh>
			<BananaModel position={[0.7, 0, 0]} rotation={[0, 0, 1.4]} />
			<BananaModel position={[0.7, 0, 0.3]} rotation={[0, 1, 1.4]} />
			<BananaModel position={[0.6, 0, -0.4]} rotation={[0, 1.6, 1.4]} />

			<PumpkinModel position={[0.8, 0.2, 0]} />
			<GrapesModel position={[-0.8, 0.2, 0]} />
		</group>
	);
};
