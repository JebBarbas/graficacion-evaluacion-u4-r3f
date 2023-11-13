import { Cylinder, Sphere } from '@react-three/drei'
import FigureMaterial from './FigureMaterial'
import { folder, useControls } from 'leva'
import getGeometryValues from './utils/getGeometryValues'
import { useRef } from 'react'
import { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'

export default function CustomCylinder(){
    const geometryRef = useRef<Mesh>(null)

    const { itemMode } = useControls('Transformaciones', {
        itemMode: {
            value: false
        }
    })

    const transformProps = useControls('Transformaciones', {
        'Escalación': folder({
            scale: { value: 1, min: 0, max: 5, step: 0.1, render: get => !get('Transformaciones.itemMode') }
        }),
        'Rotación': folder({
            rotation: {
                value: [0, 0, 0],
                min: 0,
                max: 2 * Math.PI,
                step: 0.1,
                render: get => !get('Transformaciones.itemMode')
            }
        }),
        'Translación': folder({
            position: {
                value: [0, 0, 0],
                min: -5,
                max: 5,
                step: 0.1,
                render: get => !get('Transformaciones.itemMode')
            },
        })
    })
    
    const { sides, type } = useControls('Geometría', {
        sides: { value: 5, min: 3, max: 32, step: 1 },
        type: {
            value: 1,
            options: {
                'Figura 2D': 0,
                'Figura 3D': 1,
                'Cono 3D': 2,
                'Esfera 3D': 3
            }
        }
    })

    const [radiusTop, radiusBottom, height] = getGeometryValues(type)

    useFrame(state => {
        if(itemMode && geometryRef.current){
            geometryRef.current.rotation.y = state.clock.elapsedTime
            geometryRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5
        }
    })

    if(type === 3) return (
        <Sphere
            ref={geometryRef}
            args={[radiusTop, sides]}
            {...transformProps}
        >
            <FigureMaterial/>
        </Sphere>
    )

    return (
        <Cylinder
            ref={geometryRef}
            args={[radiusTop, radiusBottom, height, sides]}
            {...transformProps}
        >
            <FigureMaterial/>
        </Cylinder>
    )
}