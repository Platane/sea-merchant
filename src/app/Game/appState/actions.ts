import { generateID } from "../../../game/initialize";
import { ID, PortAction, Vec2 } from "../../../game/type";
import { AppState } from ".";

export const onShipPointerDown = (state: AppState, shipId: ID) => {
	if (state.routePlanning) return;

	state.selectedShipId = state.selectedPortId = null;
	state.selectedShipId = shipId;
};

export const onPortPointerDown = (state: AppState, portId: ID) => {
	if (state.routePlanning) {
		if (!state.routePlanning.nextPortId)
			state.routePlanning.nextPortId = portId;
	} else {
		state.selectedShipId = state.selectedPortId = null;
		state.selectedPortId = portId;
	}
};

export const onGroundPointerDown = (state: AppState, groundPosition: Vec2) => {
	console.log(...groundPosition);

	state.selectedShipId = state.selectedPortId = null;
	state.camera.pan = { startPointer: [groundPosition[0], groundPosition[1]] };
};

export const onGroundPointerMove = (state: AppState, groundPosition: Vec2) => {
	if (state.camera.pan) {
		const { startPointer } = state.camera.pan;
		const dx = (groundPosition[0] - startPointer[0]) * 0.8;
		const dy = (groundPosition[1] - startPointer[1]) * 0.8;

		state.camera.pan.startPointer[0] = groundPosition[0];
		state.camera.pan.startPointer[1] = groundPosition[1];

		state.camera.eye[0] -= dx;
		state.camera.eye[2] -= dy;

		state.camera.target[0] -= dx;
		state.camera.target[2] -= dy;
	}
};

export const onGroundPointerUp = (state: AppState, groundPosition: Vec2) => {
	state.camera.pan = null;
};

export const startRoutePlanning = (state: AppState) => {
	if (!state.selectedShipId) return;

	state.routePlanning = {
		shipId: state.selectedShipId,
		nextPortId: null,
		route: { id: generateID(), legs: [] },
	};
};
export const selectRoutePortAction = (state: AppState, action: PortAction) => {
	if (!state.routePlanning) return;

	const port = state.game.ports.find(
		(p) => p.id === state.routePlanning!.nextPortId,
	)!;
	state.routePlanning.nextPortId = null;
	state.routePlanning.route.legs.push({ action, port });
};
export const finishRoutePlanning = (state: AppState) => {
	state.routePlanning = null;
};
