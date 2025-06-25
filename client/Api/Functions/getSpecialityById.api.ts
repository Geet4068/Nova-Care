import { SingleSpecialityResponse } from "@/Interface/specialityList.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";


export const GetSpecialityById = async (specializationId: string): Promise<SingleSpecialityResponse> => {
    try {
        // console.log("Speciality By Id ID:", specializationId);
        const response = await axiosInstance.get<SingleSpecialityResponse>(`${endpoints.specialization.getById}/${specializationId}`);

        // console.log("Speciality By Id Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching your Appointment:", error);
        return {
            status: 500,
            message: "Failed to fetch your Appointment",
            data: null,
        };
    }
}