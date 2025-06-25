
import { AppointmentResponse } from "@/Interface/appointment.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";

export const GetAllAppointments = async (): Promise<AppointmentResponse> => {
    try {

        const response = await axiosInstance.get<AppointmentResponse>(endpoints.appointment.get);

        // console.log("Appointment List Response:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error fetching your Appointment:", error);
        return {
            status: 500,
            message: "Failed to fetch your Appointment",
        };
    }
}