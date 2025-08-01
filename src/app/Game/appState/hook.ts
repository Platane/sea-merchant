import React from "react";
import { AppState, AppStateStore } from ".";

export const context = React.createContext<AppStateStore>(null as any);

export const Provider = context.Provider;

export const useGame = () => React.useContext(context).state.game;

export const useStore = () => React.useContext(context);

export const useSelector = <T>(
	selector: (s: AppState) => T,
	equal: (a: T, b: T) => boolean = (a, b) => a === b,
) => {
	const { state, subscribe } = useStore();
	const [value, setValue] = React.useState(() => selector(state));
	React.useEffect(
		() =>
			subscribe(() =>
				setValue((prevValue) => {
					const newValue = selector(state);
					return equal(newValue, prevValue) ? prevValue : newValue;
				}),
			),
		[state],
	);
	return value;
};
