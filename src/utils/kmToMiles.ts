/***
 * Will return a given amount - prefferably kilometers - and make miles out of if... WTF my English..
 * @param distanceKm The distance in KM
 */
export default function kmToMiles(distanceKm: number): number {
    const factor = 1.609344;
    return distanceKm / factor;
}
