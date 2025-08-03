import fragmentShaderCode from "./shader.frag?raw";
import vertexShaderCode from "./shader.vert?raw";

export const createHeightMap = (
	canvas: HTMLCanvasElement | OffscreenCanvas,
	seed: number,
) => {
	const gl = canvas.getContext("webgl2")!;

	const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
	gl.shaderSource(vertexShader, vertexShaderCode);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
		throw "vertex shader error: " + gl.getShaderInfoLog(vertexShader) || "";

	const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
	gl.shaderSource(fragmentShader, fragmentShaderCode);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
		throw "fragment shader error: " + gl.getShaderInfoLog(fragmentShader) || "";

	const program = gl.createProgram()!;
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	gl.linkProgram(program);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS))
		throw "Unable to initialize the shader program.";

	gl.useProgram(program);

	const quadBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);

	// interleaved position and texCoord
	const quadData = new Float32Array([
		-1, 1, 0, 1,

		-1, -1, 0, 0,

		1, 1, 1, 1,

		1, -1, 1, 0,
	]);
	gl.bufferData(gl.ARRAY_BUFFER, quadData, gl.STATIC_DRAW);

	const a_position = gl.getAttribLocation(program, "a_position");
	gl.enableVertexAttribArray(a_position);
	gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 16, 0); // read interleaved data, each vertex have 16 bytes ( (2+2) * 4 bytes for float32 ), position offset is 0

	const a_texCoord = gl.getAttribLocation(program, "a_texCoord");
	gl.enableVertexAttribArray(a_texCoord);
	gl.vertexAttribPointer(a_texCoord, 2, gl.FLOAT, false, 16, 8);

	const u_seed = gl.getUniformLocation(program, "u_seed");
	gl.uniform1f(u_seed, seed);

	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

	// clean up
	gl.deleteBuffer(quadBuffer);
	gl.deleteProgram(program);
	gl.deleteShader(fragmentShader);
	gl.deleteShader(vertexShader);
};
