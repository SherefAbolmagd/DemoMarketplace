import basepath from "./basepath";

export default function Footer() {
    return <div className="footer-copyright-area">
        {/* <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div className="footer-copy-right">
                        <p>Copyright © 2021 <a href="https://www.doctoroncall.com.my/">DoctorOnCall</a> All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div> */}
        <div>
            <footer className="container-fluid footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-6 first-footer">
                            <a href="https://www.doctoroncall.com.my">
                                <img src={basepath("/img/logo/logo.png")} className="img-fluid footer-logo" alt="" />
                            </a>
                            <p>DoctorOnCall is Malaysia's first and largest digital healthcare platform, bringing easier and
                                more affordable access to medicines through our online pharmacy. We provide digital health
                                services including our Online Pharmacy and Video Consultations. With the best prices, quick
                                service and ease of use, taking care of your health just became a lot easier with DoctorOnCall.
                            </p><br /><svg className="footer-readmore-arrow" viewBox="0 0 50 50">
                                <path
                                    d="M 38.035156 13.988281 C 37.628906 13.980469 37.257813 14.222656 37.09375 14.59375 C 36.933594 14.96875 37.015625 15.402344 37.300781 15.691406 L 45.277344 24 L 2.023438 24 C 1.664063 23.996094 1.328125 24.183594 1.148438 24.496094 C 0.964844 24.808594 0.964844 25.191406 1.148438 25.503906 C 1.328125 25.816406 1.664063 26.003906 2.023438 26 L 45.277344 26 L 37.300781 34.308594 C 36.917969 34.707031 36.933594 35.339844 37.332031 35.722656 C 37.730469 36.105469 38.363281 36.09375 38.746094 35.691406 L 49.011719 25 L 38.746094 14.308594 C 38.5625 14.109375 38.304688 13.996094 38.035156 13.988281 Z ">
                                </path>
                            </svg> <a className="footer-readmore-link" href="https://www.doctoroncall.com.my">Read More</a>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6 first-footer">
                            <h3>Our Services</h3>
                            <div className="footer-content">
                                <a href="/medicine/">Online Pharmacy</a>
                                <a href="/online-doctor">Consult A Doctor</a>
                                <a href="/tanya/en">Ask a Question</a>
                                <a href="/penyakit-a-z">Read Health Articles</a>
                                <a href="/find-doctor">Search Hospitals</a>
                                <a href="/find-doctor">Search Doctors</a>
                                <a href="/find-doctor">Specialist Hospital</a>
                                <a href="/tanya/en">Ask Doctor</a>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-6 first-footer">
                            <h3>DoctorOnCall</h3>
                            <div className="footer-content">
                                <a href="/about-us">About Us</a>
                                <a href={basepath("/doc/policy")}>Privacy </a>
                                <a href="/faq">FAQ </a>
                                <a href="mailto:contact@doctoroncall.com.my">Contact Us</a>
                                <a href={basepath("/doc/terms")}>Terms of Use</a>
                                <a href="/doctor#/signin">Doctors Login </a>
                                <a href="/media">Media </a>
                                <a href="/medicine/dispensation-policy">Dispensation Policy</a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 first-footer">
                            <h3>Reach Us</h3>
                            <div className="footer-content">
                                <a href="mailto:contact@doctoroncall.com.my" target="_top">contact@doctoroncall.com.my</a>
                                <div className="footer-social-media">
                                    <h3>Social Media</h3>
                                    <a target="_blank" href="https://www.facebook.com/doctoroncallMY/">
                                        <svg viewBox="0 0 172 172">
                                            <path d="M0,172v-172h172v172z" fill="none"></path>
                                            <g fill="#333">
                                                <path
                                                    d="M141.04,13.76h-110.08c-9.4944,0 -17.2,7.7056 -17.2,17.2v110.08c0,9.4944 7.7056,17.2 17.2,17.2h110.08c9.4944,0 17.2,-7.7056 17.2,-17.2v-110.08c0,-9.4944 -7.7056,-17.2 -17.2,-17.2zM127.28,65.36h-6.88c-7.3616,0 -10.32,1.72 -10.32,6.88v10.32h17.2l-3.44,17.2h-13.76v51.6h-17.2v-51.6h-13.76v-17.2h13.76v-10.32c0,-13.76 6.88,-24.08 20.64,-24.08c9.976,0 13.76,3.44 13.76,3.44z">
                                                </path>
                                            </g>
                                        </svg></a><a target="_blank" href="https://www.instagram.com/doctoroncallmy/"><svg
                                            viewBox="0 0 50 50">
                                            <path fill="#333"
                                                d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z">
                                            </path>
                                        </svg></a><a target="_blank" href="https://twitter.com/doctoroncallmy"><svg
                                            viewBox="0 0 172 172">
                                            <path d="M0,172v-172h172v172z" fill="none"></path>
                                            <g fill="#333">
                                                <path
                                                    d="M172.215,35.905c-6.35594,2.82188 -13.16875,4.71656 -20.33094,5.57656c7.31,-4.38063 12.92687,-11.31438 15.56062,-19.565c-6.82625,4.04469 -14.41844,6.9875 -22.4675,8.57312c-6.45,-6.88 -15.64125,-11.16656 -25.81344,-11.16656c-19.53812,0 -35.38094,15.82937 -35.38094,35.3675c0,2.76812 0.3225,5.46906 0.92719,8.0625c-29.40125,-1.47813 -55.45656,-15.56063 -72.91187,-36.96656c-3.05031,5.24062 -4.78375,11.31437 -4.78375,17.79125c0,12.26844 6.235,23.09906 15.73531,29.455c-5.805,-0.18813 -11.26062,-1.78719 -16.03094,-4.43438c0,0.14781 0,0.29563 0,0.44344c0,17.14625 12.20125,31.43031 28.36656,34.69562c-2.95625,0.80625 -6.08719,1.23625 -9.31219,1.23625c-2.28438,0 -4.50156,-0.215 -6.665,-0.645c4.515,14.04219 17.57625,24.295 33.04281,24.57719c-12.09375,9.48688 -27.34531,15.13063 -43.92719,15.13063c-2.86219,0 -5.67062,-0.16125 -8.42531,-0.49719c15.64125,10.05125 34.23875,15.89656 54.22031,15.89656c65.06438,0 100.64688,-53.89781 100.64688,-100.63344c0,-1.53187 -0.04031,-3.07719 -0.09406,-4.58219c6.90687,-4.98531 12.9,-11.22031 17.64344,-18.31531z">
                                                </path>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container footer-sitemap">
                    <div className="footer-sitemap-title">
                        <h2>Sitemap</h2>
                    </div>
                    <div className="container">
                        <div className="footer-tabs">
                            <input type="radio" name="tabs" id="tab-english" checked="" />
                            <label
                                for="tab-english">English</label>
                            <div className="footer-tab">
                                <a href="/womens-health">Women's Health</a>
                                <a href="/general-health">General Health</a>
                                <a href="/mens-health">Men's Health</a>
                                <a href="/sexual-health">Sexual Health</a>
                            </div>
                            <input type="radio" name="tabs" id="tab-bahasa" />
                            <label for="tab-bahasa">Bahasa</label>
                            <div className="footer-tab">
                                <a href="/kesihatan-wanita">Kesihatan Wanita</a>
                                <a href="/kesihatan">Kesihatan Umum</a>
                                <a href="/kesihatan-lelaki">Kesihatan Lelaki</a>
                                <a href="/kesihatan-seksual">Kesihatan Seksual</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>

}