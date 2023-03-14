import MerchantHeader from '../components/MerchantHeader';
import MerchantSidebar from '../components/MerchantSidebar';
import Footer from '../components/Footer';

export default function merchant({children}) {
        return <div>
            {/* Sidebar Component */}
            <MerchantSidebar />

            <div className="all-content-wrapper">

                {/*  Header Component  */}
                <MerchantHeader />

                {/*  Pages  */}
                <div className="content-area">
                    {children}
                </div>

                {/*  Footer Component  */}
                <Footer />
            </div>
        </div>
}