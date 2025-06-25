
export const endpoints = {
  patientAuth: {
    login: "/login",
    register: "/register",
  },
  patient: {
    dashboardDetails: "/patient-dashboard-details",
  },
  doctorAuth: {
    login: "/doctor-login",
    register: "/doctor-register",
    appointments: "/doctor-appointments",
  },
  doctor: {
    list: "/doctors",
    dashboardDetails: "/doctor-dashboard-details",
    specialityDoctors: "/get-speciality-doctors",
    getDoctorListById: "/doctor-by-id",
  },
  appointment: {
    booking: "/create-appointment",
    get: "/get-appointments",
    getPatientAppointments: "/patient-dashboard/get-personal-appointments",
    getDoctorAppointments: "/doctor-dashboard/get-doctor-appointments",
    cancel: "/update-appointment-status-cancelled",
    completed: "/update-appointment-status-completed",
  },
  specialization: {
    get: "/all-specialities",
    getById: "/get-speciality-by-id",
  }
};

export const successNotificationEndpoints: string[] = [
  endpoints.patientAuth.login,
  endpoints.patientAuth.register,
  endpoints.doctorAuth.login,
  endpoints.doctorAuth.register,
  endpoints.doctor.list,
  endpoints.doctor.dashboardDetails,
  endpoints.doctor.specialityDoctors,
  endpoints.doctorAuth.appointments,
  endpoints.appointment.booking,
  endpoints.appointment.get,
  endpoints.appointment.getPatientAppointments,
  endpoints.appointment.getDoctorAppointments,
];
