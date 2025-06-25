import { SpecialityDoc } from "@/Interface/doctorList.interface";
import axiosInstance from "../Axios/Axios";
import { endpoints } from "../Endpoints/Endpoints";

export const GetDoctorList = async () => {

    try {

        const response = await axiosInstance.get<SpecialityDoc>(endpoints.doctor.specialityDoctors);

        // console.log("Doctor List Response:", response.data);
        // return {
        //     success: true,
        //     message: response?.data?.message,
        //     status: response?.data?.status,
        //     data: response.data.specialityDocs as SpecialityDoc[],
        // }

        return response.data;

    } catch (error) {
        console.error("Error fetching doctor list:", error);

        return {
            success: false,
            message: "Error fetching doctor list",
            status: 500,
            data: [],
        }

    }
}