import { Html } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { Port as PortType, Resource } from "../../../game/type";
import { useSelector, useStore } from "../appState/hook";
import { ResourceIcon } from "../Icon/ResourceIcon";
import { DealTable } from "../Ui/Deal/DealList";
import * as style from "./style.module.css";

export const PortUi = ({ port }: { port: PortType }) => {
	return (
		<Html position={[0, 0.3, 0]}>
			<div className={style.container}>
				<h1 className={style.name}>{port.name}</h1>
				<DealTable deals={port.deals} className={style.dealList} />
			</div>
		</Html>
	);
};
