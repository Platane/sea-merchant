export type Vec2 = [number, number];

export type Amount = number;

export type Resource = (number | string) & { __type: "Resource" };

export type ID = number & { __type: "ID" };

export type Timestamp = number & { __type: "Date" };

export type ResourceAmount = {
	resource: Resource;
	amount: Amount;
};

export type Deal = {
	give: ResourceAmount;
	take: ResourceAmount;
};

export type Port = {
	id: ID;
	name: string;
	position: Vec2;
	deals: Deal[];
	shipQueue: Ship[];
	shipQueueDirection: Vec2;
	serving: {
		ship: Ship;
		startedDate: Timestamp;
	} | null;
	servingDuration: number;
	inventory: Inventory;
};

export type ShipBluePrint = {
	id: ID;
	name: string;
	cargoCapacity: Amount;
	speed: number;
};

export type Ship = {
	id: ID;
	name: string;
	blueprint: ShipBluePrint;
	position: Vec2;
	direction: Vec2;
	target: Vec2;
	cargo: Inventory;
	followingRoute: { route: Route; legIndex: number } | null;
};

export enum PortActionType {
	trade,
	unload,
	load,
}

export type Route = {
	id: ID;
	legs: {
		port: Port;
		action:
			| {
					type: PortActionType.trade;
					give: Resource;
					take: Resource;
					max: number;
			  }
			| { type: PortActionType.unload; give: Resource; max: number }
			| { type: PortActionType.load; give: Resource; max: number };
	}[];
};

export type Game = {
	time: Timestamp;
	ports: Port[];
	ships: Ship[];
	shipBluePrints: ShipBluePrint[];
	routes: Route[];
	resourceWeight: Record<Resource, number>;
	resources: Resource[];
};

export type Inventory = Record<Resource, Amount>;
