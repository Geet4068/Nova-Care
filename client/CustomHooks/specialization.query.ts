
import { GetSpecialityById } from "@/Api/Functions/getSpecialityById.api";
import { GetAllSpecialities } from "@/Api/Functions/getSpecializations.api";
import { useQuery } from "@tanstack/react-query";

export const useSpecialityListQuery = () => {
    return useQuery({
        queryKey: ["Specialities"],
        queryFn: () => GetAllSpecialities(),
    });
};


export const useSpecialityById = (specializationId: string) => {
    return useQuery({
        queryKey: ["Specialities-by-id"],
        queryFn: () => GetSpecialityById(specializationId),
    });
};