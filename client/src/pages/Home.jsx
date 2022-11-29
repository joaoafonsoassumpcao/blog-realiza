import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import FeaturedPost from "../components/FeaturedPost";

import { theme } from "../theme";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { HOST } from "../config";
import MainFeaturedPost from "../components/MainFeaturedPost";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosInstance = axios.create({ baseURL: HOST });
        axiosInstance.defaults.headers.get["Access-Control-Allow-Origin"] = "*";
        const res = await axiosInstance.get(`${HOST}/api/allposts${category}`);
        setPosts(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ paddingTop: 20 }}>
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
    </ThemeProvider>
  );
}
