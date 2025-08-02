import { Html } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { Port as PortType, Resource } from "../../../game/type";
import { useSelector, useStore } from "../appState/hook";
import { ResourceIcon } from "../Icon/ResourceIcon";
import * as style from "./style.module.css";

export const PortUi = ({ port }: { port: PortType }) => {
	return (
		<Html position={[0, 0.3, 0]}>
			<div className={style.container}>
				<h1 className={style.name}>{port.name}</h1>
				<div className={style.dealList}>
					{port.deals.map((deal, i) => (
						<div key={i} className={style.dealItem}>
							<ResourceAmount
								resource={deal.take.resource}
								amount={deal.take.amount}
							/>
							<span className={style.dealArrow}>{"➤"}</span>
							<ResourceAmount
								resource={deal.give.resource}
								amount={deal.give.amount}
							/>
						</div>
					))}
				</div>
			</div>
		</Html>
	);
};

const ResourceAmount = ({
	resource,
	amount,
}: {
	resource: Resource;
	amount: number;
}) => {
	const r = (
		<ResourceIcon
			resource={resource}
			className={style.dealResourceIcon}
			size={64}
		/>
	);

	if (amount === 1)
		return (
			<ResourceIcon
				resource={resource}
				className={style.dealResourceIcon}
				size={64}
			/>
		);
	if (amount === 2)
		return (
			<>
				<ResourceIcon
					resource={resource}
					className={style.dealResourceIcon}
					size={64}
					key={1}
				/>

				<ResourceIcon
					resource={resource}
					className={style.dealResourceIcon}
					size={64}
					key={2}
				/>
			</>
		);

	return (
		<>
			<ResourceIcon
				resource={resource}
				className={style.dealResourceIcon}
				size={64}
				key={3}
			/>
			<span className={style.dealQuantity}>×{amount}</span>
		</>
	);
};
