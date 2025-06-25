import { GetDoctorList } from "@/Api/Functions/getDoctorList.api";
import { GetDoctorDashboardDetails } from "@/Api/Functions/getDoctorDashboardDetails.api";
import { DoctorListResponse } from "@/Interface/doctorList.interface";
import { useQuery } from "@tanstack/react-query";
import { GetSingleDoctorList } from "@/Api/Functions/getDoctorById.api";

export const useDoctorListQuery = () => {
    return useQuery({
        queryKey: ["DOCTORS"],
        queryFn: () => GetDoctorList(),
    });
};

export const useDoctorDashboardQuery = () => {
    return useQuery({
        queryKey: ["DOCTOR_DASHBOARD"],
        queryFn: () => GetDoctorDashboardDetails(),
    });
}

export const useSingleDoctorQuery = (doctorId: string) => {
    return useQuery({
        queryKey: ["DOCTORS", doctorId],
        queryFn: () => GetSingleDoctorList(doctorId),
    });
};