import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import UploadBook from "../dashboard/Admin/UploadBook";
import Dashboard from "../dashboard/Dashboard";
import ManageBooks from "../dashboard/Admin/ManageBooks";
import EditBooks from "../dashboard/Admin/EditBooks";
import Login from "../components/Login";
import App from "../App";
import Register from "../components/Register";
import DashboardNew from "../dashboard/DashboardNew";
import DashboardLayoutNew from "../dashboard/DashboardLayoutNew";
import UserCP from "../dashboard/User/UserCP";
import SelectedBooks from "../dashboard/User/SelectedBooks";
import MyPaymentHistory from "../dashboard/User/MyPaymentHistory";
import ApplyForInstructor from "../dashboard/User/ApplyForInstructor";
import AdminHome from "../dashboard/Admin/AdminHome";
import ManageUsers from "../dashboard/Admin/ManageUsers";
import UpdateUsers from "../dashboard/Admin/UpdateUsers";

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
          path:'/login',
          element: <Login/>
        },
        {
          path:'/register',
          element: <Register/>
        },
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
    },

    {
      path: '/dashboard',
      element:<DashboardLayoutNew/>,
      children: [
        {
          index: true,
           element:<DashboardNew/>
        },

        //User routes
        {
          path: 'user',
          element: <UserCP/>
        },
        {
          path: 'my-selected',
          element: <SelectedBooks/>
        },
        {
          path: 'my-payments',
          element: <MyPaymentHistory/>
        },
        {
          path: 'apply-instructor',
          element: <ApplyForInstructor/>
        },

        //Admin Routes
        {
          path: 'admin-home',
          element: <AdminHome/>
        },
        {
          path: 'manage-users',
          element: <ManageUsers/>
        },
        {
          path: 'manage-book',
          element: <ManageBooks/>
        },
        {
          path: 'upload-book',
          element: <UploadBook/>
        },
        {
          path: "update-user/:id",
          element: <UpdateUsers/>,
          loader: ({params}) => fetch(`http://localhost:5001/users/${params.id}`)
        }
      ]
    }
  ]);

  export default router;