import { Game, ID, Resource, ShipBluePrint, Timestamp } from "./type";

export const createGameState = (): Game => {
	return {
		time: 0 as Timestamp,
		ports: [],
		ships: [],
		players: [],
		shipBluePrints: shipBluePrints,
		resources,
		resourceWeight,
		map: {
			grid: new Uint8Array(),
			navigationMesh: null,
			gridCellSize: 0,
			size: 0,
			heightMap: undefined as any,
			texture: undefined as any,
		},
	};
};

export const createEmptyInventory = (): Record<Resource, number> => {
	return Object.fromEntries(resources.map((r) => [r, 0])) as Record<
		Resource,
		number
	>;
};

const resources = ["coin", "pumpkin", "grapes", "banana"] as Resource[];

const resourceWeight = {
	coin: 0,
	pumpkin: 1,
	grapes: 2,
	banana: 1,
} as Record<Resource, number>;

const shipBluePrints: ShipBluePrint[] = [
	{
		id: 1 as ID,
		name: "Light Saiyajin",
		cargoCapacity: 20,
		speed: 0.02,
	},
];
