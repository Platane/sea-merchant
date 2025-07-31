import React from "react";
import { Game } from "./Game/Game";
import styles from "./style.module.css";

// please no dead code elimination
console.log(styles);

export const App = () => {
	return <Game />;
};
