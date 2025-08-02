import React from "react";
import { Deal, Resource } from "../../../../game/type";
import { cx } from "../../../../utils/css";
import { ResourceIcon } from "../../Icon/ResourceIcon";
import * as style from "./style.module.css";

export const DealLine = ({
	deal,
	reciprocity,
	...props
}: {
	deal: Deal;
	reciprocity?: boolean;
} & React.ComponentProps<"tr">) => (
	<tr {...props} className={cx(style.dealLine, props.className)}>
		<td>
			<ResourceAmount resource={deal.take.resource} amount={deal.take.amount} />
		</td>
		<td>{reciprocity ? "=" : "→"}</td>
		<td>
			<ResourceAmount resource={deal.give.resource} amount={deal.give.amount} />
		</td>
	</tr>
);

const ResourceAmount = ({
	resource,
	amount,
}: {
	resource: Resource;
	amount: number;
}) => {
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
				/>

				<ResourceIcon
					resource={resource}
					className={style.dealResourceIcon}
					size={64}
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
