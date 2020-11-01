/***
 * Rounds to the given next rational number
 * @param number the base number
 * @param factor the factor to check
 */
export default function roundMultiple(number: number, factor: number): number{
    return number - (number % factor);
}
