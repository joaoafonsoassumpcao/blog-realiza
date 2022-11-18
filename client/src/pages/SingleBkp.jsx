import React, {useState, useEffect} from "react";
import Menu from "../components/Menu";
import {useLocation, Link} from "react-router-dom";
import axios from "axios";

const Single = () => {

    const [post, setPost] = useState({});

    const location = useLocation()
    // console.log(location)

    const postId = location.pathname.split("/")[2];

    
    useEffect(() => {

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/post/${postId}`);
            setPost(res.data.data)
            console.log(res.data.data)
        } catch (err) {
            console.log(err)
        }
    };
        fetchData();
    }, [postId]);


    return (
        <div className="single">
            <div className="content">
                <img src={post?.image} alt="random" />
                {/* <div className="user">
                    <img src="https://unsplash.it/50/50" alt="random" />
                    <div className="info">
                        <span>{post.nome}</span>
                        <p>Postado há x dias</p>
                    </div> 
                    <div className="edit">
                        <Link to={`/write/${post.id}`} state={post}><i className="fas fa-edit"></i></Link>
                        <i className="fas fa-edit"></i>
                        <i className="fas fa-trash-alt"></i>
                    </div>
                </div>  */}
                <h1 className="title-single">{post.title}</h1>
                <p>{post.description}</p>
            </div>
            <Menu category={post.category}/>
        </div>
    )};

export default Single;