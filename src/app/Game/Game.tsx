import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { createGameState } from "../../game";
import { addShip, initializeGame } from "../../game/initialize";
import { stepGame } from "../../game/step";
import { createSubscribable } from "../../utils/subscribable";
import { Scene } from "./Scene";
import { createUserStore, GameContext, UserContext, useGame } from "./state";
import styles from "./style.module.css";
import { Ui } from "./Ui";

export const Game = () => {
	const [game] = React.useState(() => {
		const game = createGameState();
		initializeGame(game);
		return game;
	});
	const [{ subscribe, dispatch }] = React.useState(createSubscribable);
	const [userStore] = React.useState(createUserStore);

	return (
		<GameContext.Provider value={{ game, subscribe }}>
			<UserContext.Provider value={userStore}>
				<Ui addShip={() => addShip(game)} />
				<Canvas
					className={styles.canvasContainer}
					camera={{ position: [1, 16, 6] }}
				>
					<React.Suspense>
						<Scheduler afterUpdate={dispatch} />
						<Scene />
					</React.Suspense>
				</Canvas>
			</UserContext.Provider>
		</GameContext.Provider>
	);
};

const Scheduler = ({ afterUpdate }: { afterUpdate: () => void }) => {
	const game = useGame();
	useFrame(() => {
		stepGame(game);
		afterUpdate();
	});
	return null;
};
