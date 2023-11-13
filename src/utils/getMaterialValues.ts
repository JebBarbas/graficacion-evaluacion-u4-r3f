import { Texture } from "three"

type MaterialTextures = Record<string, Texture>

type MaterialParams = {
    textures: MaterialTextures,
    color: string
}

type MaterialValues = [string, MaterialTextures | null, number, number]

export default function getMaterialValues(index: number, { textures, color }: MaterialParams){
    const materialValuesArr:MaterialValues[] = [
        [color, null, 0, 1],
        [color, null, 0, 1],
        ['#ffffff', textures, 0, 1],
        ['#ffffff', null, 1, 0]
    ]

    return materialValuesArr[index] ?? materialValuesArr[1]
}