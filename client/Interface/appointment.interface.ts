export interface AppointmentPayload {
    doctor_id: string;
    speciality: string;
    reason: string;
    allergies: string;
    medicalHistory: string;
    appointment_day: string;
    appointment_time_slot: string;
}

export interface AppointmentResponse {
    status: number;
    message: string;
    data?: AppointmentData[];
}

export interface AppointmentData {
    _id: string;
    patient_id: string;
    doctor_id: string;
    patient_name: string;
    patient_email: string;
    patient_phone: string;
    patient_blood_grp: string;
    doctor_name: string;
    doctor_email: string;
    doctor_phone: string;
    fees: number;
    speciality: string;
    reason: string;
    status: string;
    allergies: string;
    medicalHistory: string;
    appointment_day: string;
    appointment_time_slot: string;
    is_cancelled?: boolean;
    createdAt: string;
    updatedAt: string;
}
