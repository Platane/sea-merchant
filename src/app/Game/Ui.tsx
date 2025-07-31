import React from "react";
import { useGameSelector } from "./Game";
import styles from "./style.module.css";

export const Ui = ({ addShip }: { addShip: () => void }) => {
	const shipCount = useGameSelector((game) => game.ships.length);

	return (
		<div className={styles.uiContainer}>
			<div>shipCount: {shipCount}</div>
			<button onClick={addShip}>Add Ship</button>
		</div>
	);
};
