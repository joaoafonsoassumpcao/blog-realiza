import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";
import { AuthContext } from "../context/authContext";


const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="container">
                <Link to="/" >
                    <div className="logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                </Link>
                <div className="links">
                    <Link className="link" to="/?category=noticias">
                        <h6>Notícias</h6>
                    </Link>
                    <Link className="link" to="/?category=concursos">
                        <h6>Concursos</h6>
                    </Link>
                    <Link className="link" to="/?category=artigos">
                        <h6>Artigos</h6>
                    </Link>
                    {/*<span>
                        {currentUser?.user.nome}
                    </span>*/}
                    {currentUser ?<span onClick={logout}>Logout</span> : <Link className="link" to="/login">Login</Link>}
                    <span className="write">
                        <Link className="link-botao" to="/write">
                            Escrever artigo
                        </Link>
                    </span>

                </div>
            </div>

        </div>
    );
}

export default Navbar;