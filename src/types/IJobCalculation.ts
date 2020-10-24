import IJob from "@/types/IJob";
import IJobStepCalculation from "@/types/IJobStepCalculation";

export default interface IJobCalculation{
    job: IJob,
    steps: IJobStepCalculation[],
    profit: number,
    totalJobTime: number
}
