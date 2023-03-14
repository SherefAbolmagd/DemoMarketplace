import Head from 'next/head';
import MarketHeader from '../components/MarketHeader';
import Footer from '../components/Footer';

export default function market({children}) {
    return <>
        <Head>
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/marketplace/animate.css`} />
            {/* <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH||""}/css/marketplace/bootstrap.min.css`} /> */}
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/marketplace/prettyPhoto.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/marketplace/price-range.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/marketplace/main.css`} />
            <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/css/marketplace/responsive.css`} />

            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/marketplace/jquery.prettyPhoto.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/marketplace/jquery.scrollUp.min.js`}></script>
            {/* <script src={`${process.env.NEXT_PUBLIC_BASEPATH||""}/js/marketplace/bootstrap.min.js`}></script> */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/marketplace/price-range.js`}></script>
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/marketplace/main.js`}></script>
            {/*  tab JS
            ============================================  */}
            <script src={`${process.env.NEXT_PUBLIC_BASEPATH || ""}/js/tab.js`}></script>
        </Head>

        <div>
            {/*  Header Component  */}
            <MarketHeader />

            {/*  Pages  */}
            <div style={{ minHeight: '87vh', paddingBottom: 30 }}>
                { children }
            </div>

            {/*  Footer Component  */}
            <Footer />

        </div>
    </>
}