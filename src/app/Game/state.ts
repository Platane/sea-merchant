import React from "react";
import { createStore, useStore } from "zustand";
import { Game, ID } from "../../game/type";
import { Subscribable } from "../../utils/subscribable";

export type UserState = {
	selectedId: ID | null;
};

export const createUserStore = () =>
	createStore<UserState>((set) => ({
		selectedId: null,
	}));

export type UserStore = ReturnType<typeof createUserStore>;

export const UserContext = React.createContext<UserStore>(null as any);

export const useUserState = <T>(selector: (s: UserState) => T) =>
	useStore(useUserStore(), selector);

export const useUserStore = () => React.useContext(UserContext);

//
//
//

export const GameContext = React.createContext<{
	game: Game;
	subscribe: Subscribable["subscribe"];
}>(null as any);

export const useGame = () => React.useContext(GameContext).game;

export const useGameSelector = <T>(
	selector: (game: Game) => T,
	equal: (a: T, b: T) => boolean = (a, b) => a === b,
) => {
	const { game, subscribe } = React.useContext(GameContext);
	const [value, setValue] = React.useState(selector(game));
	React.useEffect(
		() =>
			subscribe(() =>
				setValue((prevValue) => {
					const newValue = selector(game);
					return equal(newValue, prevValue) ? prevValue : newValue;
				}),
			),
		[game],
	);
	return value;
};
