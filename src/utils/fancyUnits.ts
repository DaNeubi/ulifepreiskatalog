/***
 *
 * @param baseUnit
 * The unit that will be fancyfied™
 */
function fancyfyVariatyOne(baseUnit: number): string {
    //Check if fancyfy is possible at all, otherwise return the original value as string
    if(baseUnit < 1000){
        return baseUnit.toString();
    }
    //Convert
    //return Math.floor(baseUnit / 1000) + 'k';
    return parseFloat((baseUnit / 1000).toFixed(2)).toString() + "k";
}


/***
 * Makes Units fancy
 * Readability may vary from user to user
 * FancyingMethods:
 * 1: 100.000 -> 100K
 *
 * @param baseUnit
 * The unit that will be fancyfied™
 *
 * @param fancyingMethod
 * The Method that will be used. Default is 1
 * If its not possible your baseUnit will be returned as a string
 */
export default function fancyfyUnits(baseUnit: number, fancyingMethod = 1): string {
    switch (fancyingMethod) {
        case 1:
            return fancyfyVariatyOne(baseUnit);
        default:
            return baseUnit.toString();
    }
}
