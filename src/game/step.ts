import { stepIA } from "./ai";
import {
	Deal,
	Game,
	Inventory,
	Port,
	PortActionType,
	Route,
	Ship,
	Timestamp,
} from "./type";

export const stepGame = (state: Game) => {
	state.time++;

	stepIA(state);

	for (const port of state.ports) stepPort(port, state);

	for (const ship of state.ships) {
		stepShipBusiness(ship, state);
		stepShipMovement(ship, state);
	}
};

export const stepPort = (port: Port, state: Game) => {
	if (!port.serving) {
		// start serve the next ship in the queue
		const ship = port.shipQueue.shift();
		port.serving = ship ? { ship, startedDate: state.time } : null;
	}

	if (port.serving) {
		// the port is currently serving a ship
		const servingSince = state.time - port.serving.startedDate;

		if (servingSince > port.servingDuration) {
			// time to execute the deal

			const ship = port.serving.ship;

			// free spot for other ships
			port.serving = null;

			if (!ship.followingRoute) {
				console.warn("No route found for ship at port");
				return;
			}

			const order =
				ship.followingRoute.route.legs[ship.followingRoute.legIndex];

			nextLeg(ship.followingRoute);

			if (!order) {
				console.warn("No order found for ship at port");
				ship.followingRoute = null;
				return;
			}

			if (order.port.id !== port.id) {
				console.warn("Order is not for this port");
				ship.followingRoute = null;
				return;
			}

			// execute the order
			const action = order.action;
			if (action.type === PortActionType.trade) {
				const deal = port.deals.find(
					(d) =>
						d.give.resource === action.take && d.take.resource === action.give,
				);

				if (!deal) {
					console.warn("No matching deal for the port");
					return;
				}

				executeTrade(
					state,
					deal,
					ship.cargo,
					ship.blueprint.cargoCapacity,
					action.max,
				);
			}

			if (action.type === PortActionType.unload) {
				if (!port.storage) {
					console.warn("Port does not support unloading");
					return;
				}

				const portInventory = port.storage.playerInventory[ship.owner.id];

				const k = Math.min(ship.cargo[action.give], action.max);
				ship.cargo[action.give] -= k;
				portInventory[action.give] += k;
			}

			if (action.type === PortActionType.load) {
				if (!port.storage) {
					console.warn("Port does not support loading");
					return;
				}

				const availableSpace =
					ship.blueprint.cargoCapacity -
					state.resources.reduce((sum, r) => sum + ship.cargo[r], 0);

				const portInventory = port.storage.playerInventory[ship.owner.id];

				const k = Math.min(
					availableSpace / state.resourceWeight[action.take],
					action.max,
					portInventory[action.take],
				);
				ship.cargo[action.take] += k;
				portInventory[action.take] -= k;
			}

			// continue serving if more action are on this port
			const nextPort =
				ship.followingRoute.route.legs[ship.followingRoute.legIndex].port;
			if (nextPort.id === port.id)
				port.serving = { ship: ship, startedDate: 0 as Timestamp };
		}
	}
};

export const executeTrade = (
	state: Game,
	deal: Deal,
	inventory: Inventory,
	maxCapacity: number,
	max: number = Infinity,
) => {
	const weightDelta =
		deal.give.amount * state.resourceWeight[deal.give.resource] -
		deal.take.amount * state.resourceWeight[deal.take.resource];

	const availableSpace =
		maxCapacity -
		state.resources.reduce(
			(sum, r) => sum + inventory[r] * state.resourceWeight[r],
			0,
		);

	const k = Math.floor(
		Math.min(
			max,
			weightDelta > 0 ? availableSpace / weightDelta : Infinity,
			inventory[deal.take.resource] / deal.take.amount,
		),
	);

	inventory[deal.give.resource] += k * deal.give.amount;
	inventory[deal.take.resource] -= k * deal.take.amount;
};

const nextLeg = (fr: { route: Route; legIndex: number }) => {
	fr.legIndex = (fr.legIndex + 1) % fr.route.legs.length;
};

export const stepShipMovement = (ship: Ship, state: Game) => {
	const dx = ship.target[0] - ship.position[0];
	const dy = ship.target[1] - ship.position[1];

	const l = Math.hypot(dx, dy);

	const speed = ship.blueprint.speed;

	if (l < speed) {
		ship.target[0] - ship.position[0];
		ship.target[1] - ship.position[1];

		return;
	}

	const vx = dx / l;
	const vy = dy / l;

	ship.direction[0] = vx;
	ship.direction[1] = vy;

	ship.position[0] += vx * speed;
	ship.position[1] += vy * speed;
};

export const stepShipBusiness = (ship: Ship, state: Game) => {
	//
	// let's make the target the port queue
	//
	const port =
		ship.followingRoute &&
		ship.followingRoute.route.legs[ship.followingRoute.legIndex].port;

	const speed = ship.blueprint.speed * 2;

	if (port) {
		let index = port.shipQueue.length + (port.serving ? 1 : 0);
		const i = port.shipQueue.indexOf(ship);
		if (i !== -1) {
			index = i + 1;
		}
		if (port.serving?.ship === ship) {
			index = 0;
		}

		const portGap = 1;
		const shipGap = 0.8;
		const distance = portGap + index * shipGap;
		const tx = port.position[0] + port.shipQueueDirection[0] * distance;
		const ty = port.position[1] + port.shipQueueDirection[1] * distance;

		ship.target[0] = tx;
		ship.target[1] = ty;

		if (
			Math.abs(tx - ship.position[0]) < speed &&
			Math.abs(ty - ship.position[1]) < speed
		) {
			if (port.serving?.ship !== ship && !port.shipQueue.includes(ship)) {
				port.shipQueue.push(ship);
			}
		}
	}
};

function assert(condition: unknown, msg?: string): asserts condition {
	if (condition === false) throw new Error(msg);
}
