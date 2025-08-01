import React from "react";

export const SelectionRingModel = (props: React.ComponentProps<"group">) => {
	return (
		<group {...props} dispose={null}>
			<mesh
				position={[0, 0.2, 0]}
				scale={[1, 1, 0.5]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<torusGeometry args={[1, 0.12]} />
				<meshBasicMaterial color="#fff" toneMapped={false} />
			</mesh>
		</group>
	);
};
