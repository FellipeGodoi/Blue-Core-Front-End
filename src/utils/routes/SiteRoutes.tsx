import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ClientAdminPage from "../../presentation/pages/adminPages/clientsAdminPage/ClientAdminPage.tsx";
import AdminHeader from "../../presentation/components/adminHeader/AdminHeader.tsx";
import CommonHeader from "../../presentation/components/commonHeader/CommonHeader.tsx";
import Footer from "../../presentation/components/commonFooter/Footer.tsx";
import ClientRegisterPage from "../../presentation/pages/registerPage/ClientRegisterPage.tsx";
import UserProfilePage from "../../presentation/pages/userProfilePage/UserProfilePage.tsx";
import UserHomePage from "../../presentation/pages/userHomePage/UserHomePage.tsx";
import ProductPage from "../../presentation/pages/productPage/ProductPage.tsx";
import OrderAdminPage from "../../presentation/pages/adminPages/orderAdminPage/OrderAdminPage.tsx";

//
//
// // ---------------- ROTAS DA LOJA  ---------------------
//
function StoreRoutes () {
    return(
        <>
            <CommonHeader/>
            <section style={{ minHeight: "80vh" }}>
                <Routes>
                    <Route path="/" element={<UserHomePage/>}/>
                    <Route path="/produto/:code" element={<ProductPage/>}/>
                </Routes>
            </section>
            <Footer/>
        </>

    )
}

// // ---------------- ROTAS DAS PAGINAS DE REGISTRO INICIAL  ---------------------
function RegisterRoutes () {
    return(
        <>
            <CommonHeader/>
            <section style={{ minHeight: "70vh", alignContent: "center" }}>
                <Routes>
                    <Route path="/client" element={<ClientRegisterPage/>}/>
                </Routes>
            </section>
            <Footer/>
        </>

    )
}

// // ---------------- ROTAS DO ADMIN  ---------------------
function AdminRoutes () {
    return(
        <>
            <AdminHeader/>
            <Routes>
                <Route path="/clients" element={<ClientAdminPage/>}/>
                <Route path="/orders" element={<OrderAdminPage/>}/>
            </Routes>
        </>
    )
}

// // ---------------- ROTAS DO PERFIL DO CLIENTE  ---------------------
function UserRoutes () {
    return(
        <>
            <CommonHeader/>
            <section style={{ minHeight: "50vh", alignContent: "center" }}>
                <Routes>
                    <Route path=":cpfUrl" element={<UserProfilePage/>}/>
                </Routes>
            </section>
            <Footer/>
        </>
    )
}



// // ---------------- GERENCIADOR DE ROTAS  ---------------------
function AllRoutes () {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<StoreRoutes/>}/>
                <Route path="register/*" element={<RegisterRoutes/>}/>
                <Route path="perfil/*" element={<UserRoutes/>} />
                <Route path="admin/*" element={<AdminRoutes/>}/>
            </Routes>
        </Router>
    )
}

export default AllRoutes;