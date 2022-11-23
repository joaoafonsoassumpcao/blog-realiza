import React from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';
import { theme } from '../theme';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';


import axios from "axios";
import { HOST } from "../config"


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
            await axios.post(`${HOST}/api/register`, inputs);
            alert("Usuário cirado com sucesso"); 
            navigate("/login");
        } catch (err) {
            setError(err.response.data.message);
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{paddingTop: 10}}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                        <Avatar sx={{ m: 1, bgcolor: 'primay.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Cadastre-se
                        </Typography>
                
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                            autoComplete="nome"
                            autoFocus
                            onChange = {handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange = {handleChange}   
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange = {handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, color: "#fff", bgcolor: "pallete.primary.main", "&:hover": {backgroundColor: "pallete.primary.dark"}}}
                            onClick = {handleSubmit}
                        >
                            Cadastrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
export default Register;