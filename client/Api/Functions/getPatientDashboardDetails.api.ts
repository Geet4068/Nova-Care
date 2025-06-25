

import { PatientDashboardDetails } from "@/Interface/patient.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";


export const GetPatientDashboardDetails = async (): Promise<PatientDashboardDetails> => {
    try {

        const response = await axiosInstance.get<PatientDashboardDetails>(endpoints.patient.dashboardDetails);

        // console.log("Patient Dashboard Details Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching your Appointment:", error);
        return {
            status: 500,
            message: "Failed to fetch your Appointment",
        };
    }
}