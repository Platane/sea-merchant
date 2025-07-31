import { Game, ID, Resource, ShipBluePrint, Timestamp } from "./type";

export const createGameState = (): Game => {
	return {
		time: 0 as Timestamp,
		ports: [],
		ships: [],
		shipBluePrints: shipBluePrints,
		routes: [],
		// inventory: Object.fromEntries(resources.map((r) => [r, 0])) as Record<
		// 	Resource,
		// 	number
		// >,
		resources,
		resourceWeight,
	};
};

export const createEmptyInventory = (): Record<Resource, number> => {
	return Object.fromEntries(resources.map((r) => [r, 0])) as Record<
		Resource,
		number
	>;
};

const resources = [1, 2, 3] as Resource[];

const resourceWeight = {
	1: 1,
	2: 1,
	3: 2,
} as Record<Resource, number>;

const shipBluePrints: ShipBluePrint[] = [
	{
		id: 1 as ID,
		cargoCapacity: 100,
		speed: 0.05,
	},
];
