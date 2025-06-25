import { BookAppointment } from "@/Api/Functions/appointmentBooking.api";
import { CancelAppointment } from "@/Api/Functions/appointmentCancelation.api";
import { CompleteAppointment } from "@/Api/Functions/appointmentCompletion.api";
import { GetAllAppointments } from "@/Api/Functions/getAppointment.api";
import { GetDoctorAppointments } from "@/Api/Functions/getDoctorAppointments.api";
import { GetPatientAppointments } from "@/Api/Functions/getPatientAppointments.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const useBookAppointmentMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: BookAppointment,
        onSuccess: (response) => {

            console.log("Patient Register response:", response);
            const { message, status } = response || {};
            if (status !== 200) {
                toast.error(message || "Appointment booking failed");
                console.error(response)
                router.reload();
                return;
            }
            toast.success(message || "Appointment booking successful!");
            router.push("/patient-dashboard")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "An error occurred during your booking");

        },
    })
}

export const useGetAppointmentsQuery = () => {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: GetAllAppointments,
    });
};

export const useGetPatientAppointmentsQuery = () => {
    return useQuery({
        queryKey: ['personal-appointments'],
        queryFn: GetPatientAppointments,
    });
};

export const useGetDoctorAppointmentsQuery = () => {
    return useQuery({
        queryKey: ['doctor-appointments'],
        queryFn: GetDoctorAppointments,
    });
};

export const useCancelAppointmentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ appointmentId, reason }: { appointmentId: string, reason: string }) =>
            CancelAppointment(appointmentId, reason),
        onSuccess: (response) => {
            const { message, status } = response;
            if (status !== 200) {
                toast.error(message || "Failed to cancel appointment");
                return;
            }
            toast.success(message || "Appointment cancelled successfully");
            queryClient.invalidateQueries({ queryKey: ['appointments', 'personal-appointments'] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to cancel appointment");
        }
    });
};

export const useCompleteAppointmentMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ appointmentId }: { appointmentId: string }) =>
            CompleteAppointment(appointmentId),
        onSuccess: (response) => {
            const { message, status } = response;
            if (status !== 200) {
                toast.error(message || "Failed to mark appointment Comlpleted");
                return;
            }
            toast.success(message || "Appointment Completed");
            queryClient.invalidateQueries({ queryKey: ['appointments', 'doctor-appointments'] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to complete appointment");
        }
    });
};