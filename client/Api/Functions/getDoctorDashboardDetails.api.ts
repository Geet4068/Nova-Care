

import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";
import { DoctorDashboardDetails } from "@/Interface/doctorList.interface";


export const GetDoctorDashboardDetails = async (): Promise<DoctorDashboardDetails> => {
    try {

        const response = await axiosInstance.get<DoctorDashboardDetails>(endpoints.doctor.dashboardDetails);

        console.log("Doctor Dashboard Details Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching your Appointment:", error);
        return {
            status: 500,
            message: "Failed to fetch your Appointment",
        };
    }
}