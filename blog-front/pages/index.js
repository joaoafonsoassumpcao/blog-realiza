import * as React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FeaturedPost from "../components/FeaturedPost";
import { useState, useEffect } from "react";
import MainFeaturedPost from "../components/MainFeaturedPost";
import axiosInstance from "../utils/axios";
import Head from "next/head";

export default function Home() {
  const [posts, setPosts] = useState([]);

  //const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        axiosInstance.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
        const res = await axiosInstance.get(`/api/allposts`);
        setPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 20 }}>
      <Head>
        <title>Blog da Faculdade Realiza - Artigos, notícias e concursos</title>
        <meta
          name="blog da faculdade realiza"
          content="artigos, notícias e concursos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MainFeaturedPost post={posts[0]} />
        <Grid container spacing={4}>
          {posts
            .filter((item, idx) => idx < 12)
            .map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
        </Grid>
      </main>
    </Container>
  );
}
