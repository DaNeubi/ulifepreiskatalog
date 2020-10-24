export default interface IJob{
    id: number,
    name: string,
    stepsDescription: string,
    toolRequired: string,
    stepsAmount: number,
    pricePerResource: number,
    steps: IJobStep[],
    rundistance: number,
    umpackenTime: number,
    loopDistanceKm: number,
    jobColor: string[]
}

export interface IJobStep{
    sourceName: string,
    amountOfIngredientsPerCycle: number[],
    sizeOfIngredient: number,
    cycleTime: number,
    ingredientRatio: number[],
    umpackenAvail: boolean,
    distanceKm: number,
    rundistance: number,
    umpackenTime: number
}

