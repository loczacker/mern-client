import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import SingleBook from "../shop/SingleBook";
import UploadBook from "../dashboard/Admin/UploadBook";
import ManageBooks from "../dashboard/Admin/ManageBooks";
import EditBooks from "../dashboard/Admin/EditBooks";
import Login from "../components/Login";
import App from "../App";
import Register from "../components/Register";
import DashboardNew from "../dashboard/Dashboard";
import DashboardLayoutNew from "../dashboard/DashboardLayout";
import UserCP from "../dashboard/User/UserCP";
import SelectedBooks from "../dashboard/User/SelectedBooks";
import MyPaymentHistory from "../dashboard/User/MyPaymentHistory";
import AdminHome from "../dashboard/Admin/AdminHome";
import ManageUsers from "../dashboard/Admin/ManageUsers";
import UpdateUsers from "../dashboard/Admin/UpdateUsers";
import MyFavoriteBook from "../dashboard/User/MyFavoriteBook";
import Payment from "../dashboard/User/Payment/Payment";

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
          path: 'my-favorite-book',
          element: <MyFavoriteBook/>
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
          path: 'user/payment',
          element: <Payment/>
        },
        {
          path: 'my-favourite',
          element: <MyFavoriteBook/>
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
          path:'update-user/:id',
          element: <UpdateUsers/>,
          loader: ({params}) => fetch(`http://localhost:5001/users/${params.id}`)
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
          path: 'edit-books/:id',
          element: <EditBooks/>,
          loader: ({params}) => fetch(`http://localhost:5001/book/${params.id}`)
        },
        {
          path: "update-user/:id",
          element: <UpdateUsers/>,
          loader: ({params}) => fetch(`http://localhost:5001/users/${params.id}`)
        },
        {
          path: 'edit-books/:id',
          element: <EditBooks/>,
          loader: ({params}) => fetch(`http://localhost:5001/book/${params.id}`)
        }
        
      ]
    }
  ]);

  export default router;