import IVehicle from "@/types/IVehicles";
import IJob from "@/types/IJob";
import ISettings from "@/types/ISettings";
import IFruitSeller from "@/types/IFruitSeller";

export default interface SaveFile{
    vehicles: IVehicle[],
    jobs: IJob[],
    settings: ISettings,
    currentFruitSeller: IFruitSeller,
    version: number
}
