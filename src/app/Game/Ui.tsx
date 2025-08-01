import React from "react";
import { useSelector } from "./appState/hook";
import styles from "./style.module.css";

export const Ui = ({ addShip }: { addShip: () => void }) => {
	const shipCount = useSelector(({ game }) => game.ships.length);

	return (
		<div className={styles.uiContainer}>
			<div>shipCount: {shipCount}</div>
			<button onClick={addShip}>Add Ship</button>
			<Selection />
		</div>
	);
};

const Selection = () => {
	const port = useSelector((state) =>
		state.game.ports.find((port) => port.id === state.selectedPortId),
	);
	const ship = useSelector((state) =>
		state.game.ships.find((ship) => ship.id === state.selectedShipId),
	);

	if (port) return <div>port: {port.name}</div>;
	if (ship) return <div>ship: {ship.name}</div>;
	return null;
};
