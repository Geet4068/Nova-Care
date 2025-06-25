import Image from 'next/image';
import Link from 'next/link';

export default function DepartmentSingle() {
    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Department Details</span>
                                <h1 className="text-capitalize mb-5 text-lg">Single Department</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section department-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="department-img">
                                <Image 
                                    src="/images/service/bg-1.jpg" 
                                    alt="department" 
                                    className="img-fluid"
                                    width={1200}
                                    height={600}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="department-content mt-5">
                                <h3 className="text-md">Medecine and Health</h3>
                                <div className="divider my-4"></div>
                                <p className="lead">Age forming covered you entered the examine. Blessing scarcely confined her contempt wondered shy. Dashwoods contented sportsmen at up no convinced cordially affection.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum recusandae dolor autem laudantium, quaerat vel dignissimos. Magnam sint suscipit omnis eaque unde eos aliquam distinctio, quisquam iste, itaque possimus . Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet alias modi eaque, ratione recusandae cupiditate dolorum repellendus iure eius rerum hic minus ipsa at, corporis nesciunt tempore vero voluptas. Tempore.</p>

                                <h3 className="mt-5 mb-4">Services features</h3>
                                <div className="divider my-4"></div>
                                <ul className="list-unstyled department-service">
                                    <li><i className="icofont-check mr-2"></i>International Drug Database</li>
                                    <li><i className="icofont-check mr-2"></i>Stretchers and Stretcher Accessories</li>
                                    <li><i className="icofont-check mr-2"></i>Cushions and Mattresses</li>
                                    <li><i className="icofont-check mr-2"></i>Cholesterol and lipid tests</li>
                                    <li><i className="icofont-check mr-2"></i>Critical Care Medicine Specialists</li>
                                    <li><i className="icofont-check mr-2"></i>Emergency Assistance</li>
                                </ul>

                                <Link href="/appointment" className="btn btn-main-2 btn-round-full">
                                    Make an Appointment<i className="icofont-simple-right ml-2"></i>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="sidebar-widget schedule-widget mt-5">
                                <h5 className="mb-4">Time Schedule</h5>

                                <ul className="list-unstyled">
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
                                    <h3>+23-4565-65768</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}