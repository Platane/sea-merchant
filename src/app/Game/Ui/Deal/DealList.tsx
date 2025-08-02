import React from "react";
import { Deal } from "../../../../game/type";
import { cx } from "../../../../utils/css";
import { DealLine } from "./DealLine";
import * as style from "./style.module.css";

export const DealList = ({ deals }: { deals: Deal[] }) => {
	const ds = deals.slice();
	const list = [];

	while (ds.length) {
		const deal = ds.shift()!;
		const i = ds.findIndex(
			(d) =>
				d.give.resource === deal.take.resource &&
				d.give.amount === deal.take.amount &&
				d.take.resource === deal.give.resource &&
				d.take.amount === deal.give.amount,
		);
		if (i > -1) ds.splice(i, 1);

		list.push(<DealLine key={list.length} deal={deal} reciprocity={i > -1} />);
	}

	return list;
};

export const DealTable = ({
	deals,
	...props
}: { deals: Deal[] } & React.ComponentProps<"table">) => (
	<table className={cx(style.dealTable, props.className)}>
		<tbody>
			<DealList deals={deals} />
		</tbody>
	</table>
);
