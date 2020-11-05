export default interface IChartSeries {
    name: string,
    type: string,
    showSymbol: boolean,
    data: number[],
    smooth: boolean,
    color: string,
    stack: string
}
