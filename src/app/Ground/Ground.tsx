import React from "react";
import * as THREE from "three";
import { useGame } from "../Game/appState/hook";
import fragmentShaderCode from "./shader.frag?raw";
import vertexShaderCode from "./shader.vert?raw";

export const Ground = ({ ...props }: {} & React.ComponentProps<"group">) => {
	const map = useGame().map;

	// const [material] = React.useState(
	// 	() =>
	// 		new THREE.ShaderMaterial({
	// 			uniforms: {
	// 				heightTexture: { value: new THREE.Texture(map.texture) },
	// 			},
	// 			vertexShader: vertexShaderCode,
	// 			fragmentShader: fragmentShaderCode,
	// 			side: THREE.FrontSide,
	// 		}),
	// );

	const h = 4;

	return (
		<group {...props}>
			<mesh
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, -h * 1.1, 0]}
				scale={[map.size, map.size, h * 2]}
			>
				<meshStandardMaterial
					map={useTexture(map.texture)}
					displacementMap={useTexture(map.heightMap)}
					displacementScale={1}
					// map={texture}
					// toneMapped={false}
				/>
				<planeGeometry args={[1, 1, 200, 200]} />
			</mesh>
		</group>
	);
};

const useTexture = (tex: TexImageSource) => {
	const texture = React.useMemo(() => {
		const texture = new THREE.Texture(tex);
		texture.generateMipmaps = true;
		texture.needsUpdate = true;
		return texture;
	}, [tex]);
	React.useEffect(() => () => texture.dispose(), [texture]);
	return texture;
};
