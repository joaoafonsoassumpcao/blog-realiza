import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Write = () => {
    const { currentUser } = useContext(AuthContext);
    const userid = currentUser?.user.id.toString();
    
    
    const state = useLocation().state;

    const [value, setValue] = useState(state?.description || "");
    const [title, setTitle] = useState(state?.title || "");
    const [category, setCategory] = useState(state?.category || "");
    const [image, setImage] = useState("");
    const [user, setUser] = useState(userid);
    const [resumo, setResumo] = useState("");

    
    const uploadImage = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            const res = await axios.post("/api/uploads", formData);
            return res.data.url;
        } catch (err) {
            console.log(err);
        }
    };
    
    const handleClick = async e => {
        e.preventDefault();
        const imageUrl = await uploadImage();
        
        
        try {
            setUser(userid);
            state ? await axios.put(`/api/updatepost/${state.id}`, {title, description: value, category, user_id: user, image: imageUrl, resumo}) 
            : await axios.post("/api/post", {title, description: value, category, user_id: user, image: imageUrl, date: moment(Date.now()).format("DD/MM/YYYY"), resumo});
            alert("Post criado com sucesso!"); 
            window.location.replace("/");
        } catch (err) {
            console.log(err)
            alert("Erro ao criar post!"); 

        }
    }

    return (
        <Container component="main" maxWidth="lg" sx={{paddingTop: 10}}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Typography component="h1" variant="h5">
                    {state ? "Editar Post" : "Criar Post"}
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
                        onChange={e => setTitle(e.target.value)}
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
                        onChange={e => setResumo(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="category"
                        label="Categoria"
                        name="category"
                        autoComplete="category"
                        autoFocus
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
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
                        onChange={e => setImage(e.target.files[0])}
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
                        {state ? "Editar" : "Criar"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Write;