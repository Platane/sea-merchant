import { Resource } from "../../game/type";
import { BananaModel } from "./Model/BananaModel";
import { CoinModel } from "./Model/CoinModel";
import { GrapesModel } from "./Model/GrapesModel";
import { PumpkinModel } from "./Model/PumpkinModel";

export const resourceColors = {
	[1 as Resource]: "#f9e72d",
	[2 as Resource]: "#e29200",
	[3 as Resource]: "purple",
	[4 as Resource]: "#f9e72d",
};
export const resourceNames = {
	[1 as Resource]: "Coin",
	[2 as Resource]: "Pumpkin",
	[3 as Resource]: "Grapes",
	[4 as Resource]: "Banana",
};
export const resourceModels = {
	[1 as Resource]: CoinModel,
	[2 as Resource]: PumpkinModel,
	[3 as Resource]: GrapesModel,
	[4 as Resource]: BananaModel,
};
