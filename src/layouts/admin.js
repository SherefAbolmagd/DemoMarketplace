import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

export default function admin({children}) {
        return <div>
            {/* Sidebar Component */}
            <AdminSidebar />

            <div className="all-content-wrapper">

                {/*  Header Component  */}
                <AdminHeader />

                {/*  Pages  */}
                <div className="content-area">
                    {children}
                </div>
            </div>
        </div>
}