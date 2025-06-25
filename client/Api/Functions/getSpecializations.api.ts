
import { Speciality, SpecialityResponse } from "@/Interface/specialityList.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";

export const GetAllSpecialities = async (): Promise<SpecialityResponse> => {
    try {

        const response = await axiosInstance.get<SpecialityResponse>(endpoints.specialization.get);

        // console.log("Specialization List Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching specializations:", error);
        return {
            status: 500,
            message: "Failed to fetch specializations",
            data: []
        };
    }
}