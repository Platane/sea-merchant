import React from "react";
import * as THREE from "three";
import { Port as PortType } from "../../../game/type";
import { useSelector, useStore } from "../appState/hook";
import { PortModel } from "../Model/PortModel";
import { SelectionRingModel } from "../Model/SelectionRingModel";
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

	return (
		<group
			ref={ref}
			position={[port.position[0], 0, port.position[1]]}
			onPointerDown={(e) => {
				e.stopPropagation();
				onPortPointerDown(port.id);
			}}
		>
			<PortModel />
			{selected && <SelectionRingModel scale={[0.8, 0.8, 0.8]} />}
			{selected && <PortUi port={port} />}
		</group>
	);
};
