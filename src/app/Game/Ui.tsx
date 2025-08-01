import React from "react";
import { useGame, useGameSelector, useUserState } from "./state";
import styles from "./style.module.css";

export const Ui = ({ addShip }: { addShip: () => void }) => {
	const shipCount = useGameSelector((game) => game.ships.length);

	return (
		<div className={styles.uiContainer}>
			<div>shipCount: {shipCount}</div>
			<button onClick={addShip}>Add Ship</button>
			<Selection />
		</div>
	);
};

const Selection = () => {
	const selectedId = useUserState((s) => s.selectedId);
	const game = useGame();

	const port = game.ports.find((port) => port.id === selectedId);
	const ship = game.ships.find((ship) => ship.id === selectedId);

	if (port) return <div>port: {port.name}</div>;
	if (ship) return <div>ship: {ship.name}</div>;
	return null;
};
