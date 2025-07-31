import { Resource } from "../../game/type";
import { BananaModel } from "./Model/BananaModel";
import { GrapesModel } from "./Model/GrapesModel";
import { PumpkinModel } from "./Model/PumpkinModel";

export const resourceColors = {
	[1 as Resource]: "#f9e72d",
	[2 as Resource]: "#e29200",
	[3 as Resource]: "purple",
};
export const resourceNames = {
	[1 as Resource]: "banana",
	[2 as Resource]: "pumpkin",
	[3 as Resource]: "grapes",
};
export const resourceModels = {
	[1 as Resource]: BananaModel,
	[2 as Resource]: PumpkinModel,
	[3 as Resource]: GrapesModel,
};
