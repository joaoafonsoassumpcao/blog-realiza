import axios from "axios";
import React, { useEffect, useState } from "react";

// const posts = [
//     {
//         id: 1,
//         image: "https://images.unsplash.com/photo-1666753719478-36c1f3a49092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//         title: "Título",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     },
//     {
//         id: 2,
//         image: "https://images.unsplash.com/photo-1666753719478-36c1f3a49092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//         title: "Título",
//         desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     }
// ]

const Menu = ({category}) => {
    const [posts, setPosts] = useState([]);

    
    useEffect(() => {

    const fetchData = async () => {
        try {
            const res = await axios.get(`/api/allposts/?category=${category}`);
            setPosts(res.data.data)
            
        } catch (err) {
            console.log(err)
        }
    };
        fetchData();
    }, [category]);

    return (
        <div className="menu">
            <h1>Leia também:</h1>
            {posts.filter((item, idx) => idx < 3).map((post) => (
                <div className="post" key={post.id}>
                    <img src={post.image} alt="Post" />
                    <h2>{post.title}</h2>
                    <button>Ler mais</button>
                </div>
            ))}
        </div>
    )
}

export default Menu;