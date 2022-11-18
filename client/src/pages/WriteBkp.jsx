import React, { useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";



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
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="add">
            <div className="content">
                <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)}/>
                <input type="text" placeholder="Resumo" value={resumo} onChange={e => setResumo(e.target.value)}/>
                <div className="editor-container">
                    <ReactQuill className="editor" theme="snow" value={value} onChange={setValue}/>
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publicar</h1>
                    {/* <span><b>Status:</b> draft</span>
                    <span><b>Visibilidade:</b> public</span> */}
                    <input style={{display:"none"}} type="file" id="file" name="" onChange={e => setImage(e.target.files[0])}/>
                    <label className="file" for="file">Adicionar imagem</label>
                    <div className="buttons">
                        <button className="cancel">Salvar rascunho</button> 
                        <button className="publish" onClick={handleClick}>Publicar</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Categoria</h1>
                    <div className="cat">
                        <input type="radio" checked={category === "noticias"} name="category" id="noticias" value="noticias"onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="noticias">Notícias</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={category === "artigos"} name="category" id="artigos" value="artigos"onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="artigos">Artigos</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={category === "concursos"} name="category" id="concursos" value="concursos"onChange={e => setCategory(e.target.value)}/>
                        <label htmlFor="concursos">Concursos</label>
                    </div>
                </div>
            </div>
        </div>
        );
    };

    
export default Write;