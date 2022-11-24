import React, {useState, useEffect} from "react";
// import Menu from "../components/Menu";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Container from '@mui/material/Container';
//import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {HOST} from "../config"




const Single = () => {

    const [post, setPost] = useState({});

    const location = useLocation()
    // console.log(location)

    const postId = location.pathname.split("/")[2];

    
    useEffect(() => {

    const fetchData = async () => {
        try {
            const res = await axios.get(`${HOST}/api/post/${postId}`);
            setPost(res.data.data)
            console.log(res.data.data)
        } catch (err) {
            console.log(err)
        }
    };
        fetchData();
    }, [postId]);

    return (
        <Container component="main" maxWidth="lg" sx={{paddingTop: 20}}>
            
            <Box>
                <Grid container spacing={2}>
                   
                        <Card sx={{width: "lg"}}>
                            <CardMedia
                                component="img"
                                alt={post?.title}
                                height="300"
                                image={post.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="p" component="div" sx={{color: "pallete.secondary.main"}}>
                                    {post.date}
                                </Typography>
                                <Typography gutterBottom variant="h3" component="div">
                                    {post.title}
                                </Typography>
                                <Typography gutterBottom variant="p" component="div">
                                    <div dangerouslySetInnerHTML={{__html: post.description}}></div>
                                </Typography>
                            </CardContent>
                            
                        </Card>
                 
                </Grid>
            </Box>
        </Container>
    )};

    export default Single;