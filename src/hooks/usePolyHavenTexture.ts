import { useTexture } from "@react-three/drei";

export default function usePolyHavenTexture(path: string, textureName: string, k: number){
    return useTexture({
        map: `${path}/${textureName}_diff_${k}k.jpg`,
        displacementMap: `${path}/${textureName}_disp_${k}k.jpg`,
        aoMap: `${path}/${textureName}_arm_${k}k.jpg`,
        roughnessMap: `${path}/${textureName}_arm_${k}k.jpg`,
        metalnessMap: `${path}/${textureName}_arm_${k}k.jpg`,
        normalMap: `${path}/${textureName}_nor_gl_${k}k.jpg`
    })
}