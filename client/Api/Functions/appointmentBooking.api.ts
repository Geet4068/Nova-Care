import { AppointmentPayload, AppointmentResponse } from "@/Interface/appointment.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";

export const BookAppointment = async (payload: AppointmentPayload): Promise<AppointmentResponse> => {
    try {
        const response = await axiosInstance.post(endpoints.appointment.booking, payload);
        console.log("Appointment Booking Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error booking appointment:", error);
        return {
            status: 500,
            message: "Failed to book appointment",
            data: undefined
        };
    }
}