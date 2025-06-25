import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCancelAppointmentMutation, useGetPatientAppointmentsQuery } from "@/CustomHooks/appointment.query";
import { AppointmentData, AppointmentResponse } from "@/Interface/appointment.interface";
import SweetAlertComponent from "@/SweetAlert/sweetalert";

export default function PatientDashboard() {
    const { data: appointments } = useGetPatientAppointmentsQuery();
    const { mutate: cancelAppointment } = useCancelAppointmentMutation();
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>('');
    const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentData[]>([]);
    const [pastAppointments, setPastAppointments] = useState<AppointmentData[]>([]);

    const patientDetails: AppointmentData = appointments?.data?.[0] || {};
    const { patient_name, patient_email, patient_phone, patient_blood_grp } = patientDetails;

    const handleCancelClick = (appointmentId: string) => {
        setSelectedAppointmentId(appointmentId);
        setShowCancelModal(true);
    };

    const handleCancelConfirm = (reason: string) => {
        cancelAppointment({
            appointmentId: selectedAppointmentId,
            reason: reason
        });
        setShowCancelModal(false);
    };

    useEffect(() => {
        if (appointments?.data) {
            const upcoming = appointments.data.filter(apt =>
                apt.status === 'Pending' && !apt.is_cancelled
            );
            const past = appointments.data.filter(apt =>
                apt.status === 'Completed' ||
                apt.status === 'Cancelled' ||
                apt.status === 'Missed' ||
                apt.status === 'Rejected' ||
                apt.is_cancelled
            );

            setUpcomingAppointments(upcoming);
            setPastAppointments(past);
        }
    }, [appointments]);

    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Welcome {patient_name}</span>
                                <h1 className="text-capitalize mb-5 text-lg">Patient Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <Container>

                    <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#fff', borderRadius: '15px' }}>
                        <Typography variant="h4" sx={{ color: '#223a66', mb: 3 }}>
                            Personal Information
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Name</Typography>
                                <Typography variant="h6">{patient_name}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Email</Typography>
                                <Typography variant="h6">{patient_email}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Phone</Typography>
                                <Typography variant="h6">{patient_phone}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Blood Group</Typography>
                                <Typography variant="h6">{patient_blood_grp}</Typography>
                            </Box>
                            </Box>
                            {/* Book Appointment Button */}
                            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    href="/appointment"
                                    sx={{
                                        backgroundColor: '#223a66',
                                        '&:hover': {
                                            backgroundColor: '#e12454',
                                            color: '#fff'
                                        },
                                    }}
                                >
                                    Book a New Appointment
                                </Button>
                            </Box>
                        
                    </Paper>

                    {/* Update table fields to match the model */}
                    <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#fff', borderRadius: '15px' }}>
                        <Typography variant="h4" sx={{ color: '#223a66', mb: 3 }}>
                            Upcoming Appointments
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Doctor</TableCell>
                                        <TableCell>Speciality</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Fees</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Reason</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {upcomingAppointments.map((appointment) => (
                                        <TableRow key={appointment._id}>
                                            <TableCell>{appointment.doctor_name}</TableCell>
                                            <TableCell>{appointment.speciality}</TableCell>
                                            <TableCell>{appointment.appointment_day}</TableCell>
                                            <TableCell>{appointment.appointment_time_slot}</TableCell>
                                            <TableCell>₹{appointment.fees}</TableCell>
                                            <TableCell>{appointment.status}</TableCell>
                                            <TableCell>{appointment.reason}</TableCell>
                                            <TableCell>
                                                {appointment.status !== 'Cancelled' && (
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={() => handleCancelClick(appointment._id)}
                                                        sx={{
                                                            backgroundColor: '#e12454',
                                                            '&:hover': {
                                                                backgroundColor: '#223a66'
                                                            }
                                                        }}
                                                    >
                                                        Cancel Appointment
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    {/* Update past appointments table similarly */}
                    <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: '15px' }}>
                        <Typography variant="h4" sx={{ color: '#223a66', mb: 3 }}>
                            Past Appointments
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Doctor</TableCell>
                                        <TableCell>Speciality</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Fees</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Reason</TableCell>
                                        {/* Add more relevant fields */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pastAppointments.map((appointment) => (
                                        <TableRow key={appointment._id}>
                                            <TableCell>{appointment.doctor_name}</TableCell>
                                            <TableCell>{appointment.speciality}</TableCell>
                                            <TableCell>{appointment.appointment_day}</TableCell>
                                            <TableCell>{appointment.appointment_time_slot}</TableCell>
                                            <TableCell>₹{appointment.fees}</TableCell>
                                            <TableCell>{appointment.status}</TableCell>
                                            <TableCell>{appointment.reason}</TableCell>
                                            {/* Add more cells for additional fields */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </section>

            {showCancelModal && (
                <SweetAlertComponent
                    title="Cancel Appointment"
                    subtitle="Please provide a reason for cancellation"
                    type="input"
                    inputPlaceholder="Enter reason for cancellation"
                    confirm={handleCancelConfirm}
                    cancel={() => setShowCancelModal(false)}
                />
            )}
        </>
    );
}