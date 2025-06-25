
import { DoctorRegistrationPayload } from "@/Interface/doctorAuth.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";

export const GetDoctorRegister = async (payload: DoctorRegistrationPayload) => {
    console.log("Payload:", payload);
    try {
        const response = await axiosInstance.post(endpoints.doctorAuth.register, payload, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });

        return response.data;
    } catch (error: any) {
        // console.log("Full Error:", error);
        if (error.response && error.response.data) {
            return error.response.data;
        } else {
            return { status: 500, message: "Something went wrong!" };
        }
    }

}