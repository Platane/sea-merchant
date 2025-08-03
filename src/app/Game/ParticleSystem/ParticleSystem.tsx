import type IRAPIER from "@dimforge/rapier3d-compat";
import type { RigidBody, World } from "@dimforge/rapier3d-compat";
import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import pumpkin_glb_uri from "../../../assets/models/pumpkin.glb?url";
import { Game, ID, Resource } from "../../../game/type";
import { useGame } from "../appState/hook";

let rapier: typeof IRAPIER;
const rapierPromise = import("@dimforge/rapier3d-compat").then(async (r) => {
	await r.init();
	rapier = r;
});

const loadResourceModels = async () => {
	const loader = new GLTFLoader();
	const { scene: pumpkin } = await loader.loadAsync(pumpkin_glb_uri);
	pumpkin.scale.set(0.1, 0.15, 0.1);
	pumpkin.position.set(0, 0.01, 0);
	return {
		pumpkin,
	} as Record<Resource, THREE.Object3D>;
};

let resourceModels: Awaited<ReturnType<typeof loadResourceModels>>;
const resourceModelsPromise = loadResourceModels().then((r) => {
	resourceModels = r;
});

export const ParticleSystem = () => {
	if (!rapier) throw rapierPromise;
	if (!resourceModels) throw resourceModelsPromise;

	const { scene } = useThree();
	const game = useGame();
	const [system] = React.useState(() =>
		createParticlesSystem(rapier, resourceModels, game),
	);
	React.useEffect(() => {
		scene.add(system.container);
		return system.dispose;
	}, [system]);
	useFrame(system.step);

	return null;
};

const createParticlesSystem = (
	RAPIER: typeof IRAPIER,
	resourceModels: Record<Resource, THREE.Object3D>,
	game: Game,
) => {
	const gravity = { x: 0.0, y: -9.81, z: 0.0 };
	const world = new RAPIER.World(gravity);

	// Create the ground
	const groundColliderDesc = RAPIER.ColliderDesc.cuboid(100.0, 2, 100.0);
	groundColliderDesc.setTranslation(0, -2.1, 0);
	world.createCollider(groundColliderDesc);

	const particlesRadius = 0.1;

	// add bodies
	const bodies = Array.from({ length: 100 }).map((_, i) => {
		const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();

		const rigidBody = world.createRigidBody(rigidBodyDesc);
		rigidBody.setBodyType(RAPIER.RigidBodyType.Dynamic, true);
		rigidBody.setTranslation(
			{
				x: Math.random() * 2,
				y: 2 + Math.random() * 2,
				z: Math.random() * 2 - 1,
			},
			false,
		);

		const colliderDesc = RAPIER.ColliderDesc.ball(particlesRadius);
		const collider = world.createCollider(colliderDesc, rigidBody);

		return rigidBody;
	});

	const createBucket = (size: number, h: number) => {
		const bodyDesc = RAPIER.RigidBodyDesc.fixed();

		const body = world.createRigidBody(bodyDesc);

		body.setTranslation({ x: 0, y: 1, z: 0 }, false);

		const m = size * 0.1;

		const colliderDescriptions = [
			RAPIER.ColliderDesc.cuboid(size, h, m).setTranslation(0, 0.5, size),
			RAPIER.ColliderDesc.cuboid(size, h, m).setTranslation(0, 0.5, -size),
			RAPIER.ColliderDesc.cuboid(m, h, size).setTranslation(size, 0.5, 0),
			RAPIER.ColliderDesc.cuboid(m, h, size).setTranslation(-size, 0.5, 0),
			RAPIER.ColliderDesc.cuboid(size, m, size).setTranslation(0, 0, 0),
		];

		const colliders = colliderDescriptions.map((d) =>
			world.createCollider(d, body),
		);

		const dispose = () => {
			world.removeRigidBody(body);
			for (const collider of colliders) world.removeCollider(collider, false);
		};

		const particles: { body: RigidBody; dispose: () => void }[] = [];

		return { body, dispose, particles };
	};

	const buckets = new Map<ID, ReturnType<typeof createBucket>>();

	//
	//
	const container = new THREE.Object3D();

	const createParticleMesh = (r: Resource) => {
		const o = new THREE.Object3D();
		o.add(resourceModels[r].clone());
		// const mesh = new THREE.Mesh(geometry, material);
		// o.add(mesh);
		return o;
	};

	const geometry = new THREE.SphereGeometry(particlesRadius, 8, 8);
	const material = new THREE.MeshStandardMaterial({
		color: "orange",
		wireframe: true,
	});

	const v = new THREE.Vector3();
	const q = new THREE.Quaternion();
	const eu = new THREE.Euler();
	const step = () => {
		//
		// create and move ship buckets
		//
		for (const ship of game.ships) {
			// get / create bucket for the ship
			let bucket = buckets.get(ship.id);
			if (!bucket) {
				bucket = createBucket(0.5, 0.5);
				buckets.set(ship.id, bucket);
			}

			// move bucket with ship
			v.set(ship.position[0], 0.06, ship.position[1]);
			bucket.body.setTranslation(v, false);

			const a = -Math.atan2(ship.direction[1], ship.direction[0]) + Math.PI / 2;
			eu.set(0, a, 0);
			q.setFromEuler(eu);
			bucket.body.setRotation(q, false);

			// alter particles
			// let ship.inventoryMovementHistory
		}

		// TODO remove bucket eventually

		world.step();

		while (container.children.length > bodies.length) {
			container.remove(container.children[0]);
		}

		while (container.children.length < bodies.length) {
			container.add(createParticleMesh("pumpkin"));
		}

		for (let i = container.children.length; i--; ) {
			container.children[i].position.copy(bodies[i].translation());
			container.children[i].quaternion.copy(bodies[i].rotation());
		}
	};
	const dispose = () => {};

	return {
		step,
		dispose,
		container,
	};
};
