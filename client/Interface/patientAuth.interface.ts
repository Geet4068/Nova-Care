export interface PatientLoginPayload  {
    email: string;
    password: string;
}

export interface PatientRegisterPayload  {
    first_name: string; 
    last_name: string;
    email: string;
    phone: string;
    gender: string;
    blood_grp?: string;
    dob: string;
    role?: string;
}