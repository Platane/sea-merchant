import { Resource } from "../../game/type";
import { BananaModel } from "./Model/BananaModel";
import { CoinModel } from "./Model/CoinModel";
import { GrapesModel } from "./Model/GrapesModel";
import { PumpkinModel } from "./Model/PumpkinModel";

export const resourceColors = {
	["coin" as Resource]: "#f9e72d",
	["pumpkin" as Resource]: "#e29200",
	["grapes" as Resource]: "purple",
	["banana" as Resource]: "#f9e72d",
};
export const resourceNames = {
	["coin" as Resource]: "Coin",
	["pumpkin" as Resource]: "Pumpkin",
	["grapes" as Resource]: "Grapes",
	["banana" as Resource]: "Banana",
};
export const resourceModels = {
	["coin" as Resource]: CoinModel,
	["pumpkin" as Resource]: PumpkinModel,
	["grapes" as Resource]: GrapesModel,
	["banana" as Resource]: BananaModel,
};
