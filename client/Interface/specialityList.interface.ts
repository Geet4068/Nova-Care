export interface Speciality {
    _id: string;
    department: string;
    description: string;
}

export interface SpecialityResponse {
    status: number;
    message: string;
    data: Speciality[];
}

export interface SingleSpecialityResponse {
    status: number;
    message: string;
    data: Speciality | null; 
}