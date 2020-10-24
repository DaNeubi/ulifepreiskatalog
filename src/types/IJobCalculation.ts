import IJob from "@/types/IJob";

export default interface IJobCalculation{
    job: IJob,
    steps: IJobCalculation[],
    profit: number,
    totalJobTime: number
}
