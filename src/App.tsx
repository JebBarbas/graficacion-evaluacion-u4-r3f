import { OrbitControls, useEnvironment, Environment, CubeCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Texture } from "three"
import Figure from "./Figure"
import { Suspense } from "react"

function ThreeContent(){
    // https://polyhaven.com/a/kloofendal_48d_partly_cloudy_puresky
    //const envMap = useEnvironment({ files: '/kloofendal_48d_partly_cloudy_puresky_8k.hdr'})

    // https://www.artstation.com/artwork/39vWov
    const envMap = useEnvironment({ path: './Standard-Cube-Map'})

    return (
        <>
            <ambientLight intensity={0.5}/>
            <directionalLight position={[5, 3, 1.5]} intensity={1}/>
            <OrbitControls/>

            <Environment map={envMap} background/>
            <CubeCamera>
                {(texture:Texture) => <>
                    <Environment map={texture}/>
                    <Suspense fallback={null}>
                        <Figure/>
                    </Suspense>
                </>}
            </CubeCamera>
        </>
    )
}

function ThreeScene(){
    return (
        <Canvas>
            <ThreeContent/>
        </Canvas>
    )
}

function App() {
    return (
        <div className="h-screen">
            <ThreeScene/>
        </div>
    )
}

export default App
