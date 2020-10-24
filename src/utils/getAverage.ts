/***
 * Calculates the average from a number[].
 * @param numbers the array filled with numbers
 */
export default function getAverage(numbers: number[]){
    let average = 0;
    numbers.forEach((number) => {
        average = average + number;
    });
    return average / numbers.length;
}
