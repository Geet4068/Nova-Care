import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Our services</span>
                                <h1 className="text-capitalize mb-5 text-lg">What We Do</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section service-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="service-block mb-5">
                                <Image 
                                    src="/images/service/service-1.jpg" 
                                    alt="service" 
                                    className="img-fluid"
                                    width={500}
                                    height={300}
                                />
                                <div className="content">
                                    <h4 className="mt-4 mb-2 title-color">Child care</h4>
                                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="service-block mb-5">
                                <Image 
                                    src="/images/service/service-2.jpg" 
                                    alt="service" 
                                    className="img-fluid"
                                    width={500}
                                    height={300}
                                />
                                <div className="content">
                                    <h4 className="mt-4 mb-2 title-color">Personal Care</h4>
                                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="service-block mb-5">
                                <Image 
                                    src="/images/service/service-3.jpg" 
                                    alt="service" 
                                    className="img-fluid"
                                    width={500}
                                    height={300}
                                />
                                <div className="content">
                                    <h4 className="mt-4 mb-2 title-color">CT scan</h4>
                                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="service-block mb-5 mb-lg-0">
                                <Image 
                                    src="/images/service/service-4.jpg" 
                                    alt="service" 
                                    className="img-fluid"
                                    width={500}
                                    height={300}
                                />
                                <div className="content">
                                    <h4 className="mt-4 mb-2 title-color">Joint replacement</h4>
                                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="service-block mb-5 mb-lg-0">
                                <Image 
                                    src="/images/service/service-6.jpg" 
                                    alt="service" 
                                    className="img-fluid"
                                    width={500}
                                    height={300}
                                />
                                <div className="content">
                                    <h4 className="mt-4 mb-2 title-color">Examination & Diagnosis</h4>
                                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="service-block mb-5 mb-lg-0">
                                <Image 
                                    src="/images/service/service-8.jpg" 
                                    alt="service" 
                                    className="img-fluid"
                                    width={500}
                                    height={300}
                                />
                                <div className="content">
                                    <h4 className="mt-4 mb-2 title-color">Alzheimer's disease</h4>
                                    <p className="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
                                </div>
                            </div>
                        </div>
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
    )
}
