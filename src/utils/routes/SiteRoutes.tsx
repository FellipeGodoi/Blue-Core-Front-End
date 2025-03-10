import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import ClientRegisterPage from "../../presentation/pages/registerPages/clientRegisterPage/ClientRegisterPage.tsx";
import ClientAdminPage from "../../presentation/pages/adminPages/clientsAdminPage/ClientAdminPage.tsx";
import AdminHeader from "../../presentation/components/adminHeader/AdminHeader.tsx";
// import UserHomePage from "../../presentation/pages/userPages/UserHomePage.tsx";
// import UserProfilePage from "../../presentation/pages/userPages/UserProfilePage.tsx";
// import CommonHeader from "../../presentation/components/header/CommonHeader.tsx";
// import CommonFooter from "../../presentation/components/footer/CommonFooter.tsx";
//
//
// // ---------------- ROTAS DA LOJA  ---------------------
//
// function StoreRoutes () {
//     return(
//         <>
//             <CommonHeader/>
//             <Routes>
//                 <Route path="/" element={<UserHomePage/>}/>
//             </Routes>
//             <CommonFooter/>
//         </>
//
//     )
// }
//
// // ---------------- ROTAS DAS PAGINAS DE REGISTRO INICIAL  ---------------------
// function RegisterRoutes () {
//     return(
//         <>
//             <CommonHeader/>
//             <Routes>
//                 <Route path="/client" element={<ClientRegisterPage/>}/>
//             </Routes>
//             <CommonFooter/>
//         </>
//
//     )
// }
//
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
                {/*<Route path="/*" element={<StoreRoutes/>}/>*/}
                {/*<Route path="register/*" element={<RegisterRoutes/>}/>*/}
                {/*<Route path="perfil/*" element={<UserRoutes/>}/>*/}
                <Route path="admin/*" element={<AdminRoutes/>}/>
            </Routes>
        </Router>
    )
}

export default AllRoutes;