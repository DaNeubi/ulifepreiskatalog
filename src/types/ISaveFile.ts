import IVehicle from "@/types/IVehicles";
import IJob from "@/types/IJob";
import ISettings from "@/types/ISettings";

export default interface SaveFile{
    vehicles: IVehicle[],
    jobs: IJob[],
    settings: ISettings,
    version: number
}
