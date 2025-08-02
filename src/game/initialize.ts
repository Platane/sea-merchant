import { createEmptyInventory } from ".";
import { Game, ID, PortActionType, Route } from "./type";

export const generateID = () => Math.floor(Math.random() * 1000000) as ID;
export const initializeGame = (game: Game) => {
	game.ports.push(
		{
			id: generateID(),
			name: "Puerto Santander",
			position: [7, 5],
			deals: [
				{
					give: { amount: 1, resource: game.resources[0] },
					take: { amount: 1, resource: game.resources[1] },
				},
			],
			shipQueue: [],
			serving: null,
			servingDuration: 50,
			shipQueueDirection: [Math.cos(4), Math.sin(4)],
			inventory: createEmptyInventory(),
		},
		{
			id: generateID(),
			name: "New Faro",
			position: [-6, 2],
			deals: [
				{
					give: { amount: 1, resource: game.resources[1] },
					take: { amount: 1, resource: game.resources[0] },
				},
			],
			shipQueue: [],
			serving: null,
			servingDuration: 50,
			shipQueueDirection: [Math.cos(1), Math.sin(1)],
			inventory: createEmptyInventory(),
		},
		{
			id: generateID(),
			name: "Gegalia",
			position: [2, 8],
			deals: [
				{
					give: { amount: 2, resource: game.resources[1] },
					take: { amount: 1, resource: game.resources[2] },
				},
			],
			shipQueue: [],
			serving: null,
			servingDuration: 50,
			shipQueueDirection: [Math.cos(5), Math.sin(5)],
			inventory: createEmptyInventory(),
		},
		{
			id: generateID(),
			name: "Ruin",
			position: [-3, -6],
			deals: [
				{
					give: { amount: 2, resource: game.resources[1] },
					take: { amount: 1, resource: game.resources[2] },
				},
			],
			shipQueue: [],
			serving: null,
			servingDuration: 50,
			shipQueueDirection: [Math.cos(-5), Math.sin(-5)],
			inventory: createEmptyInventory(),
		},
	);

	const route: Route = {
		id: generateID(),
		legs: [
			{
				port: game.ports[1],
				action: {
					type: PortActionType.trade,
					give: game.resources[0],
					take: game.resources[1],
					max: 10,
				},
			},
			{
				port: game.ports[0],
				action: {
					type: PortActionType.trade,
					give: game.resources[1],
					take: game.resources[0],
					max: 9,
				},
			},
			{
				port: game.ports[2],
				action: {
					type: PortActionType.trade,
					give: game.resources[2],
					take: game.resources[1],
					max: 0,
				},
			},
			{
				port: game.ports[2],
				action: {
					type: PortActionType.unload,
					give: game.resources[2],
					max: 0,
				},
			},
		],
	};

	game.ships.push({
		id: generateID(),
		name: "The Explorer",
		blueprint: game.shipBluePrints[0],
		position: [game.ships.length, 0],
		direction: [1, 0],
		target: [0, 0],
		cargo: { ...createEmptyInventory(), [game.resources[0]]: 12 },
		followingRoute: { route, legIndex: 0 },
	});

	return game;
};

export const addShip = (game: Game) => {
	const a = Math.random() * Math.PI * 2;
	game.ships.push({
		id: generateID(),
		name: "The Adventurer",
		blueprint: game.shipBluePrints[0],
		position: [Math.random() * 4 - 2, Math.random() * 4 - 2],
		direction: [Math.cos(a), Math.sin(a)],
		target: [0, 0],
		cargo: {
			...createEmptyInventory(),
			[game.resources[0]]: 12,
			[game.resources[2]]: 4,
		},
		followingRoute: {
			route: game.ships[0].followingRoute!.route,
			legIndex: 1,
		},
	});
};
