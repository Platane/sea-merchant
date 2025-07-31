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
		</group>
	);
};
