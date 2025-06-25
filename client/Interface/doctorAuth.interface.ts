

export interface Education {
    year: string;
    degree: string;
    university: string;
    info: string;
    _id?: string;
}

export interface DoctorRegistrationPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    specialization_id: string; 
    expertise: string[];
    about: string;
    experience: string;
    education: Education[];
    profile_pic? : File | string;
}

export interface DoctorLoginPayload {
    email: string;
    password: string;
}