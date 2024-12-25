/**
 * @author Ryan The Developer / www.ryanthedeveloper.com
 * 
 * VignetteShader
 * Creates a vignette effect by darkening the edges of the screen.
 * Commonly used to draw attention to the center of the image and create a more
 * dramatic or vintage look.
 * 
 * Parameters:
 * - offset: Controls the size of the vignette effect (default: 1.0)
 * - darkness: Controls the intensity of the darkening effect (default: 1.0)
 * 
 * Usage:
 * - Subtle vignette: Use low darkness value (0.2-0.4)
 * - Dramatic vignette: Use higher darkness value (0.6-1.0)
 * - Adjust offset to control how far the effect extends from edges
 */

THREE.VignetteShader = {
    // Uniform definitions for the shader
    uniforms: {
        "tDiffuse": { 
            type: "t",      // Texture sampler
            value: null     // Input texture to be processed
        },
        "offset": { 
            type: "f",      // Float value
            value: 1.0      // Controls vignette size
        },
        "darkness": { 
            type: "f",      // Float value
            value: 1.0      // Controls vignette intensity
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
    // Implements the vignette effect
    fragmentShader: [
        "uniform float offset;",     // Size of vignette effect
        "uniform float darkness;",   // Intensity of darkening
        "uniform sampler2D tDiffuse;", // Input texture

        "varying vec2 vUv;",        // Interpolated UV coordinates

        "void main() {",
            // Sample the input texture
            "vec4 texel = texture2D(tDiffuse, vUv);",
            
            // Calculate distance from center
            // Shift UV coordinates to be centered at (0,0)
            "vec2 uv = (vUv - vec2(0.5)) * vec2(offset);",
            
            // Create vignette effect
            // dot(uv, uv) gives squared distance from center
            // mix() interpolates between original color and darkness based on distance
            "gl_FragColor = vec4(mix(texel.rgb, vec3(1.0 - darkness), dot(uv, uv)), texel.a);",
        "}"
    ].join("\n")
};
