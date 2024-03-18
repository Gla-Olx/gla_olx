import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import GlxState from './context/glxState';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Sell } from './pages/Sell';
import { EditProfile } from './pages/EditProfile';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/404';
import { MyAds } from './pages/MyAds';
import { Chat } from './pages/Chat';
import { Wishlist } from './pages/Wishlist';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Product } from './pages/Product';
import Alert from './components/Alert';
import { AllCategory, Category } from './pages/Category';


const NavbarWrapper = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Alert/>
      <Footer />
    </div>
  )
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/sell', element: <Sell /> },
      { path: '/edit-profile', element: <EditProfile /> },
      { path: '/profile', element: <Profile /> },
      { path: '/myads', element: <MyAds /> },
      { path: '/chat', element: <Chat /> },
      { path: "/wishlist", element: <Wishlist /> },
      {
        path: "/product/:id", element: <Product />, loader: async ({ request, params }) => {
          return fetch(
            `http://localhost:8080/api/single-item?tempToken=${params.id}`
          );
        },
      },
      {
        path: "/category/:category",
        element: <AllCategory />,
        loader: async ({ request, params }) => {
          return fetch(
            `http://localhost:8080/api/category?category=${params.category}`
          );
        },
      }
    ],
    errorElement: <NotFound />
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlxState>
      <RouterProvider router={router} />
    </GlxState>
  </React.StrictMode>
);


