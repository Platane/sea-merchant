import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { initializeGame } from "../../game/initialize";
import { createAppStateStore } from "./appState";
import { Provider, useStore } from "./appState/hook";
import { Scene } from "./Scene";
import styles from "./style.module.css";
import { Ui } from "./Ui/Ui";

export const Game = () => {
	const [store] = React.useState(() => {
		const s = createAppStateStore();
		initializeGame(s.state.game);
		return s;
	});

	return (
		<Provider value={store}>
			<Ui />
			<Canvas className={styles.canvasContainer} camera={{ fov: 40 }}>
				<React.Suspense>
					<Scheduler />
					<Scene />
				</React.Suspense>
			</Canvas>
		</Provider>
	);
};

const Scheduler = () => {
	useFrame(useStore().step);
	return null;
};
