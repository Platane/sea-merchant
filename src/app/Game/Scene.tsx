import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Game, ID, Ship } from "../../game/type";
import { arrayEquals } from "../../utils/array";
import { Subscribable } from "../../utils/subscribable";
import { SailBoatModel } from "./Model/SailBoatModel";

export const Scene = ({
	game,
	subscribe,
}: {
	game: Game;
	subscribe: Subscribable["subscribe"];
}) => {
	return (
		<>
			<OrbitControls />

			<ambientLight />

			<directionalLight position={[0.2, 1, 0.5]} />

			<Ships game={game} subscribe={subscribe} />
		</>
	);
};

const Ships = ({
	game,
	subscribe,
}: {
	game: Game;
	subscribe: Subscribable["subscribe"];
}) => {
	const [_, setIds] = React.useState<ID[]>([]);
	React.useEffect(
		() =>
			subscribe(() => {
				const ids = game.ships.map((ship) => ship.id);
				setIds((l) => (arrayEquals(ids, l) ? l : ids));
			}),
		[game],
	);

	return game.ships.map((ship) => (
		<Ship key={ship.id} ship={ship} game={game} subscribe={subscribe} />
	));
};

const Ship = ({
	ship,
}: {
	ship: Ship;
	game: Game;
	subscribe: Subscribable["subscribe"];
}) => {
	const ref = React.useRef<THREE.Group>(null);

	useFrame(() => {
		const group = ref.current;
		if (!group) return;

		group.position.set(ship.position[0], 0, ship.position[1]);

		const angle = Math.atan2(ship.direction[1], ship.direction[0]);
		group.quaternion.identity();
		group.rotateY(angle);
	});

	return (
		<group ref={ref}>
			<SailBoatModel />
		</group>
	);
};
