import { useControls } from "leva";
import { DoubleSide, MeshStandardMaterial, ShaderMaterial } from "three";
import usePolyHavenTexture from "./hooks/usePolyHavenTexture";
import { useEffect, useRef } from "react";
import getMaterialValues from "./utils/getMaterialValues";
import { useFrame } from "@react-three/fiber";
import GradientShaderMaterial from "./shaders/gradientShaderMaterial";

export default function CustomCylinderMaterial(){
    const materialRef = useRef<MeshStandardMaterial>(null)
    const uniformsRef = useRef<ShaderMaterial & {uTime:number, uColor: string, uColor2: string}>(null)

    const textures = usePolyHavenTexture('/textures', 'wood_floor', 1)

    const { color, color2, wireframe, type } = useControls('Material', {
        color: {
            value: '#ff0000',
            render: get => {
                const type = get('Material.type')
                return type === 0 || type === 1
            }
        },
        color2: {
            value: '#ff00ff',
            render: get => get('Material.type') === 1
        },
        wireframe: false,
        type: {
            value: 0,
            options: {
                'Color Sólido': 0,
                'Degradado': 1,
                'Textura': 2,
                'Material (Metal)': 3
            }
        }
    })

    const [colorOfType, texturesOfType, metalness, roughness] = getMaterialValues(type, { textures, color })

    useFrame(state => {
        if(uniformsRef.current) uniformsRef.current.uTime = state.clock.elapsedTime
    })

    useEffect(() => {
        if(materialRef.current) materialRef.current.needsUpdate = true
    }, [type])

    // El material de degradado es un tipo especial
    if(type === 1) return (
        <gradientShaderMaterial 
            key={GradientShaderMaterial.key} 
            ref={uniformsRef} 
            
            //@ts-expect-error - Si existe el uColor, es un uniform
            uColor={color} 
            uColor2={color2}

            wireframe={wireframe}
            side={DoubleSide}
        />
    )

    return ( 
        <meshStandardMaterial 
            ref={materialRef} 
            
            color={colorOfType}
            wireframe={wireframe}
            side={DoubleSide}

            metalness={metalness}
            roughness={roughness}

            {...texturesOfType}
            displacementScale={0}
        />
    )
}