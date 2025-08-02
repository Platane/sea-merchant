import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Ship as ShipType } from "../../../game/type";
import { arrayEquals } from "../../../utils/array";
import { useGame, useSelector, useStore } from "../appState/hook";
import { SailBoatModel } from "../Model/SailBoatModel";
import { SelectionRingModel } from "../Model/SelectionRingModel";
import { Route } from "../Route/Route";
import { resourceColors, resourceModels } from "../theme";
import styles from "./style.module.css";

export const Ship = ({ ship }: { ship: ShipType }) => {
	const ref = React.useRef<THREE.Group>(null);

	useFrame(() => {
		const group = ref.current;
		if (!group) return;

		group.position.set(ship.position[0], 0, ship.position[1]);

		const angle =
			-Math.atan2(ship.direction[1], ship.direction[0]) + Math.PI / 2;
		group.quaternion.identity();
		group.rotateY(angle);
	});

	const selected = useSelector(
		({ selectedShipId }) => selectedShipId === ship.id,
	);

	const [hover, setHover] = React.useState(false);

	useSelector(() => Object.values(ship.cargo), arrayEquals);

	const { onShipPointerDown } = useStore();

	return (
		<>
			{ship.followingRoute && (
				<Route route={ship.followingRoute.route} color="orange" />
			)}
			<group
				ref={ref}
				onPointerEnter={() => setHover(true)}
				onPointerLeave={() => setHover(false)}
				onPointerDown={(e) => {
					e.stopPropagation();
					onShipPointerDown(ship.id);
				}}
			>
				<mesh
					geometry={capsuleGeometry}
					material={capsuleMaterial}
					scale={[0.8, 1, 1.5]}
					position={[0, 0.32, 0]}
					visible={false}
				/>
				<SailBoatModel />
				<Cargo ship={ship} />
				{(hover || selected) && <ShipOverlay ship={ship} />}
				{selected && <SelectionRingModel scale={[0.6, 0.6, 0.6]} />}
			</group>
		</>
	);
};

const capsuleGeometry = new THREE.SphereGeometry(0.5, 10, 10);
const capsuleMaterial = new THREE.MeshBasicMaterial();

const ShipOverlay = ({ ship }: { ship: ShipType }) => {
	const { resources } = useGame();
	const total = ship.blueprint.cargoCapacity;

	return (
		<Html position={[0, 0.3, 0]} className={styles.overlay}>
			<div className={styles.cargoContainer}>
				{resources.map((r) => (
					<div
						key={r}
						style={
							{
								width: (ship.cargo[r] / total) * 100 + "%",
								"--color": resourceColors[r],
							} as any
						}
					/>
				))}
			</div>
		</Html>
	);
};

const Cargo = ({ ship }: { ship: ShipType }) => {
	const { resources } = useGame();
	const cargoItems: React.ReactElement[] = [];
	for (const r of resources) {
		const Model = resourceModels[r];
		for (let k = 0; k < ship.cargo[r]; k++) {
			const i = cargoItems.length;
			const x = i % 3;
			const z = Math.floor(i / 3) % 5;
			const y = Math.floor(i / 15);
			cargoItems.push(
				<Model
					key={i}
					position={[
						//
						(x - 3 / 2) * 0.2,
						0.2 + y * 0.2,
						(z - 5 / 2) * 0.2,
					]}
					scale={[0.4, 0.4, 0.4]}
				/>,
			);
		}
	}

	return cargoItems;
};
