import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "../api/Market";
import Event from "../api/Event";
import basepath, { navigate } from "./basepath";
import qs from 'querystring';

export default function Headers() {
    const router = useRouter();
    const [cart, setCart] = useState({ count: 0 });
    const [keyword, setKeyword] = useState("");

    useEffect(async () => {
        if (await api.checkAuth()) getCartCount();
    }, []);

    useEffect(() => {
        setKeyword(router.query.search);
    }, [router])

    const getCartCount = async () => {
        try {
            const res = await api.getCartCount({ is_business: false });
            setCart(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    const logout = () => {
        api.logout();
        navigate.push(basepath(`/`))
    }

    Event.on("failed_auth", () => {
        navigate.replace(basepath("/"));
    });

    Event.on("update_cart", () => {
        getCartCount();
    });

    const searchHandler = (event) => {
        setKeyword(event.target.value)
    }

    const onSubmit = (event) => {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();

            if( router.pathname == "/marketplace" || router.pathname.startsWith("/marketplace/categories")){
                const query = qs.parse(window.location.search.replace("?",""));
                query.search = keyword;
                query.page = 1;
                window.location.search = qs.stringify(query);
            }
            else
                navigate.push(`/marketplace?search=${keyword}`);

            Event.emit("search", keyword);
        }
    }

    return (
        <>
            {/*  Mobile View  */}
            <div className="border-bottom d-md-none d-block">
                <div className="container header-container">
                    <div className="d-flex align-items-center w-100 header-menu">
                        <div className="logo d-flex align-items-center justify-content-evenly me-md-5 me-2">
                            <a
                                className="me-md-3"
                                href={basepath("/marketplace")}
                            >
                                <img
                                    className="img-fluid float-start"
                                    src={basepath("/img/logo/logo.png")}
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-bottom">
                <div className="container header-container">
                    <div className="d-flex align-items-center w-100 header-menu">
                        {/*  Web View  */}
                        <div className="col-md-2 d-none d-md-block">
                            <div className="logo d-flex align-items-center justify-content-evenly me-md-5 me-2">
                                <a
                                    className="me-md-3"
                                    href={basepath("/marketplace")}
                                >
                                    <img
                                        className="img-fluid float-start"
                                        src={basepath("/img/logo/logo.png")}
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="search_box d-flex align-items-center">
                                <a href={basepath(`/marketplace?search=${keyword}`)}><i className="fa fa-search search"></i></a>
                                {/*  Web View  */}
                                <input
                                    type="text"
                                    name="search"
                                    value={keyword}
                                    placeholder="Search medicine and health screening packages"
                                    onChange={searchHandler}
                                    onKeyUp={onSubmit}
                                    className="d-none d-md-block"
                                />
                                {/*  Mobile View  */}
                                <input
                                    type="text"
                                    name="search"
                                    value={keyword}
                                    placeholder="Search"
                                    onChange={searchHandler}
                                    onKeyUp={onSubmit}
                                    className="d-block d-md-none"
                                />
                            </div>
                        </div>

                        <div className="col-md-4 d-flex justify-content-between justify-content-md-evenly align-items-center ps-md-5 ps-1">
                            <a
                                className="text-dark position-relative text-center mx-1"
                                href={basepath("/marketplace/cart")}
                            >
                                {cart.count > 0 && (
                                    <span className="badge bg-danger header-badge d-flex align-items-center justify-content-center">
                                        {cart.count}
                                    </span>
                                )}
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/cart.svg")}
                                        alt="Cart"
                                    />
                                    <p className="header-label text-center">Cart</p>
                                </div>
                            </a>

                            <a
                                className="text-dark mx-1"
                                href={basepath("/marketplace/order")}
                            >
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/medicine.svg")}
                                        alt="Order"
                                    />
                                    <p className="header-label text-center">
                                        Order
                                    </p>
                                </div>
                            </a>
                            <a
                                className="text-dark mx-1 cursor"
                                href={basepath("/marketplace/profile")}
                                // onClick={logout}
                            >
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/user.svg")}
                                        alt="Dashboard"
                                    />
                                    <p className="header-label text-center">
                                        Profile
                                    </p>
                                </div>
                            </a>
                            {/* <a
                                className="text-dark mx-1 cursor"
                                onClick={logout}
                            >
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <img
                                        className="header-icon"
                                        src={basepath("/img/icon/user.svg")}
                                        alt="Logout"
                                    />
                                    <p className="header-label text-center">
                                        Logout
                                    </p>
                                </div>
                            </a> */}
                        </div>
                    </div>
                </div>

                {/*  Mobile Menu start  */}
                <div className="mobile-menu-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="mobile-menu"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  Mobile Menu end  */}
            </div>

            {/*  Web View  */}
            {/* <div className="header-container d-none d-md-block">
                <div className="subheader-wrapping">
                    <div className="subheader">
                        <div className="container">
                            <div className="subheader-main-keys-wrap">
                                <div className="subheader-main-keys" onClick={() => tabChangehandler(1)}>
                                    <p className="subheader-heading">online pharmacy</p>
                                    <svg class="header-more-icon" viewBox="0 0 50 50">
                                        <path d="M 4.84375 12.90625 L 2.75 15 L 25 37.25 L 47.25 15 L 45.15625 12.90625 L 25 33.0625 Z "></path>
                                    </svg>
                                    <div className={`indi-subs ${visibleTab == 1 ? "" : "d-none"}`}>
                                        <div class="container xs-force-no-contain">
                                            <div class="header-hide">
                                                <div class="container xs-force-no-contain">
                                                    <div class="inner-container">
                                                        <div class="links">
                                                            <ul>
                                                                <li><a href="/medicine">Pharmacy</a></li>
                                                                <li><a href="/medicine/en/drugs">Medicine</a></li>
                                                                <li><a href="/medicine/en/supplements">Wellness &amp; Lifestyles</a></li>
                                                                <li><a href="/medicine/en/hygiene">Personal Care</a></li>
                                                                <li><a href="/medicine/en/health-food-drinks">Health Food &amp; Drinks</a></li>
                                                                <li><a href="/medicine/en/all-devices">Health care Devices</a></li>
                                                            </ul>
                                                        </div>
                                                        <div class="imgUsp">
                                                            <a href="/medicine/coronavirus-covid-19-test-kit">
                                                                <img src="https://doc-cdn.s3-ap-southeast-1.amazonaws.com/medicine/v2/covid-test.svg" alt="" />
                                                                <div class="details-subheader">
                                                                    <p class="heading-header">Find COVID Test</p>
                                                                    <p class="subheading-header">Book a slot to get tested in the comfort of your car, at the clinic or at home</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="imgUsp">
                                                            <a href="/health-screening">
                                                                <svg class="health-screening-amp-svg" xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62">
                                                                    <g transform="translate(-223 -546)">
                                                                        <rect class="a" width="62" height="62" transform="translate(223 546)"></rect>
                                                                        <g transform="translate(227.96 552.327)">
                                                                            <path class="b" d="M81.091,102.055a.745.745,0,0,1-.518-.208c-.794-.764-19.455-18.8-19.455-26.708a11.558,11.558,0,0,1,19.972-7.924,11.558,11.558,0,0,1,19.972,7.924c0,7.906-18.66,25.944-19.455,26.708A.745.745,0,0,1,81.091,102.055ZM72.677,65.073A10.077,10.077,0,0,0,62.612,75.139c0,6.592,15.431,22.123,18.479,25.126,3.048-3,18.479-18.536,18.479-25.126a10.065,10.065,0,0,0-17.9-6.32.746.746,0,0,1-1.161,0A10.029,10.029,0,0,0,72.677,65.073Z" transform="translate(-55.119 -57.81)"></path>
                                                                            <g transform="translate(0 0)">
                                                                                <path class="c" d="M78.039,44.257A14.865,14.865,0,0,0,67,49.135,14.932,14.932,0,0,0,41.027,59.189c0,1.916.791,4.294,2.42,7.269a.747.747,0,0,0,1.31-.717c-1.484-2.711-2.236-4.916-2.236-6.552a13.439,13.439,0,0,1,23.9-8.438.746.746,0,0,0,1.161,0,13.439,13.439,0,0,1,23.9,8.438c0,1.608-.728,3.767-2.162,6.416a.747.747,0,0,0,1.313.711c1.576-2.91,2.343-5.241,2.343-7.127A14.949,14.949,0,0,0,78.039,44.257Z" transform="translate(-41.027 -44.257)"></path>
                                                                                <path class="c" d="M104.106,145.226a.747.747,0,0,0-1.048.127,205.72,205.72,0,0,1-16.169,17.836A205.71,205.71,0,0,1,70.72,145.353a.747.747,0,1,0-1.175.921,209.6,209.6,0,0,0,16.827,18.5.746.746,0,0,0,1.035,0,209.613,209.613,0,0,0,16.827-18.5A.746.746,0,0,0,104.106,145.226Z" transform="translate(-60.917 -114.963)"></path>
                                                                            </g>
                                                                            <path class="d" d="M60.909,101.62h-.068a2.231,2.231,0,0,1-2.092-1.643L56.8,92.915l-.75,3.749a2.246,2.246,0,0,1-2.2,1.8H49.03a2.24,2.24,0,1,1,0-4.479h2.99l2.238-11.192a2.24,2.24,0,0,1,4.355-.156l2.534,9.184.429-1.244a2.24,2.24,0,0,1,4.066-.373l2.141,3.782H94.689a2.24,2.24,0,1,1,0,4.479H66.477a2.244,2.244,0,0,1-1.949-1.136l-.337-.6-1.165,3.378A2.24,2.24,0,0,1,60.909,101.62ZM56.686,88.941a.747.747,0,0,1,.719.548l2.783,10.09a.747.747,0,0,0,1.425.045l1.7-4.943a.747.747,0,0,1,1.355-.125l1.153,2.037a.748.748,0,0,0,.65.379H94.688a.747.747,0,0,0,0-1.493H67.347a.747.747,0,0,1-.65-.379l-2.355-4.161a.747.747,0,0,0-1.355.124l-1.214,3.521a.737.737,0,0,1-.729.5.747.747,0,0,1-.7-.548l-3.174-11.5a.759.759,0,0,0-.747-.548.744.744,0,0,0-.705.6L53.364,94.878a.746.746,0,0,1-.732.6h-3.6a.747.747,0,1,0,0,1.493h4.826a.749.749,0,0,0,.732-.6l1.366-6.83a.746.746,0,0,1,.705-.6Z" transform="translate(-45.069 -70.023)"></path>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <div class="details-subheader">
                                                                    <p class="heading-header">Health Screening</p>
                                                                    <p class="subheading-header">Best healthcare packages in Malaysia at affordable prices tailored to your individual healthcare and wellness needs.</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subheader-main-keys" onClick={() => tabChangehandler(2)}>
                                    <p class="subheader-heading">doctor services</p>
                                    <svg class="header-more-icon" viewBox="0 0 50 50">
                                        <path d="M 4.84375 12.90625 L 2.75 15 L 25 37.25 L 47.25 15 L 45.15625 12.90625 L 25 33.0625 Z "></path>
                                    </svg>
                                    <div className={`indi-subs ${visibleTab == 2 ? "" : "d-none"}`}>
                                        <div class="container xs-force-no-contain">
                                            <div class="header-hide">
                                                <div class="container xs-force-no-contain">
                                                    <div class="inner-container">
                                                        <div class="imgUsp">
                                                            <a href="/tanya/en">
                                                                <svg class="ask-doctor-svg" xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 62 62">
                                                                    <g transform="translate(-167 -907)">
                                                                        <g transform="translate(167 907)">
                                                                            <rect class="a" width="62" height="62" transform="translate(0 0)"></rect>
                                                                        </g>
                                                                        <g transform="translate(172 912)">
                                                                            <path class="b" d="M17.14,40.358,6.885,46.6l1.76-10.716A18.135,18.135,0,0,1,2,21.822C2,10.875,11.436,2,26.423,2s24.423,8.875,24.423,19.822S41.411,41.644,26.423,41.644A32.371,32.371,0,0,1,17.14,40.358Z" transform="translate(-2 -2)"></path>
                                                                            <path class="b" d="M37.693,12a12.947,12.947,0,0,1-.577,18.848l1.157,7.388-6.739-4.3a20.345,20.345,0,0,1-6.1.887c-8.033,0-13.64-4.071-15.433-9.667h0" transform="translate(9.988 13.235)"></path>
                                                                            <line class="c" x2="26" transform="translate(11.773 13.733)"></line>
                                                                            <line class="c" x2="17" transform="translate(11.89 21.581)"></line>
                                                                        </g>
                                                                    </g>
                                                                </svg>
                                                                <div class="details-subheader">
                                                                    <p class="heading-header">Ask Doctor</p>
                                                                    <p class="subheading-header">Malaysia"s #1Health Forum. Ask any health related questions to our doctors anonymously</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="imgUsp">
                                                            <a href="/find-doctor">
                                                                <img src="https://doc-cdn.s3-ap-southeast-1.amazonaws.com/medicine/v2/book-doctor.svg" alt="" />
                                                                <div class="details-subheader">
                                                                    <p class="heading-header">Book Doctor</p>
                                                                    <p class="subheading-header">Check out our latest hospital partners and specialist services now available for online video and phone consultation!</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                        <div class="imgUsp">
                                                            <a href="/online-doctor">
                                                                <img src="https://doc-cdn.s3-ap-southeast-1.amazonaws.com/medicine/v2/consult-doctor.svg" alt="" />
                                                                <div class="details-subheader">
                                                                    <p class="heading-header">Consult Doctor</p>
                                                                    <p class="subheading-header">Consult With A Doctor Online Video Call, Audio Call or Chat Privately from RM19.99</p>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subheader-main-keys" onClick={() => tabChangehandler(3)}>
                                    <p class="subheader-heading">health centre</p>
                                    <svg class="header-more-icon" viewBox="0 0 50 50">
                                        <path d="M 4.84375 12.90625 L 2.75 15 L 25 37.25 L 47.25 15 L 45.15625 12.90625 L 25 33.0625 Z "></path>
                                    </svg>
                                    <div className={`indi-subs ${visibleTab == 3 ? "" : "d-none"}`}>
                                        <div class="container xs-force-no-contain">
                                            <div class="header-hide">
                                                <div class="container xs-force-no-contain">
                                                    <div class="inner-container">
                                                        <div class="links">
                                                            <ul>
                                                                <li><a href="/health-centre/smoking-cessation">Smoking Cessation</a></li>
                                                                <li><a href="/health-centre/vaccination">Vaccination</a></li>
                                                                <li><a href="/health-centre/heart-health">Heart Health</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="subheader-main-keys promotions">
                                    <p class="subheader-heading">promotions</p>
                                </div>
                                <div class="subheader-main-keys corporate">
                                    <p class="subheader-heading">corporate</p>
                                </div>
                                <div class="subheader-main-keys" onClick={() => tabChangehandler(4)}>
                                    <p class="subheader-heading">more</p>
                                    <svg class="header-more-icon" viewBox="0 0 50 50">
                                        <path d="M 4.84375 12.90625 L 2.75 15 L 25 37.25 L 47.25 15 L 45.15625 12.90625 L 25 33.0625 Z "></path>
                                    </svg>
                                    <div className={`indi-subs ${visibleTab == 4 ? "" : "d-none"}`}>
                                        <div class="container xs-force-no-contain">
                                            <div class="header-hide">
                                                <div class="container xs-force-no-contain">
                                                    <div class="inner-container">
                                                        <div class="links">
                                                            <ul>
                                                                <li><a href="/about-us">About Us</a></li>
                                                                <li><a href="/soalan">Health Q&amp;A</a></li>
                                                                <li><a href="/penyakit-a-z">Read Health Articles</a></li>
                                                                <li><a href="/faq">FAQ</a></li>
                                                                <li><a href="/media">Media</a></li>
                                                                <li><a href="/career">Careers</a></li>
                                                            </ul>
                                                        </div>
                                                        <div class="links">
                                                            <ul>
                                                                <li><a href="/panel-doctor">Panel Doctors</a></li>
                                                                <li><a href="/contact-us">Contact Us</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}
