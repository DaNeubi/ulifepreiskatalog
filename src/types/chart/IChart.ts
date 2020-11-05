import IChartSeries from "@/types/chart/IChartSeries";
import IChartXAxis from "@/types/chart/IChartXAxis";
import IChartYAxis from "@/types/chart/IChartYAxis";

export default interface IChart{
    chartSeries: IChartSeries[],
    xAxisData: IChartXAxis,
    yAxisData: IChartYAxis,
    title: string,
    legend: string[],
    animationDuration: number
}
