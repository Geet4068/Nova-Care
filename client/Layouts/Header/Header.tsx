import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useSpecialityListQuery } from "@/CustomHooks/specialization.query";

const Header = () => {
    const pathname = usePathname();
    const { data: specialityList } = useSpecialityListQuery();

    const isActive = (path: string) => {
        return pathname === path ? 'active' : '';
    };

    const [userName, setUserName] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const router = useRouter();
    const cookie = new Cookies();
    
    const handleLogout = () => {
        cookie.remove('token');
        cookie.remove('first_name');
        setIsLoggedIn(false);
        setUserName(null);
        router.push('/');
    };

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = cookie.get('token');
            const name = cookie.get('first_name');
            setUserName(name || null);
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();
        // Check status whenever component renders
        const interval = setInterval(checkLoginStatus, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="header-wrapper">
            <div className="header-top-bar">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <ul className="top-bar-info list-inline-item pl-0 mb-0">
                                <li className="list-inline-item">
                                    <a href="mailto:support@novena.com">
                                        <i className="icofont-support-faq mr-2"></i>support@novena.com
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <i className="icofont-location-pin mr-2"></i>Address Ta-134/A, New York, USA
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <div className="text-lg-right top-right-bar mt-2 mt-lg-0">
                                <a href="tel:+823-4565-13456">
                                    <span>Call Now : </span>
                                    <span className="h4">823-4565-13456</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav className={`navbar navbar-expand-lg navigation`} id="navbar">
                <div className="container">

                    <Link href="/" className="navbar-brand">
                        <div className="logo">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={150}
                                height={50}
                                priority
                                style={{ objectFit: 'contain' }}
                            />
                            <h3>Novena</h3>
                            <span>TOTAL HEALTH CARE SOLUTION</span>
                        </div>
                    </Link>

                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarmain"
                        aria-controls="navbarmain"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="icofont-navigation-menu"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarmain">
                        <ul className="navbar-nav ml-auto">
                            <li className={`nav-item ${isActive('/')}`}>
                                <Link className="nav-link" href="/">Home</Link>
                            </li>
                            <li className={`nav-item ${isActive('/about')}`}>
                                <Link className="nav-link" href="/about">About</Link>
                            </li>
                            <li className={`nav-item ${isActive('/service')}`}>
                                <Link className="nav-link" href="/service">Services</Link>
                            </li>

                            <li className={`nav-item dropdown ${pathname?.startsWith('/department') ? 'active' : ''}`}>
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="/department"
                                    id="dropdown02"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Department <i className="icofont-thin-down"></i>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="dropdown02">
                                    <li><Link className="dropdown-item" href="/department">All Departments</Link></li>
                                    {specialityList?.data?.map((dept) => (
                                        <li key={dept._id}>
                                            <Link 
                                                className="dropdown-item" 
                                                href={`/department/${dept._id}`}
                                            >
                                                {dept.department}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className={`nav-item dropdown ${pathname?.startsWith('/doctors') ? 'active' : ''}`}>
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="/doctor"
                                    id="dropdown03"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Doctors <i className="icofont-thin-down"></i>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="dropdown03">
                                    <li><Link className="dropdown-item" href="/doctors">Doctors</Link></li>
                                    {/* <li><Link className="dropdown-item" href="/doctor-single">Doctor Single</Link></li> */}
                                    <li><Link className="dropdown-item" href="/appointment">Appointment</Link></li>
                                    <li><Link className="dropdown-item" href="/doctor-login">Login as Doctor</Link></li>
                                    {/* <li className="dropdown dropdown-submenu dropleft">
                                        <Link
                                            className="dropdown-item dropdown-toggle"
                                            href="#!"
                                            id="dropdown0501"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Sub Menu
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="dropdown0501">
                                            <li><Link className="dropdown-item" href="/">Submenu 01</Link></li>
                                            <li><Link className="dropdown-item" href="/">Submenu 02</Link></li>
                                        </ul>
                                    </li> */}
                                </ul>
                            </li>

                            {/* <li className={`nav-item dropdown ${pathname?.startsWith('/blog') ? 'active' : ''}`}>
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="/blog-sidebar"
                                    id="dropdown05"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Blog <i className="icofont-thin-down"></i>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="dropdown05">
                                    <li><Link className="dropdown-item" href="/blog-sidebar">Blog with Sidebar</Link></li>
                                    <li><Link className="dropdown-item" href="/blog-single">Blog Single</Link></li>
                                </ul>
                            </li> */}

                            
                            {/* <li className={`nav-item dropdown ${pathname?.startsWith('/patient-login') ? 'active' : ''}`}>
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="/user-login"
                                    id="dropdown02"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Login <i className="icofont-thin-down"></i>
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="dropdown02">
                                <li><Link className="dropdown-item" href="/user-login">Patient Login</Link></li>
                                <li><Link className="dropdown-item" href="/doctor-login">Doctor Login</Link></li>
                                    <li><Link className="dropdown-item" href="/patient-register">Register</Link></li>
                                </ul>
                            </li> */}
                            <li className={`nav-item ${isActive('/doctor-register')}`}>
                                <Link className="nav-link" href="/doctor-register">Career</Link>
                            </li>

                            {userName && (
                                <li className="nav-item">
                                    <span className="nav-link" style={{ color: '#223a66' }}>
                                       {userName}
                                    </span>
                                </li>
                            )}

                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="avatarDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <Image
                                        src="/images/defaultProfile/social-media-logo.png"
                                        alt="Profile"
                                        width={40}
                                        height={40}
                                        style={{ 
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            marginTop: '-8px',
                                            border: '2px solid #223a66'
                                        }}
                                    />
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="avatarDropdown">
                                    {!isLoggedIn ? (
                                        <li className="dropdown dropdown-submenu dropright">
                                            <Link
                                                className="dropdown-item dropdown-toggle"
                                                href="#!"
                                                id="dropdown0501"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                Login as
                                            </Link>
                                            <ul className="dropdown-menu" aria-labelledby="dropdown0501">
                                                <li><Link className="dropdown-item" href="/user-login">Patient</Link></li>
                                                <li><Link className="dropdown-item" href="/doctor-login">Doctor</Link></li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li>
                                            <button 
                                                className="dropdown-item" 
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    )}
                                    {isLoggedIn && (
                                        <li><Link className="dropdown-item" href="/patient-dashboard">Dashboard</Link></li>
                                    )}
                                    <li><hr className="dropdown-divider" /></li>
                                    {!isLoggedIn && (
                                        <li><Link className="dropdown-item" href="/patient-register">User Register</Link></li>
                                    )}
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
