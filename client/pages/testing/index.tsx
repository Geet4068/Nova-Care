// import { useDoctorListQuery } from "@/CustomHooks/doctorList.query";

// export default function Testing() {
//     const { data, isPending, isError } = useDoctorListQuery();

//     console.log("Data:", data?.data);

//     if (isPending) {
//         return <div>Loading...</div>;
//     }

//     if (isError) {
//         return <div>Error fetching doctors data</div>;
//     }

//     const SpecialityDoctors = data?.data || [];

//     return (
//         <>  

//         <div className="container">
//             <h1>Testing</h1>

//             {SpecialityDoctors.length > 0 ? (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Speciality</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {SpecialityDoctors.flatMap(speciality => 
//                             speciality.doctors.map(doctor => (
//                                 <tr key={doctor._id}>
//                                     <td>{doctor.first_name}</td>
//                                     <td>{doctor.last_name}</td>
//                                     <td>{doctor.email}</td>
//                                     <td>{doctor.phone}</td>
//                                     <td>{speciality.department}</td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             ) : (
//                 <div>No doctors found</div>
//             )}
//             </div>
            
//         </>
//     );
// }

import Link from 'next/link';
import { useState } from 'react';
import { useSpecialityListQuery } from "@/CustomHooks/specialization.query";
import { useDoctorListQuery } from '@/CustomHooks/doctorList.query';

export default function Appointment() {
    const { data: speciality } = useSpecialityListQuery();
    const { data: doctorsList } = useDoctorListQuery();
    const [selectedSpeciality, setSelectedSpeciality] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDay, setSelectedDay] = useState('');

    const handleSpecialityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSpeciality(e.target.value);
        setSelectedDoctor(''); // Reset doctor when speciality changes
        setSelectedDay(''); // Reset day as well
    };

    const getSpecialityDoctors = () => {
        if (!selectedSpeciality || !doctorsList?.specialityDocs) return [];
        const specialityData = doctorsList.specialityDocs.find(
            spec => spec._id === selectedSpeciality
        );
        return specialityData?.doctors.filter(doc => doc.status === "approved" && doc.availability) || [];
    };

    const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDoctor(e.target.value);
        setSelectedDay('');
    };

    const getSelectedDoctor = () => {
        return getSpecialityDoctors().find(doc => doc._id === selectedDoctor);
    };

    const getAvailableDays = () => {
        const doctor = getSelectedDoctor();
        if (!doctor) return [];
        return doctor.schedules.map(schedule => schedule.day);
    };

    const getAvailableTimeSlots = () => {
        const doctor = getSelectedDoctor();
        if (!doctor || !selectedDay) return [];
        const schedule = doctor.schedules.find(s => s.day === selectedDay);
        return schedule?.time_slots || [];
    };

    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Book your Seat</span>
                                <h1 className="text-capitalize mb-5 text-lg">Appointment</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="appoinment section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="mt-3">
                                <div className="feature-icon mb-3">
                                    <i className="icofont-support text-lg"></i>
                                </div>
                                <span className="h3">Call for an Emergency Service!</span>
                                <h2 className="text-color mt-3">+84 789 1256 </h2>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="appoinment-wrap mt-5 mt-lg-0 pl-lg-5">
                                <h2 className="mb-2 title-color">Book an appointment</h2>
                                <p className="mb-4">Mollitia dicta commodi est recusandae iste, natus eum asperiores corrupti qui velit . Iste dolorum atque similique praesentium soluta.</p>
                                <form className="appoinment-form">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <select 
                                                    className="form-control" 
                                                    id="speciality"
                                                    value={selectedSpeciality}
                                                    onChange={handleSpecialityChange}
                                                >
                                                    <option value="">Select Speciality/Department</option>
                                                    {speciality?.data?.map((spec) => (
                                                        <option key={spec._id} value={spec._id}>
                                                            {spec.department}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <select 
                                                    className="form-control" 
                                                    id="doctor"
                                                    disabled={!selectedSpeciality}
                                                    value={selectedDoctor}
                                                    onChange={handleDoctorChange}
                                                >
                                                    <option value="">
                                                        {!selectedSpeciality ? "Please select a speciality first" : "Select Doctor"}
                                                    </option>
                                                    {getSpecialityDoctors().map((doctor) => (
                                                        <option key={doctor._id} value={doctor._id}>
                                                            Dr. {doctor.first_name} {doctor.last_name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <select 
                                                    className="form-control" 
                                                    id="appointmentDay"
                                                    disabled={!selectedDoctor}
                                                    value={selectedDay}
                                                    onChange={(e) => setSelectedDay(e.target.value)}
                                                >
                                                    <option value="">
                                                        {!selectedDoctor ? "Select doctor first" : "Select Day"}
                                                    </option>
                                                    {getAvailableDays().map((day, index) => (
                                                        <option key={index} value={day}>
                                                            {day}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <select 
                                                    className="form-control" 
                                                    id="appointmentTime"
                                                    disabled={!selectedDay}
                                                >
                                                    <option value="">
                                                        {!selectedDay ? "Select day first" : "Select Time"}
                                                    </option>
                                                    {getAvailableTimeSlots().map((timeSlot, index) => (
                                                        <option key={index} value={timeSlot}>
                                                            {timeSlot}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <input 
                                                    name="reason" 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Reason for Visit" 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group-2 mb-4">
                                        <textarea 
                                            name="allergies" 
                                            className="form-control" 
                                            rows={3} 
                                            placeholder="Do you have any allergies? Please specify"
                                        ></textarea>
                                    </div>

                                    <div className="form-group-2 mb-4">
                                        <textarea 
                                            name="medicalHistory" 
                                            className="form-control" 
                                            rows={4} 
                                            placeholder="Any medical history we should know about?"
                                        ></textarea>
                                    </div>

                                    <Link href="/confirmation" className="btn btn-main btn-round-full">
                                        Book Appointment<i className="icofont-simple-right ml-2"></i>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}