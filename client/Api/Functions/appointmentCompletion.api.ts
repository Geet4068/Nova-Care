import { AppointmentResponse } from "@/Interface/appointment.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";


export const CompleteAppointment = async (appointmentId: string): Promise<AppointmentResponse> => {
    try {

        const response = await axiosInstance.put<AppointmentResponse>(
            `${endpoints.appointment.completed}/${appointmentId}`,
        );

        return response.data;

    } catch (error: any) {
        if (error.response?.status === 403 && error.response.data?.error === "jwt expired") {
            throw error;
          }
        console.error("Error cancelling appointment:", error);
        return {
            status: 500,
            message: "Failed to cancel appointment"
        };
    }
}