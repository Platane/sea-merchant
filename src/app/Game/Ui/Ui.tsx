import React from "react";
import { addShip } from "../../../game/initialize";
import { useSelector, useStore } from "../appState/hook";
import styles from "./style.module.css";

export const Ui = () => {
	const shipCount = useSelector(({ game }) => game.ships.length);
	const store = useStore();

	const ship = useSelector((state) =>
		state.game.ships.find((ship) => ship.id === state.selectedShipId),
	);
	const routePlanning = useSelector((state) => state.routePlanning);

	return (
		<>
			<div className={styles.uiContainer}>
				{/*<div>shipCount: {shipCount}</div>
				<button onClick={() => addShip(store.state.game)}>Add Ship</button>*/}
				<Selection />
			</div>
			{(ship || routePlanning) && (
				<div className={styles.uiShipInfo}>
					{!routePlanning && (
						<button onClick={store.startRoutePlanning}>Plan route</button>
					)}
					{routePlanning && (
						<button onClick={store.finishRoutePlanning}>Finish route</button>
					)}
				</div>
			)}
		</>
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
