import { PatientLoginPayload } from "@/Interface/patientAuth.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";

export const GetPatientLogin = async (payload: PatientLoginPayload) => {
    try {

        const response = await axiosInstance.post(endpoints.patientAuth.login, payload);

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

