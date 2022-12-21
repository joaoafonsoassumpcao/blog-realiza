import React, { useState, useContext } from "react";
import axiosInstance from "../utils/axios";
import { useRouter } from "next/router";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { HOST } from "../config";

const Write = () => {
  const router = useRouter();
  const { id } = router.query;

  const { currentUser } = useContext(AuthContext);

  const userid = currentUser?.id.toString();

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState(userid);
  const [resumo, setResumo] = useState("");

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);

      const { token } = parseCookies(); //localStorage.getItem("user");
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

      const res = await axiosInstance.post(`${HOST}/api/uploads`, formData);
      return res.data.url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imageUrl = await uploadImage();

    try {
      setUser(userid);
      const { token } = parseCookies();
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

      id
        ? await axiosInstance.put(`${HOST}/api/updatepost/${id}`, {
            title,
            description: value,
            category,
            user_id: user,
            image: imageUrl,
            resumo,
          })
        : await axiosInstance.post(`${HOST}/api/post`, {
            title,
            description: value,
            category,
            user_id: user,
            image: imageUrl,
            date: moment(Date.now()).format("DD/MM/YYYY"),
            resumo,
          });

      alert("Post criado com sucesso!");
      router.push("/");
    } catch (err) {
      console.log(err);
      alert("Erro ao criar post!");
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: 10 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {id ? "Editar Post" : "Criar Post"}
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Título"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="resumo"
            label="Resumo"
            name="resumo"
            autoComplete="resumo"
            autoFocus
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
          />
          <InputLabel id="category-label">Categoria</InputLabel>
          <Select
            labelId="category"
            id="category"
            value={category}
            label="Categoria"
            style={{ width: "100%" }}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value={"noticias"}>Notícias</MenuItem>
            <MenuItem value={"artigos"}>Artigos</MenuItem>
            <MenuItem value={"concursos"}>Concursos</MenuItem>
          </Select>
          {/* <TextField
            margin="normal"
            required
            fullWidth
            id="category"
            label="Categoria"
            name="category"
            autoComplete="category"
            autoFocus
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="image"
            label="Imagem"
            name="image"
            autoComplete="image"
            autoFocus
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <Box maxWidth="lg" height="700">
            <ReactQuill value={value} onChange={setValue} />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClick}
          >
            {id ? "Editar" : "Criar"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Write;
