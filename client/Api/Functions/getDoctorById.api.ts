import { SingleDoctorResponse } from "@/Interface/doctorList.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";


export const GetSingleDoctorList = async (doctorId: string): Promise<SingleDoctorResponse> => {
    try {
        console.log("Doctor By Id ID:", doctorId);
        const response = await axiosInstance.get<SingleDoctorResponse>(`${endpoints.doctor.getDoctorListById}/${doctorId}`);

        console.log("Doctor By Id Response:", response.data);
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