import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  ThemeProvider } from '@mui/material/styles';

import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from '../theme';



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
        console.log(inputs)
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
            Login
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Não tem uma conta? Cadastre-se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
