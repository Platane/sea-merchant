import React from "react";
import { useGameSelector } from "./Game";
import styles from "./style.module.css";

export const Ui = ({ addShip }: { addShip: () => void }) => {
	const time = useGameSelector((game) => game.time);

	return (
		<div className={styles.uiContainer}>
			<div>{time}</div>
			<button onClick={addShip}>Add Ship</button>
		</div>
	);
};
