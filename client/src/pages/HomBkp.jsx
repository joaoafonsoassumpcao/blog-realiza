import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";



const Home = () => {

    const [posts, setPosts] = useState([]);

    const category = useLocation().search

    
    useEffect(() => {

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/allposts${category}`);
            setPosts(res.data.data)
            
        } catch (err) {
            console.log(err)
        }
    };
        fetchData();
    }, [category]);

    return (
    <div className="home">
        <div className="posts">
                {posts.filter((item, idx) => idx < 6).map((post) => {
                    return <div className="post" key={post.id}>
                        <div className="img">
                            <img src={post.image} alt="Post" />
                        </div>
                        <div className="content">
                            <Link className="title-link" to={`/post/${post.id}`}>
                                <h1 className="post-title">{post.title}</h1>
                            </Link>
                                <p>{post.resumo}</p>
                                <Link className="ler-mais" to={`/post/${post.id}`}>Ler agora</Link>
                        </div>
                    </div>
                })}
            
        </div>
    </div>
    );
    }

export default Home;