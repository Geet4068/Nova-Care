import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";
import { DoctorLoginPayload } from "@/Interface/doctorAuth.interface";

export const GetDoctorLogin = async (payload:DoctorLoginPayload) => {
    try {

        const response = await axiosInstance.post(endpoints.doctorAuth.login, payload);

        // console.log("Patient Login Response:", response.data);
        return response.data;

    } catch (error: any) {
       
        // Handle Axios error correctly
        if (error.response && error.response.data) {
            return error.response.data; 
        } else {
            return { status: 500, message: "Something went wrong!" };
        }
    }

}

