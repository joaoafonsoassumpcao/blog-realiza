import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//jimport Link from '@mui/material/Link';
//import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { AuthContext } from "../context/authContext";
import { useContext } from "react";

const Login = () => {
  const [inputs, setInputs] = React.useState({
    email: "",
    password: "",
  });

  const [err, setError] = React.useState("");

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ paddingTop: 10 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primay.main" }}>
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
            value={inputs.email}
            onChange={handleChange}
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
            value={inputs.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              color: "#fff",
              bgcolor: "pallete.primary.main",
              "&:hover": { backgroundColor: "pallete.primary.dark" },
            }}
          >
            Entrar
          </Button>
          {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  "Não tem uma conta? Cadastre-se"
                </Link>
              </Grid>
            </Grid> */}
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
