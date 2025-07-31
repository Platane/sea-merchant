import React from "react";

export const preload = () => Promise.resolve();

export const PortModel = (props: React.ComponentProps<"group">) => {
	return (
		<group {...props} dispose={null}>
			<mesh>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color="red" />
			</mesh>
		</group>
	);
};
