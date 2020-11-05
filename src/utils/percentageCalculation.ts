/***
 * Gets the propotion of something
 * Like: 19% of 1000
 * 'Den Anteil an etwas ermitteln'
 * Gegeben: Prozentsatz + Grundwert
 * Gesucht: Prozent Wert
 */
export function getPropotion(percent: number, base: number): number{
    return (percent * base) / 100;
}

/***
 * Gets the percentual proportion of something
 * 'Den prozentualen Anteil an einem Grundwert ermitteln'
 * Gegeben: Prozentwert + Grundwert
 * Gesucht: Prozentsatz
 */
export function getPerceptualProportion(percent: number, base: number): number{
    return (percent * 100) / base;
}

/***
 * Gets the Whole
 * 'Das Ganze ermitteln'
 * Gegeben: Prozentwert + Prozentsatz
 * Gesucht: Grundwert
 */
export function getWhole(percentWert: number, percentSatz: number): number{
    return (percentWert * 100) / percentSatz;
}

/***
 * Gets the percentual change
 * 'Die prozentuale Veränderung ermitteln'
 * Gegeben: Angangswert + Endwert
 * Gesucht: Prozentuale Veränderung
 */
export function getPercentageChange(start: number, end: number): number{
    return ((end - start) * 100) / start;
}

/***
 * Gets a value using the trigonomy
 * @param baseValue The base value1
 * @param otherValue The base value2
 * @param baseToGetTo the one thing with one unknown side
 */
export function getDreisatz(baseValue: number, otherValue: number, baseToGetTo: number): number{
    return (otherValue / baseValue) * baseToGetTo;
}
