export interface SpecialityDoc {
  _id: string;
  department: string;
  description: string;
  doctors: Doctor[];
  doctorCount: number;
}


export interface DoctorListResponse {
  status: number;
  message: string;
  specialityDocs: SpecialityDoc[];
}

export interface SingleDoctorResponse {
  status: number;
  message: string;
  data: Doctor | null; 
}

export interface DoctorDashboardDetails {
  status: number;
  message: string;
  data?: Doctor;
}

// Doctor-related interfaces
interface Doctor {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  specialization_id?: string;
  specialization_name?: string;
  specialization?: string;
  expertise: string[];
  about: string;
  experience: string;
  status: 'approved' | 'pending' | 'rejected';
  education: Education[];
  availability: boolean;
  reviews: Review[];
  fees: number;
  schedules: Schedule[];
}

interface Education {
  _id: string;
  degree: string;
  university: string;
  year: number;
  info: string;
}

interface Review {
  patient_id: string;
  rating: number;
  comment: string;
  date: Date;
}

interface Schedule {
  _id: string;
  day: string;
  time_slots: string[];
  start_time: string;
  end_time: string;
}

// Specialization interface
interface Specialization {
  _id: string;
  department: string;
  description: string;
}

// API Response interfaces
interface ApiResponse {
  status: number;
  message: string;
}

interface SpecialityDoctorResponse extends ApiResponse {
  data: SpecialityWithDoctors[];
}

interface SpecialityWithDoctors extends Specialization {
  doctors: Doctor[];
  doctorCount: number;
}

// Error response interface
interface ErrorResponse extends ApiResponse {
  error?: string;
}