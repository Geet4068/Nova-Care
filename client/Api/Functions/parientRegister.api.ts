import { PatientRegisterPayload } from "@/Interface/patientAuth.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";

export const GetPatientRegister = async (payload: PatientRegisterPayload) => {
    try {
        const response = await axiosInstance.post(endpoints.patientAuth.register, payload);

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