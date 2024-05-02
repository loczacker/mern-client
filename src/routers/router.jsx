import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import UploadBook from "../dashboard/UploadBook";
import Dashboard from "../dashboard/Dashboard";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import SignIn from "../dashboard/SignIn";
import SignOut from "../dashboard/SignOut";
import Profile from "../dashboard/Profile";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/shop',
            element: <Shop/>
        },
        {
            path: '/about',
            element: <About/>
        },
        {
            path: '/blog',
            element: <Blog/>
        },
        {
          path: '/book/:id',
          element: <SingleBook/>,
          loader: ({params}) => fetch(`http://localhost:5001/book/${params.id}`)
        },
        {
          path: '/sign-in',
          element: <SignIn/>
        }
      ]
    },
    {
      path: '/admin/dashboard',
      element:<DashboardLayout/>,
      children: [
        {
          path: '/admin/dashboard',
          element: <Dashboard/>
        },
        {
          path: '/admin/dashboard/upload',
          element: <UploadBook/>
        },
        {
          path: '/admin/dashboard/manage',
          element: <ManageBooks/>
        },
        {
          path: '/admin/dashboard/edit-books/:id',
          element: <EditBooks/>,
          loader: ({params}) => fetch(`http://localhost:5001/book/${params.id}`)
        }
      ]
    }
  ]);

  export default router;