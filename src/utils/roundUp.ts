/***
 * Rounds a number up
 * @param number The number to round
 * @param precision The number of decimal places to preserve
 */
export default function roundUp(number: number, precision: number): number {
    precision = Math.pow(10, precision);
    return Math.ceil(number * precision) / precision;
}
