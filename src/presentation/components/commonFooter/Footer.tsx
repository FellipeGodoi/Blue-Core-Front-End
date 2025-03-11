import "./StyleCommonFooter.css";
import LogoBlueCore from "../../../data/images/BlueCoreImages/logo-completo.png";
import LogoSelo from "../../../data/images/BlueCoreImages/logo-selo.png";

const Footer = () => {
    return (
        <div className="pt-1 footer-border">
            <footer className=" bg-white footer  ">
                <div className="container d-flex py-5">
                    <div className="footer-divider d-flex row col-4 gap-2">
                        <div className="mb-4">
                            <img
                                alt="Logo"
                                src={LogoBlueCore}
                                className="navbar-brand img-fluid"
                                style={{height: '100%', width: 'auto', objectFit: 'contain', maxWidth: '250px'}}
                            />
                        </div>
                        <div>
                            <span className="fw-bold fs-5">Processadores</span>
                            <ul>
                                <li className="list-unstyled"><a className="footer-link fw-semibold" href="#">AMD</a></li>
                                <li className="list-unstyled"><a className="footer-link fw-semibold" href="#">Intel</a></li>
                            </ul>
                        </div>
                        <div>
                            <span className="fw-bold fs-5">Suporte</span>
                            <ul>
                                <li className="list-unstyled"> <a className="footer-link fw-semibold" href="#">Atendimento ao cliente </a></li>
                                <li className="list-unstyled"> <a className="footer-link fw-semibold" href="#">Devolução</a></li>
                                <li className="list-unstyled"> <a className="footer-link fw-semibold" href="#">Ajuda da inteligencia artificial</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-divider d-flex justify-content-center col-4 gap-2">
                        <img
                            alt="Logo"
                            src={LogoSelo}
                            className="navbar-brand img-fluid"
                            style={{height: '100%', width: 'auto', objectFit: 'contain', maxWidth: '350px'}}
                        />
                    </div>
                    <div className="footer-divider col-4 gap-2  d-flex align-items-center">
                        <p className="footer-text fw-medium fs-6">
                            O pássaro escolhido como símbolo da empresa por se tratar de uma criatura inteligente
                            com diversas habilidades voltadas para um objetivo, sua sobrevivência, assim como
                            utilizamos do máximo de conhecimento possível para atender nossos clientes com o
                            objetivo de suprirmos todas suas duvidas juntamente com um bom atendimento.
                        </p>
                    </div>
                </div>
            </footer>
            <div className="d-flex justify-content-center ">
                <span className="text-white fw-semibold">
                    BlueCore &copy; 2025
                </span>
            </div>
        </div>
    )
}

export default Footer;