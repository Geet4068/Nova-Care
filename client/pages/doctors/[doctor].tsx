import { useSingleDoctorQuery } from '@/CustomHooks/doctorList.query';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function DoctorSingle() {
    const router = useRouter();
    const { doctor } = router.query;
    const { data: doctorData, isPending, isError } = useSingleDoctorQuery(doctor as string);

    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching doctor data</div>;
    }

    const doctor_details = doctorData?.data;

    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Doctor Details</span>
                                <h1 className="text-capitalize mb-5 text-lg">Dr. {doctor_details?.first_name} {doctor_details?.last_name}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section doctor-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="doctor-img-block">
                                <Image
                                    src="/images/team/1.jpg"
                                    alt={`Dr. ${doctor_details?.first_name} ${doctor_details?.last_name}`}
                                    width={500}
                                    height={500}
                                    className="img-fluid w-100"
                                />

                                <div className="info-block mt-4">
                                    <h4 className="mb-0">Dr. {doctor_details?.first_name} {doctor_details?.last_name}</h4>
                                    <p>{doctor_details?.specialization}</p>
                                    <p>Experience: {doctor_details?.experience}</p>
                                    <p>Fees: ₹{doctor_details?.fees}</p>
                                    <p>Contact: {doctor_details?.phone}</p>

                                    <ul className="list-inline mt-4 doctor-social-links">
                                        <li className="list-inline-item"><Link href="#!"><i className="icofont-facebook"></i></Link></li>
                                        <li className="list-inline-item"><Link href="#!"><i className="icofont-twitter"></i></Link></li>
                                        <li className="list-inline-item"><Link href="#!"><i className="icofont-skype"></i></Link></li>
                                        <li className="list-inline-item"><Link href="#!"><i className="icofont-linkedin"></i></Link></li>
                                        <li className="list-inline-item"><Link href="#!"><i className="icofont-pinterest"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-md-6">
                            <div className="doctor-details mt-4 mt-lg-0">
                                <h2 className="text-md">About Me</h2>
                                <div className="divider my-4"></div>
                                <p>{doctor_details?.about}</p>

                                {doctor_details?.availability && (
                                    <Link
                                        href={`/appointment?doctor=${doctor_details?._id}`}
                                        className="btn btn-main-2 btn-round-full mt-3"
                                    >
                                        Make an Appointment
                                        <i className="icofont-simple-right ml-2"></i>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section doctor-qualification gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="section-title">
                                <h3>Educational Qualifications</h3>
                                <div className="divider my-4"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            {doctor_details?.education?.map((edu) => (
                                <div key={edu._id} className="edu-block mb-5">
                                    <span className="h6 text-muted">{edu.year}</span>
                                    <h4 className="mb-3 title-color">{edu.degree}</h4>
                                    <p>{edu.university}</p>
                                    <p className="text-muted">{edu.info}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section doctor-skills">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="skill-list">
                                <h5 className="mb-4">Areas of Expertise</h5>
                                <ul className="list-unstyled department-service">
                                    {doctor_details?.expertise?.map((area, index) => (
                                        <li key={index}><i className="icofont-check mr-2"></i>{area}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="sidebar-widget gray-bg p-4">
                                <h5 className="mb-4">Availability Schedule</h5>
                                <ul className="list-unstyled lh-35">
                                    {doctor_details?.schedules?.map((schedule) => (
                                        <li key={schedule._id}>
                                            <strong>{schedule.day}</strong>
                                            {schedule.time_slots.map((slot, index) => (
                                                <div key={index} className="ml-3">{slot}</div>
                                            ))}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}