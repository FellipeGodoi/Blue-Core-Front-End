import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import ClientRegisterPage from "../../presentation/pages/registerPages/clientRegisterPage/ClientRegisterPage.tsx";
import ClientAdminPage from "../../presentation/pages/adminPages/clientsAdminPage/ClientAdminPage.tsx";
import AdminHeader from "../../presentation/components/adminHeader/AdminHeader.tsx";
import CommonHeader from "../../presentation/components/commonHeader/CommonHeader.tsx";
import Footer from "../../presentation/components/commonFooter/Footer.tsx";
import ClientRegisterPage from "../../presentation/pages/registerPage/ClientRegisterPage.tsx";

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
                    {/*<Route path="/" element={<UserHomePage/>}/>*/}
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
            </Routes>
        </>
    )
}

// // ---------------- ROTAS DO PERFIL DO CLIENTE  ---------------------
// function UserRoutes () {
//     return(
//         <>
//             <CommonHeader/>
//             <Routes>
//                 <Route path="/profile/:cpf" element={<UserProfilePage/>}/>
//             </Routes>
//             <CommonFooter/>
//         </>
//     )
// }
//
//
//
// // ---------------- GERENCIADOR DE ROTAS  ---------------------
function AllRoutes () {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<StoreRoutes/>}/>
                <Route path="register/*" element={<RegisterRoutes/>}/>
                {/*<Route path="perfil/*" element={<UserRoutes/>}/>*/}
                <Route path="admin/*" element={<AdminRoutes/>}/>
            </Routes>
        </Router>
    )
}

export default AllRoutes;