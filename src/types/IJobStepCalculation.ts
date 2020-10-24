import {IJobStep} from "@/types/IJob";

export default interface IJobStepCalculation{
    jobStep: IJobStep,
    amount: number,
    capacity: number,
    totalTime: number
}
