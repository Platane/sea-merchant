// @ts-ignore
import { expect, it } from "bun:test";
import { createGameState } from "..";
import { listProfitableRoutes } from "../ai";
import { initializeGame } from "../initialize";

it("should list profitable routes", () => {
	const game = createGameState();
	initializeGame(game);

	const list = listProfitableRoutes(game, 100);
	expect(list).not.toBeEmpty();

	console.log(list);
});
