import { createGameState } from "../../../game";
import { stepGame } from "../../../game/step";
import { Game, ID, Vec3 } from "../../../game/type";
import { createSubscribable } from "../../../utils/subscribable";
import * as actions from "./actions";

export type AppState = {
	selectedShipId: ID | null;
	selectedPortId: ID | null;
	game: Game;
	camera: {
		eye: Vec3;
		target: Vec3;
	};
};

export const createAppStateStore = () => {
	const { subscribe, dispatch } = createSubscribable();
	const state: AppState = {
		selectedShipId: null,
		selectedPortId: null,
		camera: {
			eye: [0, 14, 6],
			target: [0, 0, 0],
		},
		game: createGameState(),
	};

	const as = Object.fromEntries(
		Object.entries(actions).map(([key, fn]: any) => [
			key,
			(...args: any) => {
				fn(state, ...args);
				dispatch();
			},
		]),
	);

	return {
		step: () => {
			stepGame(state.game);
			dispatch();
		},
		...(as as ActionsSet),

		subscribe,
		state,
	};
};

type ActionsSet = {
	[T in keyof typeof actions]: (
		...args: ParametersExceptFirst<(typeof actions)[T]>
	) => void;
};
type ParametersExceptFirst<F> = F extends (arg0: any, ...rest: infer R) => any
	? R
	: never;

export type AppStateStore = ReturnType<typeof createAppStateStore>;
