import { useSpecialityListQuery } from "@/CustomHooks/specialization.query";
import Image from 'next/image';
import Link from 'next/link';

export default function Department() {
    const { data: specialityList, isPending, isError } = useSpecialityListQuery();
    
    if (isPending) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching departments</div>;
    }

    const getStaticImage = (index: number) => {
        const images = [
            '/images/service/service-1.jpg',
            '/images/service/service-2.jpg',
            '/images/service/service-3.jpg',
            '/images/service/service-4.jpg',
            '/images/service/service-6.jpg',
            '/images/service/service-8.jpg'
        ];
        return images[index % images.length];
    };

    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">All Department</span>
                                <h1 className="text-capitalize mb-5 text-lg">Care Department</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section service-2">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7 text-center">
                            <div className="section-title">
                                <h2>Award winning patient care</h2>
                                <div className="divider mx-auto my-4"></div>
                                <p>Lets know moreel necessitatibus dolor asperiores illum possimus sint voluptates incidunt molestias nostrum laudantium. Maiores porro cumque quaerat.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {specialityList?.data?.map((department, index) => (
                            <div key={department._id} className="col-lg-4 col-md-6">
                                <div className="department-block mb-5">
                                    <Image 
                                        src={getStaticImage(index)} 
                                        alt={department.department} 
                                        className="img-fluid w-100" 
                                        width={500} 
                                        height={300} 
                                    />
                                    <div className="content">
                                        <h4 className="mt-4 mb-2 title-color">{department.department}</h4>
                                        <p className="mb-4">{department.description}</p>
                                        <Link href={`/department-single/${department._id}`} className="read-more">
                                            Learn More <i className="icofont-simple-right ml-2"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}