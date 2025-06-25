import { AppointmentResponse } from "@/Interface/appointment.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";

interface CancellationPayload {
    reason: string;
}

export const CancelAppointment = async (appointmentId: string, reason: string): Promise<AppointmentResponse> => {
    try {
        const payload: CancellationPayload = {
            reason
        };

        const response = await axiosInstance.post<AppointmentResponse>(
            `${endpoints.appointment.cancel}/${appointmentId}`,
            payload
        );

        return response.data;

    } catch (error: any) {
        if (error.response?.status === 403 && error.response.data?.error === "jwt expired") {
            throw error; // This will be caught by useMutation's onError
          }
        console.error("Error cancelling appointment:", error);
        return {
            status: 500,
            message: "Failed to cancel appointment"
        };
    }
}