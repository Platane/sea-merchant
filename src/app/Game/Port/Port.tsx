import React from "react";
import * as THREE from "three";
import { Port as PortType } from "../../../game/type";
import { useSelector, useStore } from "../appState/hook";
import { PortModel } from "../Model/PortModel";
import { SelectionRingModel } from "../Model/SelectionRingModel";
import { ShippingPortModel } from "../Model/ShippingPortModel";
import { PortUi } from "./PortUi";

export const Port = ({ port }: { port: PortType }) => {
	const ref = React.useRef<THREE.Group>(null);

	const { onPortPointerDown } = useStore();

	const selected = useSelector(
		({ selectedPortId }) => selectedPortId === port.id,
	);

	const needDealSelection = useSelector(
		({ routePlanning }) => routePlanning?.nextPortId === port.id,
	);

	// useFrame(() => {
	// 	const group = ref.current;
	// 	if (!group) return;
	// 	group.position.set(port.position[0], 0, port.position[1]);
	// });

	const a =
		Math.atan2(port.shipQueueDirection[1], port.shipQueueDirection[0]) -
		Math.PI / 2;

	return (
		<group
			ref={ref}
			position={[port.position[0], 0, port.position[1]]}
			rotation={[0, a, 0]}
			onPointerDown={(e) => {
				e.stopPropagation();
				onPortPointerDown(port.id);
			}}
		>
			<ShippingPortModel position={[0, 0.3, 0]} />

			<mesh name="collisionBox" visible={false}>
				<boxGeometry args={[1.2, 1, 1.5]} />
				<meshStandardMaterial color="red" />
			</mesh>

			{selected && <SelectionRingModel scale={[0.8, 0.8, 0.8]} />}

			{selected && <PortUi port={port} />}
		</group>
	);
};
