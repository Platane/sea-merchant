import { createEmptyInventory } from ".";
import { generateID } from "./initialize";
import { executeTrade } from "./step";
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

export const stepIA = (state: Game) => {
	for (const ship of state.ships)
		if (ship.owner.name === "IA") {
			if (!ship.followingRoute) {
				const route = getRoutePlan(state, ship.blueprint.cargoCapacity);
				if (route) ship.followingRoute = { route, legIndex: 0 };
			}
		}
};

const getRoutePlan = (
	state: Game,
	cargoCapacity: number,
): Route | undefined => {
	const routes = listProfitableRoutes(state, cargoCapacity);

	const score = (a: (typeof routes)[number]) =>
		(Math.round(a.profit * 100) * 100) / a.legs.length;

	routes.sort((a, b) => score(b) - score(a));

	const route = routes[0];

	if (route) return { legs: route.legs, id: generateID() };
};

export const listProfitableRoutes = (
	state: Game,
	cargoCapacity: number,
): { legs: Route["legs"]; profit: number }[] => {
	const mainPort = state.ports.find((p) => p.storage)!;

	const coin = state.resources[0];

	const initialInvestment = Math.min(
		1000,
		cargoCapacity / state.resourceWeight[coin],
	);

	const getInventoryValue = (inventory: Inventory) => {
		let sum = inventory[coin];
		for (let i = 1; i < state.resources.length; i++) {
			const resource = state.resources[i];
			const deal = mainPort.deals.find(
				(d) => d.give.resource === coin && d.take.resource === resource,
			);
			if (deal)
				sum += (inventory[resource] / deal.take.amount) * deal.give.amount;
		}
		return sum;
	};

	const openList: { legs: Route["legs"]; inventory: Inventory }[] = [];

	const profitable: { legs: Route["legs"]; profit: number }[] = [];

	openList.push({
		legs: [
			{
				port: mainPort,
				action: {
					type: PortActionType.load,
					take: coin,
					max: Infinity,
				},
			},
		],
		inventory: { ...createEmptyInventory(), [coin]: initialInvestment },
	});

	while (openList.length) {
		const o = openList.shift()!;

		// try to dump

		const value = getInventoryValue(o.inventory);
		if (value > initialInvestment) {
			const legs = o.legs.slice();
			legs[0] = {
				...legs[0],
				action: {
					...legs[0].action,
					max: initialInvestment - o.inventory[coin],
				},
			};

			for (let i = 1; i < state.resources.length; i++) {
				const resource = state.resources[i];
				if (o.inventory[resource] > 0) {
					legs.push({
						port: mainPort,
						action: {
							type: PortActionType.trade,
							give: resource,
							take: coin,
							max: Infinity,
						},
					});
				}
			}

			legs.push({
				port: mainPort,
				action: {
					type: PortActionType.unload,
					give: coin,
					max: Infinity,
				},
			});

			profitable.push({
				legs,
				profit: value / initialInvestment,
			});
		}

		// limit depth search
		if (o.legs.length > 5) continue;

		for (const port of state.ports) {
			for (const deal of port.deals) {
				const newInventory = { ...o.inventory };
				executeTrade(state, deal, newInventory, cargoCapacity);

				if (state.resources.some((r) => newInventory[r] !== o.inventory[r]))
					openList.push({
						legs: [
							...o.legs,
							{
								port,
								action: {
									type: PortActionType.trade,
									take: deal.give.resource,
									give: deal.take.resource,
									max: Infinity,
								},
							},
						],
						inventory: newInventory,
					});
			}
		}
	}

	return profitable;
};
