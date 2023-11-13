import { shaderMaterial } from "@react-three/drei";
import { extend, MaterialNode } from '@react-three/fiber'
import { ShaderMaterial, Color } from 'three'

const GradientShaderMaterial = shaderMaterial(
    { uTime: 0, uColor: new Color(0xffffff), uColor2: new Color(0x000000), uDisplacement: 0.5, uScalar: 1 },
    // Vertex Shader
    /*glsl*/ `        
        uniform float uTime;  

        varying vec2 vUv;
        
        void main(){
            vUv = uv;

            vec3 transform = position;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(transform, 1.0);
        }
    `,
    // Fragment Shader
    /*glsl*/ `
        uniform float uTime;
        uniform vec3 uColor;
        uniform vec3 uColor2;

        varying vec2 vUv;

        void main(){
            vec2 uv = vUv;

            vec2 center = vec2(0);
            float s = distance(center, (uv - 0.5));
            vec3 mixColor = mix(uColor, uColor2, s);

            gl_FragColor = vec4(mixColor, 1.0);
        }
    `
)

extend({ GradientShaderMaterial })

declare module '@react-three/fiber' {
    interface ThreeElements {
        gradientShaderMaterial: MaterialNode<ShaderMaterial, typeof ShaderMaterial>
    }
}

export default GradientShaderMaterial