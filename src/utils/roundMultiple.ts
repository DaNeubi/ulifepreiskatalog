/***
 * Rounds to the given next rational number
 * @param number the base number
 * @param factor the factor to check
 */
export default function roundMultiple(number: number, factor: number): number{
    /*let outAmount = 0;
    while (number > 0){
        if(number - factor >= 0){
            outAmount++;
            number = number - factor;
        }
        else{
            number = number - factor;
        }
    }
    if(outAmount === 0){
        return number;
    }
    else{
        return outAmount * factor;
    }*/
    return number - (number % factor);
}
