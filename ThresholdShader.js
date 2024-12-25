/**
 * @author Ryan The Developer / www.ryanthedeveloper.com
 * 
 * ThresholdShader
 * A specialized shader that performs brightness thresholding on input textures.
 * Essential component in the bloom effect pipeline, isolating bright areas for blur.
 * 
 * Parameters:
 * - threshold: Brightness cutoff value (0.0 to 1.0)
 * - tDiffuse: Main input texture
 * - tMap: Secondary map texture for additional threshold control
 * 
 * Usage:
 * - Bloom preprocessing: Isolate bright areas before blur
 * - HDR effects: Control which areas receive bloom
 * - Light isolation: Extract bright light sources
 * 
 * Technical Details:
 * - Uses luminance calculation (RGB to grayscale) for threshold comparison
 * - Supports dual texture input for complex threshold effects
 * - Output is binary: full brightness or black
 */

THREE.ThresholdShader = {
    // Uniform definitions for the shader
    uniforms: {
        "tDiffuse": { 
            type: "t",      // Texture sampler
            value: null     // Main input texture
        },
        "tMap": { 
            type: "t",      // Texture sampler
            value: null     // Secondary threshold map
        },
        "threshold": { 
            type: "f",      // Float value
            value: null     // Brightness threshold
        }
    },

    // Vertex shader
    // Standard pass-through vertex shader for post-processing
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
    // Implements the threshold effect
    fragmentShader: [
        "uniform float threshold;",  // Brightness cutoff value
        "uniform sampler2D tDiffuse;", // Main input texture
        "uniform sampler2D tMap;",    // Secondary threshold map

        "varying vec2 vUv;",        // Interpolated UV coordinates

        "void main() {",
            // Sample both input textures
            "vec4 texel = texture2D(tDiffuse, vUv);",
            "vec4 map = texture2D(tMap, vUv);",
            
            // Calculate luminance using standard coefficients
            // These coefficients match human perception of brightness
            // R: 0.299, G: 0.587, B: 0.114
            "float v = dot(texel.xyz, vec3(0.299, 0.587, 0.114));",
            "float m = dot(map.xyz, vec3(0.299, 0.587, 0.114));",
            
            // Initialize output color
            "vec4 outputColor = vec4(texel.rgb, 1.0);",

            // Apply threshold to both textures
            // If below threshold, set to black
            "if (v < threshold) outputColor = vec4(vec3(0.0), 1.0);",
            "if (m < threshold) outputColor = vec4(vec3(0.0), 1.0);",

            // Output the final color
            "gl_FragColor = outputColor;",
        "}"
    ].join("\n")
};
