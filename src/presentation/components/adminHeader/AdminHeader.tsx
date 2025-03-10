import {NavLink} from "react-router-dom";
import LogoBlueCore from "../../../data/images/BlueCoreImages/logo-completo.png";
import "./StyleAdminHeader.css"


export default function AdminHeader() {
    return (
        <>
            <nav className="navbar-header navbar navbar-expand-md shadow-sm px-5 d-flex justify-content-between mb-3">
                <div className="container">
                    <div className=" px-5 d-flex justify-content-between w-100">
                        <img
                            alt=""
                            src={LogoBlueCore}
                            className="navbar-brand img-fluid"
                            style={{height: '100%', width: 'auto', objectFit: 'contain', maxWidth: '225px'}}
                        />

                        <button className="navbar-toggler" type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="ri-menu-3-fill"/>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarScroll">
                        <ul className="navbar-nav fs-5 navbar-nav-scroll gap-2 align-items-center">
                            <li className="nav-link" aria-current="page">
                                <NavLink className="nav-link-font rounded p-2 fw-semibold" to="/admin/clients">Clientes</NavLink>
                            </li>
                            <li className="nav-link" aria-current="page">
                                <NavLink className="nav-link-font rounded p-2 fw-bold" to="/admin/orders">Pedidos</NavLink>
                            </li>
                            <li className="nav-link" aria-current="page">
                                <NavLink className="nav-link-font rounded p-2 fw-bold" to="/admin/products">Produtos</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}