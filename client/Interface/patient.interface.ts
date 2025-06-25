export interface PatientDashboardDetails {
  status: number;
  message: string;
  data?: Patient;
}

export interface Patient {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  blood_grp: string;
}