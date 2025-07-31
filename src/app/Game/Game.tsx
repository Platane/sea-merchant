import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { createEmptyInventory, createGameState } from "../../game";
import { stepGame } from "../../game/step";
import { Game as GameType, ID } from "../../game/type";
import { createSubscribable, Subscribable } from "../../utils/subscribable";
import { PortModel } from "./Model/PortModel";
import { SailBoatModel } from "./Model/SailBoatModel";
import { Scene } from "./Scene";
import styles from "./style.module.css";

export const Game = () => {
	const [game] = React.useState(createGame);
	const [{ subscribe, dispatch }] = React.useState(createSubscribable);

	React.useEffect(() => {
		const loop = () => {
			stepGame(game);
			dispatch();
			r = requestAnimationFrame(loop);
		};
		let r = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(r);
	}, [game]);

	const addShip = () => {
		const a = Math.random() * Math.PI * 2;
		game.ships.push({
			id: (game.ships.length + 1) as ID,
			blueprint: game.shipBluePrints[0],
			position: [Math.random() * 4 - 2, Math.random() * 4 - 2],
			direction: [Math.cos(a), Math.sin(a)],
			cargo: createEmptyInventory(),
			followingRoute: null,
		});

		dispatch();
	};

	return (
		<>
			<Ui game={game} subscribe={subscribe} addShip={addShip} />
			<Canvas className={styles.canvasContainer}>
				<Suspense>
					<SailBoatModel visible={false} />
					<PortModel visible={false} />
					<Scene game={game} subscribe={subscribe} />
				</Suspense>
			</Canvas>
		</>
	);
};

export const Ui = ({
	game,
	subscribe,
	addShip,
}: {
	addShip: () => void;
	game: GameType;
	subscribe: Subscribable["subscribe"];
}) => {
	const [value, set] = React.useState(0);
	React.useEffect(() => subscribe(() => set(game.time)), [game]);

	return (
		<div className={styles.uiContainer}>
			<div>{value}</div>
			<button onClick={addShip}>Add Ship</button>
		</div>
	);
};

const createGame = () => {
	const game = createGameState();

	game.ships.push({
		id: (game.ships.length + 1) as ID,
		blueprint: game.shipBluePrints[0],
		position: [game.ships.length, 0],
		direction: [1, 0],
		cargo: createEmptyInventory(),
		followingRoute: null,
	});

	return game;
};
