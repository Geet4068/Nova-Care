import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaSkype, FaLinkedin, FaPinterest } from 'react-icons/fa';

export default function DoctorSingle() {
    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Doctor Details</span>
                                <h1 className="text-capitalize mb-5 text-lg">Alexandar james</h1>
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
                                    alt="Doctor"
                                    width={500}
                                    height={500}
                                    className="img-fluid w-100"
                                />

                                <div className="info-block mt-4">
                                    <h4 className="mb-0">Alexandar james</h4>
                                    <p>Orthopedic Surgary</p>

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
                                <h2 className="text-md">Introducing to myself</h2>
                                <div className="divider my-4"></div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam tempore cumque voluptate beatae quis
                                    inventore sapiente nemo, a eligendi nostrum expedita veritatis neque incidunt ipsa doloribus provident ex,
                                    at ullam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, perferendis officiis esse quae,
                                    nobis eius explicabo quidem? Officia accusamus repudiandae ea esse non reiciendis accusantium voluptates,
                                    facilis enim, corrupti eligendi?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo recusandae veritatis minus optio quod
                                    obcaecati laborum temporibus, deleniti vero perferendis molestias, ducimus facilis, sunt minima. Tempora,
                                    amet quasi asperiores voluptas?</p>

                                <Link
                                    href="/appointment"
                                    className="btn btn-main-2 btn-round-full mt-3"
                                >
                                    Make an Appoinment
                                    <i className="icofont-simple-right ml-2"></i>
                                </Link>
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
                                <h3>My Educational Qualifications</h3>
                                <div className="divider my-4"></div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="edu-block mb-5">
                                <span className="h6 text-muted">Year(2005-2007) </span>
                                <h4 className="mb-3 title-color">MBBS, M.D at University of Wyoming</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi doloremque harum, mollitia, soluta maxime
                                    porro veritatis fuga autem impedit corrupti aperiam sint, architecto, error nesciunt temporibus! Vel quod,
                                    dolor aliquam!</p>
                            </div>

                            <div className="edu-block">
                                <span className="h6 text-muted">Year(2007-2009) </span>
                                <h4 className="mb-3 title-color">M.D. of Netherland Medical College</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi doloremque harum, mollitia, soluta maxime
                                    porro veritatis fuga autem impedit corrupti aperiam sint, architecto, error nesciunt temporibus! Vel quod,
                                    dolor aliquam!</p>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="edu-block mb-5">
                                <span className="h6 text-muted">Year(2009-2010) </span>
                                <h4 className="mb-3 title-color">MBBS, M.D at University of Japan</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi doloremque harum, mollitia, soluta maxime
                                    porro veritatis fuga autem impedit corrupti aperiam sint, architecto, error nesciunt temporibus! Vel quod,
                                    dolor aliquam!</p>
                            </div>

                            <div className="edu-block">
                                <span className="h6 text-muted">Year(2010-2011) </span>
                                <h4 className="mb-3 title-color">M.D. of Canada Medical College</h4>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi doloremque harum, mollitia, soluta maxime
                                    porro veritatis fuga autem impedit corrupti aperiam sint, architecto, error nesciunt temporibus! Vel quod,
                                    dolor aliquam!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Previous sections remain unchanged */}

            <section className="section doctor-skills">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <h3>My skills</h3>
                            <div className="divider my-4"></div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. In architecto voluptatem alias, aspernatur
                                voluptatibus corporis quisquam? Consequuntur, ad, doloribus, doloremque voluptatem at consectetur natus eum
                                ipsam dolorum iste laudantium tenetur.</p>
                        </div>
                        <div className="col-lg-4">
                            <div className="skill-list">
                                <h5 className="mb-4">Expertise area</h5>
                                <ul className="list-unstyled department-service">
                                    <li><i className="icofont-check mr-2"></i>International Drug Database</li>
                                    <li><i className="icofont-check mr-2"></i>Stretchers and Stretcher Accessories</li>
                                    <li><i className="icofont-check mr-2"></i>Cushions and Mattresses</li>
                                    <li><i className="icofont-check mr-2"></i>Cholesterol and lipid tests</li>
                                    <li><i className="icofont-check mr-2"></i>Critical Care Medicine Specialists</li>
                                    <li><i className="icofont-check mr-2"></i>Emergency Assistance</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar-widget gray-bg p-4">
                                <h5 className="mb-4">Make Appoinment</h5>

                                <ul className="list-unstyled lh-35">
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Monday - Friday</span>
                                        <span>9:00 - 17:00</span>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Saturday</span>
                                        <span>9:00 - 16:00</span>
                                    </li>
                                    <li className="d-flex justify-content-between align-items-center">
                                        <span>Sunday</span>
                                        <span>Closed</span>
                                    </li>
                                </ul>

                                <div className="sidebar-contatct-info mt-4">
                                    <p className="mb-0">Need Urgent Help?</p>
                                    <h3 className="text-color-2">+23-4565-65768</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}