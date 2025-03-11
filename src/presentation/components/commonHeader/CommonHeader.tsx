import {Link, NavLink, useNavigate} from "react-router-dom";
import LogoBlueCore from "../../../data/images/BlueCoreImages/logo-completo.png";
import { useState } from "react";
import "./StyleCommonHeader.css"
const CommonHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    // NAO ESQUEÇA DE AJUSTAR A ROTA PELO AMOR DE DEUS
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/buscar?query=${searchTerm}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (
        <nav className="navbar navbar-expand-md shadow-sm px-5 d-flex justify-content-between mb-2">
            <div className="container">
                {/* header pc */}
                <div className="d-none d-md-flex justify-content-between w-100 align-items-center" >
                    <Link to="/">
                        <img
                            alt="Logo"
                            src={LogoBlueCore}
                            className="navbar-brand img-fluid"
                            style={{ height: '100%', width: 'auto', objectFit: 'contain', maxWidth: '225px' }}
                        />
                    </Link>
                    <div className="d-flex col-md-3 col-lg-5">
                        <div className="w-100" style={{ position: 'relative', color: "var(--azul-principal)" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{ paddingLeft: '30px', border: "var(--azul-principal) solid 1px" }}
                            />
                            <i
                                className="ri-search-eye-line fw-semibold"
                                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            />
                            <button
                                onClick={handleSearch}
                                className="fw-semibold"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'var(--azul-principal)',
                                }}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                    <ul className="navbar-nav fs-5 navbar-nav-scroll gap-2 align-items-center">
                        <li className="nav-item me-md-4 ">
                            <a className="header-link fw-bold" href="/register/client">Cadastre-se </a>
                            <br/> <span className="fs-6">ou</span> <a className="header-link fw-bold" href="/perfil">Login</a>
                        </li>
                        <li className="nav-item ">
                            <NavLink className=" m-2 nav-link align-content-center align-middle fw-bold perfil" to="/perfil"><i className=" icone ri-user-3-line"/></NavLink>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link rounded p-2 fw-bold perfil"><i className="ri-shopping-cart-line"/></button>
                        </li>
                    </ul>
                </div>

                {/* header celular */}
                <div className="d-flex d-md-none justify-content-between w-100 align-items-center">
                    <Link to="/">
                        <img
                            alt="Logo"
                            src={LogoBlueCore}
                            className="navbar-brand img-fluid"
                            style={{ height: '100%', width: 'auto', objectFit: 'contain', maxWidth: '225px' }}
                        />
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
                        <span className="ri-menu-3-fill" />
                    </button>
                </div>

                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarScroll">
                    <div className="d-block d-md-none my-2">
                        <div className="w-100" style={{ position: 'relative', color: "var(--azul-principal)" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                style={{ paddingLeft: '30px', border: "var(--azul-principal) solid 1px" }}
                            />
                            <i
                                className="ri-search-eye-line fw-semibold"
                                style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
                            />
                            <button
                                onClick={handleSearch}
                                className="fw-semibold"
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'var(--azul-principal)',
                                }}
                            >
                                Buscar
                            </button>
                        </div>                    </div>
                    <ul className="navbar-nav fs-5 navbar-nav-scroll gap-2 align-items-center d-md-none">
                        <li className="nav-item">
                            <NavLink className="nav-link rounded p-2 fw-semibold" to="/register">Cadastrar</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link rounded p-2 fw-bold" to="/perfil">Minha Conta</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link rounded p-2 fw-bold" to="/cart"><i className="ri-shopping-cart-line"/> Carrinho</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default CommonHeader;