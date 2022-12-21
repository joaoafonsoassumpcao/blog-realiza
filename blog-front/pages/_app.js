import "../styles/globals.css";
import { ThemeProvider } from "@mui/material";
import { AuthContextProvider } from "../context/authContext";
import { theme } from "../theme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
