import { ID, Vec2 } from "../../../game/type";
import { AppState } from ".";

export const onShipPointerDown = (state: AppState, shipId: ID) => {
	state.selectedShipId = state.selectedPortId = null;
	state.selectedShipId = shipId;
};

export const onPortPointerDown = (state: AppState, portId: ID) => {
	state.selectedShipId = state.selectedPortId = null;
	state.selectedPortId = portId;
};

export const onGroundPointerDown = (state: AppState, groundPosition: Vec2) => {
	// state.selectedShipId = state.selectedPortId = null;
};

export const onGroundPointerMove = (
	state: AppState,
	groundPosition: Vec2,
) => {};

export const onGroundPointerUp = (state: AppState, groundPosition: Vec2) => {};
