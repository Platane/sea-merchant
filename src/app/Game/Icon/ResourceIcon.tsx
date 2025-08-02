import { createRoot, events, extend, useFrame } from "@react-three/fiber";
import React, { Suspense } from "react";
import * as THREE from "three";
import { Resource } from "../../../game/type";
import { cx } from "../../../utils/css";
import { LightRig } from "../Scene";
import { resourceColors, resourceModels, resourceNames } from "../theme";
import * as style from "./style.module.css";

extend(THREE as any);

export const generateResourceIconUri = async (
	resource: Resource,
	size: number,
) => {
	const canvas = new OffscreenCanvas(size, size);
	const root = createRoot(canvas);

	await root.configure({
		events,
		camera: { position: [0, 0, 2.45], fov: 10 },
		size: { width: size, height: size, top: 0, left: 0 },
	});

	const M = resourceModels[resource];

	let onRendered: () => void;
	const renderedPromise = new Promise<void>((resolve) => {
		onRendered = resolve;
	});
	const S = () => {
		useFrame(onRendered);
		return null;
	};

	root.render(
		<>
			<LightRig />
			<Suspense>
				<M />
				<S />
			</Suspense>
		</>,
	);

	await renderedPromise;

	const blob = await canvas.convertToBlob();

	root.unmount();

	const url = URL.createObjectURL(blob);

	return url;
};

const cache: { resource: Resource; size: number; uri: string }[] = [];
export const getResourceIconUri = (resource: Resource, size: number) =>
	cache.find((c) => c.resource == resource && c.size == size)?.uri;

const sizes = [64, 256] as const;
type Size = (typeof sizes)[number];

const list = Object.keys(resourceModels).flatMap((resource) =>
	sizes.map((size) => ({ size, resource: resource as Resource })),
);

export const generateIcons = () =>
	Promise.all(
		list.map(async ({ resource, size }) => ({
			resource,
			size,
			uri: await generateResourceIconUri(resource, size),
		})),
	).then((res) => {
		cache.push(...res);
	});

export const ResourceIcon = ({
	resource,
	size = 64,
	...props
}: { resource: Resource; size?: Size } & Omit<
	React.ComponentProps<"img">,
	"resource"
>) => (
	<img
		src={getResourceIconUri(resource, size)}
		{...props}
		alt={`Resource ${resourceNames[resource]}`}
	/>
);

export const ResourceIconFallback = ({
	resource,
	size,
	...props
}: { resource: Resource; size?: number } & Omit<
	React.ComponentProps<"img">,
	"resource"
>) => (
	<div
		{...props}
		style={{ ...props.style, "--color": resourceColors[resource] } as any}
		className={cx(style.icon, props.className)}
	/>
);
