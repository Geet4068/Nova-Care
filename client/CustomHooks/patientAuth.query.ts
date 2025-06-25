import { useMutation } from "@tanstack/react-query";
import { GetPatientLogin } from "@/Api/Functions/patientLogin.api";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { GetPatientRegister } from "@/Api/Functions/parientRegister.api";

export const usePatientLoginMutation = () => {


    const cookies = new Cookies();
    const router = useRouter();

    return useMutation({
        mutationFn: GetPatientLogin,
        onSuccess: (response) => {
            // console.log("Patient Login Response:", response);
            const { message, status, token, user } = response || {};
            // console.log("Patient Login message:", message);
            if (status === 200) {
                cookies.set("token", token, { path: "/" });
                cookies.set("first_name", user?.first_name, { path: "/" });
                toast.success(message || "Login successful!");
                router.push("/patient-dashboard");

                // console.log("Patient Login Response:", response.message);
            }
            else {
                console.log("Patient Login Response:", response);
                toast.error(response?.message || "Login failed");
            }
        },

        onError: (error) => {
            console.error("Error during patient login:", error);
            toast.error("Login failed. Please try again.");
        },
    })

}

export const usePatientRegisterMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: GetPatientRegister,
        onSuccess: (response) => {
            
            console.log("Patient Register response:", response);
            const { message, status } = response || {};
            if (status !== 200) {
                toast.error(message || "Registration failed");
                return;
            }
            toast.success(message || "Registration successful!");
            router.push("/user-login")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "An error occurred during registration");

        },
    })
}
