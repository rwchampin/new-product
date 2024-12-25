/**
 * @author Ryan The Developer / www.ryanthedeveloper.com
 * 
 * CopyShader
 * A fundamental shader that performs basic texture copying with optional opacity control.
 * Used as a building block in the post-processing pipeline.
 * 
 * Usage:
 * - Basic texture copying: Set opacity to 1.0
 * - Fade effects: Adjust opacity between 0.0 and 1.0
 * - Blend operations: Use as part of a multi-pass rendering setup
 */

THREE.CopyShader = {
    // Uniform definitions for the shader
    uniforms: {
        "tDiffuse": { 
            type: "t",      // Texture sampler
            value: null     // Input texture to be copied
        },
        "opacity": { 
            type: "f",      // Float value
            value: 1.0      // Global opacity multiplier
        }
    },

    // Vertex shader
    // Handles vertex positions and UV coordinate passing
    vertexShader: [
        "varying vec2 vUv;",        // UV coordinates passed to fragment shader

        "void main() {",
            // Pass UV coordinates unchanged
            "vUv = uv;",
            // Transform vertex position to clip space
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
        "}"
    ].join("\n"),

    // Fragment shader
    // Performs the actual texture copying with opacity control
    fragmentShader: [
        "uniform float opacity;",    // Global opacity value
        "uniform sampler2D tDiffuse;", // Input texture

        "varying vec2 vUv;",        // Interpolated UV coordinates

        "void main() {",
            // Sample the input texture
            "vec4 texel = texture2D(tDiffuse, vUv);",
            // Apply opacity and output final color
            "gl_FragColor = opacity * texel;",
        "}"
    ].join("\n")
};
