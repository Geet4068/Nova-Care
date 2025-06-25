import { useDoctorListQuery } from "@/CustomHooks/doctorList.query";
import { SpecialityDoc } from "@/Interface/doctorList.interface";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Doctors() {
    const { data, isPending, isError } = useDoctorListQuery();
    const specialityDoctors = data?.data || [];
    const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching doctors data</div>;
    }

    // Function to get static images
    const getStaticImage = (index: number) => {
        const images = ['/images/team/1.jpg', '/images/team/2.jpg', '/images/team/3.jpg', '/images/team/4.jpg'];
        return images[index % images.length];
    };

    const handleDepartmentChange = (department: string) => {
        setSelectedDepartment(department);
    };

    const filteredDoctors: SpecialityDoc[] = selectedDepartment === 'all'
        ? specialityDoctors
        : specialityDoctors.filter(spec => spec.department === selectedDepartment);

    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">All Doctors</span>
                                <h1 className="text-capitalize mb-5 text-lg">Specalized doctors</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section doctors">
                <div className="container">
                    {/* Title section */}
                    <div className="row justify-content-center">
                        <div className="col-lg-6 text-center">
                            <div className="section-title">
                                <h2>Doctors</h2>
                                <div className="divider mx-auto my-4"></div>
                                <p>We provide a wide range of creative services adipisicing elit. Autem maxime rem modi eaque, voluptate. Beatae officiis neque </p>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Filter buttons */}
                    <div className="col-12 text-center mb-5">
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <label className={`btn ${selectedDepartment === 'all' ? 'active' : ''}`}>
                                <input 
                                    type="radio" 
                                    name="shuffle-filter" 
                                    value="all" 
                                    checked={selectedDepartment === 'all'}
                                    onChange={() => handleDepartmentChange('all')}
                                />
                                All Department
                            </label>
                            {specialityDoctors.map((speciality: SpecialityDoc) => (
                                <label 
                                    key={speciality._id} 
                                    className={`btn ${selectedDepartment === speciality.department ? 'active' : ''}`}
                                >
                                    <input 
                                        type="radio" 
                                        name="shuffle-filter" 
                                        value={speciality.department}
                                        checked={selectedDepartment === speciality.department}
                                        onChange={() => handleDepartmentChange(speciality.department)}
                                    />
                                    {speciality.department}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Doctor cards */}
                    <div className="row shuffle-wrapper portfolio-gallery">
                        {filteredDoctors.flatMap((speciality: SpecialityDoc) => 
                            speciality.doctors
                                .filter(doctor => doctor.status === "approved" && doctor.availability)
                                .map((doctor, docIndex) => (
                                    <div key={doctor._id} className="col-lg-3 col-sm-6 col-md-6 mb-4 shuffle-item">
                                        <Link href={`/doctors/${doctor._id}`}>
                                            <div className="position-relative doctor-inner-box" style={{ cursor: 'pointer' }}>
                                                <div className="doctor-profile">
                                                    <div className="doctor-img">
                                                        <Image
                                                            src={getStaticImage(docIndex)}
                                                            alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
                                                            width={500}
                                                            height={500}
                                                            className="img-fluid w-100"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="content mt-3">
                                                    <h4 className="mb-0">
                                                        Dr. {doctor.first_name} {doctor.last_name}
                                                    </h4>
                                                    <p className="mb-0">{speciality.department}</p>
                                                    <p className="text-sm mb-0">Experience: {doctor.experience} years</p>
                                                    <p className="text-sm">Fees: ₹{doctor.fees}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </section>

            <section className="section cta-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="cta-content">
                                <div className="divider mb-4"></div>
                                <h2 className="mb-5 text-lg">We are pleased to offer you the <span className="title-color">chance to have the healthy</span></h2>
                                <Link href="/appointment" className="btn btn-main-2 btn-round-full">
                                    Get appointment<i className="icofont-simple-right ml-2"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}