import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Head from "next/head";

const Single = () => {
  const [post, setPost] = useState({});

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/api/post/${id}`);
        setPost(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Container component="main" maxWidth="lg" sx={{ paddingTop: 20 }}>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <Box>
        <Grid container spacing={2}>
          <Card sx={{ width: "lg" }}>
            <CardMedia
              component="img"
              alt={post?.title}
              height="300"
              image={post?.image}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="p"
                component="div"
                sx={{ color: "pallete.secondary.main" }}
              >
                {post?.date}
              </Typography>
              <Typography gutterBottom variant="h3" component="div">
                {post?.title}
              </Typography>
              <Typography gutterBottom variant="p" component="div">
                <div
                  dangerouslySetInnerHTML={{ __html: post?.description }}
                ></div>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </Container>
  );
};

export default Single;
