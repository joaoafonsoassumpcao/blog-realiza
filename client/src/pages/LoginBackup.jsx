import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";



const Login = () => {

    const [inputs, setInputs] = React.useState({
        "email": "",
        "password": ""
    });



    const [err, setError] = React.useState("");

    const navigate = useNavigate()

    const {login}  =  useContext(AuthContext)


    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await login(inputs)
            navigate("/");

        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
    <div className="auth">
        <h1>Login</h1>
        <form>
            <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password"onChange={handleChange}/>
            <button className="login-btn" onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Não tem uma conta? <Link to='/register'>Registre-se</Link></span>
        </form>
    </div>
    );
}

export default Login;