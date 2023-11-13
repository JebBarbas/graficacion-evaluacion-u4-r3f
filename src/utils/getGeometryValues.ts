export default function getGeometryValues(index: number){
    /*
     * Por trigonometría, en un cuadrado de lado 1 (o cubo de lado 1), la diagonal mide
     * la raíz de 2, por lo que el radio de un cubo de lado 1 debería ser 
     * la mitad de raíz de 2 
     */
    const radius = Math.SQRT2 / 2

    const geometryValuesArr = [
        [radius, radius, Number.EPSILON],
        [radius, radius, 1],
        [0, radius, 1],
        [radius, radius, 1]
    ]

    return geometryValuesArr[index] ?? geometryValuesArr[1]
}