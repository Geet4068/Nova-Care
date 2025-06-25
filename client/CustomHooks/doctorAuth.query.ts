import { GetDoctorLogin } from "@/Api/Functions/doctorLogin.api";
import { GetDoctorRegister } from "@/Api/Functions/doctorRegister.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Cookies } from "react-cookie";
import { toast } from "react-toastify";

export const useDoctorRegisterMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: GetDoctorRegister,
        onSuccess: (response) => {

            console.log("Patient Register response:", response);
            const { message, status } = response || {};
            if (status !== 200) {
                toast.error(message || "Registration failed");
                // router.reload();
                return;
            }
            toast.success(message || "Registration successful!");
            // router.push("/doctor-login")
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "An error occurred during registration");

        },
    })
}


export const useDoctorLoginMutation = () => {


    const cookies = new Cookies();
    const router = useRouter();

    return useMutation({
        mutationFn: GetDoctorLogin,
        onSuccess: (response) => {
            // console.log("Patient Login Response:", response);
            const { message, status, token, doctor } = response || {};
            // console.log("Patient Login message:", message);
            if (status === 200) {
                cookies.set("token", token, { path: "/" });
                cookies.set("first_name", doctor?.first_name, { path: "/" });
                toast.success(message || "Login successful!");
                router.push("/doctor-dashboard");

                // console.log("Patient Login Response:", response.message);
            }
            else {
                console.log("Patient Login Response:", response);
                toast.error(response?.message || "Login failed");
            }
        },

        onError: (error) => {
            // if (error.response && error.response.data) {
            //     toast.error(error.response.data.message || "Login failed. Please try again.");
            // }
            console.error("Error during patient login:", error);
            toast.error(error.message || "Login failed. Please try again.");

        },
    })

}