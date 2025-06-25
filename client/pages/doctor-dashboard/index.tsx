import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useCompleteAppointmentMutation, useGetDoctorAppointmentsQuery } from "@/CustomHooks/appointment.query";
import { AppointmentData } from "@/Interface/appointment.interface";
import { useDoctorDashboardQuery } from "@/CustomHooks/doctorList.query";

export default function DoctorDashboard() {
    const { data: appointments } = useGetDoctorAppointmentsQuery();
    const { data: doctorData } = useDoctorDashboardQuery();
    const { mutate: completeAppointment } = useCompleteAppointmentMutation();
    const [upcomingAppointments, setUpcomingAppointments] = useState<AppointmentData[]>([]);
    const [pastAppointments, setPastAppointments] = useState<AppointmentData[]>([]);
    
    // const { first_name, last_name, specialization_name } = doctorData?.data || {};
    const doctorDetails = doctorData?.data;

    const handleCompleteClick = (appointmentId: string) => {
        completeAppointment({ appointmentId });
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
                                <span className="text-white">Welcome {doctorDetails?.first_name}</span>
                                <h1 className="text-capitalize mb-5 text-lg">Doctor Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <Container>
                    <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#fff', borderRadius: '15px' }}>
                        <Typography variant="h4" sx={{ color: '#223a66', mb: 3 }}>
                            Doctor Information
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Name</Typography>
                                <Typography variant="h6"><b>{doctorDetails?.first_name} {doctorDetails?.last_name}</b></Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Speciality</Typography>
                                <Typography variant="h6"><b>{doctorDetails?.specialization_name}</b></Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Phone</Typography>
                                <Typography variant="h6">{doctorDetails?.phone}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Gender</Typography>
                                <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{doctorDetails?.gender}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Experience</Typography>
                                <Typography variant="h6">{doctorDetails?.experience} Years</Typography>
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>Expertise</Typography>
                                <Typography variant="h6">{doctorDetails?.expertise?.join(', ')}</Typography>
                            </Box>
                            <Box sx={{ gridColumn: 'span 2' }}>
                                <Typography variant="subtitle1" sx={{ color: '#6F8BA4' }}>About</Typography>
                                <Typography variant="h6">{doctorDetails?.about}</Typography>
                            </Box>
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{ p: 4, mb: 4, backgroundColor: '#fff', borderRadius: '15px' }}>
                        <Typography variant="h4" sx={{ color: '#223a66', mb: 3 }}>
                            Upcoming Appointments
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Patient Name</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Fees</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Reason</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {upcomingAppointments.length > 0 ? (
                                        upcomingAppointments.map((appointment) => (
                                            <TableRow key={appointment._id}>
                                                <TableCell>{appointment.patient_name}</TableCell>
                                                <TableCell>{appointment.appointment_day}</TableCell>
                                                <TableCell>{appointment.appointment_time_slot}</TableCell>
                                                <TableCell>₹{appointment.fees}</TableCell>
                                                <TableCell>{appointment.status}</TableCell>
                                                <TableCell>{appointment.reason}</TableCell>
                                                <TableCell>
                                                    {appointment.status === 'Pending' && (
                                                        <Button
                                                            variant="contained"
                                                            color="success"
                                                            onClick={() => handleCompleteClick(appointment._id)}
                                                            sx={{
                                                                backgroundColor: '#223a66',
                                                                '&:hover': {
                                                                    backgroundColor: '#e12454'
                                                                }
                                                            }}
                                                        >
                                                            Complete
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7}>No upcoming appointments found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>

                    <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: '15px' }}>
                        <Typography variant="h4" sx={{ color: '#223a66', mb: 3 }}>
                            Past Appointments
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Patient Name</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Fees</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Reason</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {pastAppointments.length > 0 ? (
                                        pastAppointments.map((appointment) => (
                                            <TableRow key={appointment._id}>
                                                <TableCell>{appointment.patient_name}</TableCell>
                                                <TableCell>{appointment.appointment_day}</TableCell>
                                                <TableCell>{appointment.appointment_time_slot}</TableCell>
                                                <TableCell>₹{appointment.fees}</TableCell>
                                                <TableCell>{appointment.status}</TableCell>
                                                <TableCell>{appointment.reason}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6}>No past appointments found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Container>
            </section>
        </>
    );
}