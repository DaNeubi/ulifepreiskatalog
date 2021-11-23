import IJobCalculation from "@/types/IJobCalculation";
import IChartSeries from "@/types/chart/IChartSeries";
import IChart from "@/types/chart/IChart";
import {getDreisatz} from "@/utils/percentageCalculation";
import IChartXAxis from "@/types/chart/IChartXAxis";
import IChartYAxis from "@/types/chart/IChartYAxis";

export default function createChartData(job: IJobCalculation[], timeSpanUnit: string, amount = job.length,timeSpan = 10): IChart {
    //first create the chartSeries Objects
    const chartSeries: IChartSeries[] = [];
    const legendNames: string[] = []
    //iterate through every job
    for(let i = 0; i < amount; i++){
        //create the data for the given time span
        const chartData: number[] = [];
        for(let j = 1; j <= timeSpan; j++){
            //get the amount
            chartData.push(parseFloat((getDreisatz(job[i].totalJobTime, job[i].profit, 60 * j) * 60).toFixed(2)));
        }
        chartSeries.push({
            name: job[i].job.name,
            type: 'line',
            showSymbol: true,
            data: chartData,
            smooth: true,
            color: job[i].job.jobColor[0],
            stack: job[i].job.name
        });
        legendNames.push(job[i].job.name);
    }
    //create the data for the xAxis
    const xAxisString: string[] = [];
    const xAxis: IChartXAxis = {
        type: 'category',
        data: xAxisString,
        boundaryGap: false,
    };
    for(let i = 0; i < timeSpan; i++){
        xAxisString.push((i+1).toString() + timeSpanUnit);
    }
    //create the data for the yAxis
    const yAxis: IChartYAxis = {
        type: 'value',
        axisLabel: {
            formatter: (val: string): string => {
                return (val+'$');
            }
        }
    };
    //get the lowest and highest number + steps in between to generate
    return {
        chartSeries: chartSeries,
        xAxisData: xAxis,
        yAxisData: yAxis,
        title: 'Rohstoffübersicht',
        legend: legendNames,
        animationDuration: 1000
    }
}
