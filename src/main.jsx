import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import router from './routers/router.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Aos from 'aos'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import AuthProvider from './ultilities/providers/AuthProvider.jsx'

const queryClient = new QueryClient();

Aos.init();
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
  </QueryClientProvider>
  </AuthProvider>
)
