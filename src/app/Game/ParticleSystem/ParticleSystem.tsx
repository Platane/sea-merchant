import type IRAPIER from "@dimforge/rapier3d-compat";
import type { World } from "@dimforge/rapier3d-compat";
import { useFrame, useThree } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import { Game, ID, Resource } from "../../../game/type";
import { useGame } from "../appState/hook";

let rapier: typeof IRAPIER;
const promise = import("@dimforge/rapier3d-compat").then(async (r) => {
	await r.init();
	rapier = r;
});

export const ParticleSystem = () => {
	if (!rapier) throw promise;

	const { scene } = useThree();
	const game = useGame();
	const [system] = React.useState(() => createParticlesSystem(rapier, game));
	React.useEffect(() => {
		scene.add(system.container);
		return system.dispose;
	}, [system]);
	useFrame(system.step);

	return null;
};

const createParticlesSystem = (RAPIER: typeof IRAPIER, game: Game) => {
	const gravity = { x: 0.0, y: -9.81, z: 0.0 };
	const world = new RAPIER.World(gravity);

	// Create the ground
	const groundColliderDesc = RAPIER.ColliderDesc.cuboid(100.0, 2, 100.0);
	groundColliderDesc.setTranslation(0, -2.1, 0);
	world.createCollider(groundColliderDesc);

	const particlesRadius = 0.1;

	// add bodies
	const bodies = Array.from({ length: 500 }).map((_, i) => {
		const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic();

		const rigidBody = world.createRigidBody(rigidBodyDesc);
		rigidBody.setBodyType(RAPIER.RigidBodyType.Dynamic, true);
		rigidBody.setTranslation(
			{
				x: Math.random() * 5 - 2.5,
				y: 3 + Math.random() * 4,
				z: Math.random() * 5 - 2.5,
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

		return { body, dispose };
	};

	const buckets = new Map<ID, ReturnType<typeof createBucket>>();

	//
	//
	const container = new THREE.Object3D();

	const createParticleMesh = (r: Resource) => {
		const mesh = new THREE.Mesh(geometry, material);
		return mesh;
	};

	const geometry = new THREE.SphereGeometry(particlesRadius);
	const material = new THREE.MeshStandardMaterial({ color: "orange" });

	const step = () => {
		//
		// create and move ship buckets
		//
		for (const ship of game.ships) {
			let bucket = buckets.get(ship.id);
			if (!bucket) {
				bucket = createBucket(0.5, 0.5);
				buckets.set(ship.id, bucket);
			}

			bucket.body.setTranslation(
				{
					x: ship.position[0],
					y: 0.06,
					z: ship.position[1],
				},
				false,
			);

			const a = -Math.atan2(ship.direction[1], ship.direction[0]) + Math.PI / 2;
			const q = new THREE.Quaternion();
			q.setFromEuler(new THREE.Euler(0, a, 0));

			bucket.body.setRotation(q, false);
		}
		if (buckets.size !== game.ships.length) {
			console.log("should clean up bucket");
		}

		world.step();

		while (container.children.length > bodies.length) {
			container.remove(container.children[0]);
		}

		while (container.children.length < bodies.length) {
			container.add(createParticleMesh(0));
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
