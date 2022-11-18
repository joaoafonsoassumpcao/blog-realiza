import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Single from './pages/Single';
import Write from './pages/Write';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box, Container } from '@mui/material';
// import './style.scss';

const Layout = () => {
  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
      { path: '/write', element: <Write /> },
      { path: '/post/:id', element: <Single /> },
    ]
  }
]);

function App() {
  return (
   <Box>
    <Container>
      <RouterProvider router={router}/>
    </Container>
    
   </Box>
        
      
  );
}



export default App;
