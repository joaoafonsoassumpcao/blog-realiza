import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
    const [inputs, setInputs] = React.useState({
        "nome": "",
        "email": "",
        "password": ""
    });



    const [err, setError] = React.useState("");

    const navigate = useNavigate()


    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/register", inputs);
            navigate("/login");

        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
    <div className="auth">
        <h1>Registre-se</h1>
        <form>
            <input required type="text" name="nome" placeholder="Nome"  onChange={handleChange}/>
            <input required type="email" name="email" placeholder="Email" onChange={handleChange}/>
            <input required type="password" name="password" placeholder="Password" onChange={handleChange}/>
            <button className="login-btn" onClick={handleSubmit}>Registre-se</button>
            {err && <p>{err}</p>}
            <span>Já tem uma conta? <Link to='/login'>Faça login</Link></span>
        </form>
    </div>
    );
}
export default Register;