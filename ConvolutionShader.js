/**
 * @author Ryan The Developer / www.ryanthedeveloper.com
 * 
 * ConvolutionShader
 * Implements a Gaussian blur effect using separable convolution.
 * This shader is a critical component in the bloom effect pipeline,
 * providing efficient blur operations for post-processing effects.
 * 
 * Features:
 * - Separable Gaussian blur (horizontal/vertical passes)
 * - Configurable kernel size for blur quality control
 * - Dynamic sigma value for blur intensity
 * - Optimized for performance using 1D convolution
 * 
 * Usage:
 * - Bloom effect blurring
 * - General purpose image blur
 * - DOF (Depth of Field) effects
 * 
 * Technical Details:
 * - Uses 1D Gaussian kernel for efficient computation
 * - Separable implementation reduces operations from O(n²) to O(2n)
 * - Kernel size and sigma control blur quality and intensity
 */

THREE.ConvolutionShader = {
    // Shader preprocessor definitions
    defines: {
        "KERNEL_SIZE_FLOAT": "25.0",  // Kernel size as float
        "KERNEL_SIZE_INT": "25",      // Kernel size as int
    },

    // Uniform definitions for the shader
    uniforms: {
        "tDiffuse": { 
            type: "t",      // Texture sampler
            value: null     // Input texture
        },
        "uImageIncrement": { 
            type: "v2",     // 2D vector
            value: new THREE.Vector2(0.001953125, 0.0)  // Texel size for sampling
        },
        "cKernel": { 
            type: "fv1",    // Float array
            value: []       // Convolution kernel values
        }
    },

    // Vertex shader
    // Handles sampling coordinate calculation for convolution
    vertexShader: [
        "uniform vec2 uImageIncrement;",  // Sampling direction and step size

        "varying vec2 vUv;",              // UV coordinates passed to fragment shader

        "void main() {",
            // Calculate starting UV coordinate for kernel sampling
            // Centers the kernel on the current pixel
            "vUv = uv - ((KERNEL_SIZE_FLOAT - 1.0) / 2.0) * uImageIncrement;",
            
            // Transform vertex position to clip space
            "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
        "}"
    ].join("\n"),

    // Fragment shader
    // Performs the actual convolution operation
    fragmentShader: [
        "uniform float cKernel[KERNEL_SIZE_INT];",  // Gaussian kernel values
        "uniform sampler2D tDiffuse;",             // Input texture
        "uniform vec2 uImageIncrement;",           // Sampling direction and step size

        "varying vec2 vUv;",                       // Interpolated UV coordinates

        "void main() {",
            // Initialize sampling coordinate and accumulator
            "vec2 imageCoord = vUv;",
            "vec4 sum = vec4(0.0, 0.0, 0.0, 0.0);",

            // Perform convolution
            "for(int i = 0; i < KERNEL_SIZE_INT; i++) {",
                // Sample texture and multiply by kernel value
                "sum += texture2D(tDiffuse, imageCoord) * cKernel[i];",
                // Move to next sample position
                "imageCoord += uImageIncrement;",
            "}",

            // Output convolved color
            "gl_FragColor = sum;",
        "}"
    ].join("\n"),

    /**
     * Builds a Gaussian kernel for the convolution
     * @param {number} sigma - Standard deviation of the Gaussian distribution
     * @returns {Float32Array} - Array of kernel values
     */
    buildKernel: function(sigma) {
        const kMaxKernelSize = 25;
        const kernelSize = 2 * Math.ceil(sigma * 3.0) + 1;

        if (kernelSize > kMaxKernelSize) {
            console.warn('sigma too large for kernel size');
        }

        const halfWidth = (kernelSize - 1) * 0.5;
        const values = new Float32Array(kernelSize);
        let sum = 0.0;
        
        // Calculate Gaussian values
        for (let i = 0; i < kernelSize; ++i) {
            const x = i - halfWidth;
            values[i] = Math.exp(-x * x / (2.0 * sigma * sigma));
            sum += values[i];
        }

        // Normalize the kernel
        for (let i = 0; i < kernelSize; ++i) {
            values[i] /= sum;
        }

        return values;
    }
};
