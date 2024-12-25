![Ryan The Developer Logo](https://ryanthedevloper-storage.nyc3.cdn.digitaloceanspaces.com/logo/logo-grey.svg?raw=true)

# Millie Burst

## 🎨 Description

A high-performance 3D particle explosion effect that creates an immersive burst animation using instanced geometry and custom GLSL shaders. The animation features dynamic bloom effects, smooth transitions, and interactive controls.

- **Functionality:** Creates an explosive particle burst effect with thousands of individual 3D particles that respond to user interaction
- **Utility:** Perfect for interactive web experiences, loading animations, or transition effects that require high-performance particle systems
- **Rationale:** Provides a unique combination of performance and visual quality by using GPU-accelerated instanced rendering and post-processing effects

## 🔍 Overview

- **Technology Stack:**
  - Three.js for 3D rendering
  - Custom GLSL shaders for particle animation
  - Post-processing pipeline with Bloom and Vignette effects
  - Instance-based rendering for optimal performance
  
- **Complexity Level:** Advanced
  - Requires understanding of WebGL and GLSL
  - Knowledge of 3D mathematics and quaternions
  - Familiarity with post-processing techniques

- **Animation Features:**
  - Interactive particle explosion effect
  - Dynamic bloom post-processing
  - Smooth particle movement using quaternion rotation
  - Responsive design that adapts to window size
  - Optimized performance using instanced rendering

- **Requirements:**
  - Modern browser with WebGL support
  - GPU with shader support
  - Minimum screen resolution: 1024x768

## 🛠 Installation Instructions
Run the provided index.html file in a server or use a 5 server in VS Code.  

**YOU MUST RUN THIS FILE IN A SERVER OR USE A 5 SERVER IN VS CODE TO PREVENT CORS ERRORS.**

1. **Setup:**
   ```html
   <script src="three.js"></script>
   <script src="Tween.js"></script>
   <script src="shaders/CopyShader.js"></script>
   <script src="shaders/ConvolutionShader.js"></script>
   <script src="shaders/ThresholdShader.js"></script>
   <script src="shaders/VignetteShader.js"></script>
   ```

2. **Post-Processing Setup:**
   ```html
   <script src="postprocessing/EffectComposer.js"></script>
   <script src="postprocessing/MaskPass.js"></script>
   <script src="postprocessing/RenderPass.js"></script>
   <script src="postprocessing/ShaderPass.js"></script>
   <script src="postprocessing/BloomPass.js"></script>
   ```

3. **Initialize:**
   - Create a new Three.js scene
   - Set up particle system with instanced geometry
   - Configure post-processing pipeline
   - Add event listeners for interaction

## 📦 Includes

- **Core Files:**
  - `10.html`: Main application file
  - `three.js`: Three.js library
  - `Tween.js`: Animation library

- **Shader Files:**
  - `CopyShader.js`: Basic texture copying
  - `ConvolutionShader.js`: Gaussian blur implementation
  - `ThresholdShader.js`: Brightness threshold for bloom
  - `VignetteShader.js`: Edge darkening effect

- **Post-Processing:**
  - `EffectComposer.js`: Manages render pipeline
  - `MaskPass.js`: Masking functionality
  - `RenderPass.js`: Basic scene rendering
  - `ShaderPass.js`: Shader effect application
  - `BloomPass.js`: Bloom effect implementation

## 📹 Media and Links

- [Live Demo](https://www.ryanthedeveloper.com/demos/millie-burst)
- [Portfolio](https://www.ryanthedeveloper.com)

## Social Media
- [YouTube](https://www.youtube.com/@ryanthedeveloper)
- [Instagram](https://www.instagram.com/ryan_the_developer/)
- [Twitter](https://twitter.com/ryan_the_dev)
- [Facebook](https://www.facebook.com/ryanthedeveloper)
- [Dribbble](https://dribbble.com/ryan_the_developer)

## 🤝 Support and Community

- **Technical Support:**
  - [GitHub Issues](https://github.com/ryanthedeveloper/millie-burst/issues)
  - Email: support@ryanthedeveloper.com

- **Custom Development:**
  - Available for custom implementations and modifications
  - Contact for professional services and consulting

## 🌟 Performance Notes

- Uses instanced geometry for rendering thousands of particles efficiently
- Implements custom GLSL shaders for optimal GPU utilization
- Post-processing effects are optimized for real-time performance
- Responsive design adapts to different screen sizes
- Automatic quality adjustment based on device capabilities

---

Created with ❤️ by [Ryan The Developer](https://www.ryanthedeveloper.com)
