import Head from 'next/head';
import { useRouter } from 'next/router';
import 'react-tabs/style/react-tabs.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminLayout from '../layouts/admin';
import MerchantLayout from '../layouts/merchant';
import MarketLayout from '../layouts/market';

import { useEffect } from 'react';
import Loader from '../components/Loader';
import TopBarProgress from "react-topbar-progress-indicator";
import { usePromiseTracker } from "react-promise-tracker";

function MyApp({ Component, pageProps }) {

    const route = useRouter();
    
    return <>
        <Head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <title>Doctor On Call</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* favicon
                ============================================ */}
            <link rel="shortcut icon" type="image/x-icon" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/img/favicon.ico`} />
            {/*  Google Fonts
                ============================================  */}
            <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700,900" rel="stylesheet" />
            {/* CSS PLUGINS */}

            {/*  Bootstrap CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/bootstrap.min.css`} />
            {/*  Bootstrap CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/font-awesome.min.css`} />
            {/*  jiran Icon CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/jiran-icon.css`} />
            {/*  owl.carousel CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/owl/carousel.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/owl/theme.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/owl/transitions.css`} />
            {/*  animate CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/animate.css`} />
            {/*  normalize CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/normalize.css`} />
            {/*  meanmenu icon CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/meanmenu.min.css`} />
            {/*  main CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/main.css`} />
            {/*  morrisjs CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/morrisjs/morris.css`} />
            {/*  mCustomScrollbar CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/scrollbar/jquery.mCustomScrollbar.min.css`} />
            {/*  metisMenu CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/metisMenu/metisMenu.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/metisMenu/metisMenu-vertical.css`} />
            {/*  calendar CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/calendar/fullcalendar.min.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/calendar/fullcalendar.print.min.css`} />
            {/*  style CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/style.css`} />
            {/*  responsive CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/responsive.css`} />
            {/*  toggle CSS
                ============================================  */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/toggle.css`} />

            {/* JS PLUGINS */}

            {/*  modernizr JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/vendor/modernizr-2.8.3.min.js`}></script>
            {/*  jquery
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/vendor/jquery-1.12.4.min.js`}></script>
            {/*  bootstrap JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/bootstrap.bundle.min.js`}></script>
            {/*  wow JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/wow.min.js`}></script>
            {/*  price-slider JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/jquery-price-slider.js`}></script>
            {/*  meanmenu JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/jquery.meanmenu.js`}></script>
            {/*  owl.carousel JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/owl.carousel.min.js`}></script>
            {/*  sticky JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/jquery.sticky.js`}></script>
            {/*  scrollUp JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/jquery.scrollUp.min.js`}></script>
            {/*  mCustomScrollbar JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/scrollbar/jquery.mCustomScrollbar.concat.min.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/scrollbar/mCustomScrollbar-active.js`}></script>
            {/*  metisMenu JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/metisMenu/metisMenu.min.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/metisMenu/metisMenu-active.js`}></script>
            {/*  morrisjs JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/sparkline/jquery.sparkline.min.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/sparkline/jquery.charts-sparkline.js`}></script>
            {/*  calendar JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/calendar/moment.min.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/calendar/fullcalendar.min.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/calendar/fullcalendar-active.js`}></script>
            {/*  float JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/flot/jquery.flot.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/flot/jquery.flot.resize.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/flot/jquery.flot.pie.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/flot/jquery.flot.tooltip.min.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/flot/jquery.flot.orderBars.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/flot/curvedLines.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/flot/flot-active.js`}></script>
            {/*  plugins JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/plugins.js`}></script>
            {/*  main JS
                ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/main.js`}></script>


        </Head>

        <TopBar />
        {route ?
            route.pathname.startsWith("/admin/") ?
                <AdminLayout>
                    <Component {...pageProps} />
                </AdminLayout>

                : (route.pathname.startsWith("/merchant/") && !route.pathname.startsWith("/merchant/register") && !route.pathname.startsWith("/merchant/verify")) ?
                    <MerchantLayout>
                        <Component {...pageProps} />
                    </MerchantLayout>

                : (route.pathname.startsWith("/marketplace") && !route.pathname.startsWith("/marketplace/register") && !route.pathname.startsWith("/marketplace/verify")) ?

                    <MarketLayout>
                        <Component {...pageProps} />
                    </MarketLayout>

                :

                <div style={{ minHeight: '87vh' }}>
                    <Component {...pageProps} />
                </div>
            : null
        }
        <ToastContainer />
    </>
}

TopBarProgress.config({
    barColors: {
        "0": "#03a9f4",
        "1.0": "#03a9f4"
    },
    barThickness: 5
});

function TopBar() {
    const { promiseInProgress } = usePromiseTracker();
    return <>{promiseInProgress && <>< TopBarProgress /> <Loader /></>}</>
}

export default MyApp