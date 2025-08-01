import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Port as PortType } from "../../../game/type";
import { PortModel } from "../Model/PortModel";
import { useUserState, useUserStore } from "../state";

export const Port = ({ port }: { port: PortType }) => {
	const ref = React.useRef<THREE.Group>(null);

	const userStore = useUserStore();

	const selected = useUserState((s) => s.selectedId === port.id);

	// useFrame(() => {
	// 	const group = ref.current;
	// 	if (!group) return;
	// 	group.position.set(port.position[0], 0, port.position[1]);
	// });

	return (
		<group
			ref={ref}
			position={[port.position[0], 0, port.position[1]]}
			onPointerDown={() => userStore.setState({ selectedId: port.id })}
		>
			<PortModel />
		</group>
	);
};
