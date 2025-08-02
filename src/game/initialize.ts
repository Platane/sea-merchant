import { createEmptyInventory } from ".";
import { Game, ID, PortActionType, Route } from "./type";

export const generateID = () => Math.floor(Math.random() * 1000000) as ID;
export const initializeGame = (game: Game) => {
	game.players.push({
		id: generateID(),
		name: "Jack",
		color: "blue",
	});
	game.players.push({
		id: generateID(),
		name: "IA",
		color: "red",
	});

	game.ports.push(
		{
			id: generateID(),
			name: "Puerto Santander",
			position: [7, 5],
			deals: [
				{
					give: { amount: 5, resource: game.resources[0] },
					take: { amount: 1, resource: game.resources[1] },
				},
				{
					give: { amount: 9, resource: game.resources[0] },
					take: { amount: 1, resource: game.resources[2] },
				},
				{
					give: { amount: 14, resource: game.resources[0] },
					take: { amount: 1, resource: game.resources[3] },
				},

				{
					take: { amount: 5, resource: game.resources[0] },
					give: { amount: 1, resource: game.resources[1] },
				},
				{
					take: { amount: 9, resource: game.resources[0] },
					give: { amount: 1, resource: game.resources[2] },
				},
				{
					take: { amount: 14, resource: game.resources[0] },
					give: { amount: 1, resource: game.resources[3] },
				},
			],
			futureDeals: [],
			shipQueue: [],
			serving: null,
			servingDuration: 50,
			shipQueueDirection: [Math.cos(4), Math.sin(4)],
			storage: {
				playerInventory: {
					[game.players[0].id]: {
						...createEmptyInventory(),
						[game.resources[0]]: 100,
					},
					[game.players[1].id]: {
						...createEmptyInventory(),
						[game.resources[0]]: 100,
					},
				},
				playerStoragePosition: {
					[game.players[0].id]: [Math.cos(1.5), Math.sin(1.5)],
					[game.players[1].id]: [Math.cos(2.5), Math.sin(2.5)],
				},
			},
		},
		{
			id: generateID(),
			name: "New Faro",
			position: [-6, 2],
			deals: [
				{
					give: { amount: 1, resource: game.resources[1] },
					take: { amount: 8, resource: game.resources[0] },
				},
				{
					give: { amount: 1, resource: game.resources[3] },
					take: { amount: 2, resource: game.resources[2] },
				},
			],
			futureDeals: [],
			shipQueue: [],
			serving: null,
			servingDuration: 50,
			shipQueueDirection: [Math.cos(1), Math.sin(1)],
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
			futureDeals: [],

			serving: null,
			servingDuration: 50,
			shipQueueDirection: [Math.cos(5), Math.sin(5)],
		},
		{
			id: generateID(),
			name: "Ruinifar",
			position: [-3, -6],
			deals: [
				// {
				// 	give: { amount: 3, resource: game.resources[3] },
				// 	take: { amount: 1, resource: game.resources[2] },
				// },
			],
			shipQueue: [],
			futureDeals: [],

			serving: null,
			servingDuration: 50,
			shipQueueDirection: [Math.cos(-5), Math.sin(-5)],
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

	// game.ships.push({
	// 	id: generateID(),
	// 	name: "The Explorer",
	// 	blueprint: game.shipBluePrints[0],
	// 	position: [game.ships.length, 0],
	// 	direction: [1, 0],
	// 	target: [0, 0],
	// 	cargo: { ...createEmptyInventory(), [game.resources[0]]: 12 },
	// 	followingRoute: { route, legIndex: 0 },
	// 	owner: game.players[0],
	// });

	game.ships.push({
		id: generateID(),
		name: "Santa Volta",
		blueprint: game.shipBluePrints[0],
		position: [game.ships.length, 0],
		direction: [1, 0],
		target: [0, 0],
		cargo: createEmptyInventory(),
		followingRoute: null,
		owner: game.players[1],
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
		cargo: createEmptyInventory(),
		owner: game.players[1],
		followingRoute: null,
	});
};
