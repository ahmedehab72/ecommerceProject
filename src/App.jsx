// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Carts from './components/Carts/Carts'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import CounterContextProvider from './Context/CounterContext'
import Brands from './components/Brands/Brands'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import {  QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import UserAdress from './components/UserAdress/UserAdress'
import BrandDetails from './components/BrandDetails/BrandDetails'
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails'
import About from './components/About/About'
import Wishlist from './components/Wishlist/Wishlist'
import WishProductContextProvider from './Context/WishContext'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import RestPassword from './components/RestPassword/RestPassword'

function App() {
  let query =new QueryClient();


 let router = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'carts',element:<ProtectedRoute><Carts/></ProtectedRoute>},
    {path:'about',element:<ProtectedRoute><About/></ProtectedRoute>},
    {path:'wishlist',element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'branddetails/:id',element:<ProtectedRoute><BrandDetails/></ProtectedRoute>},
    {path:'categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'categoriesdetails/:id/:category' , element:<ProtectedRoute><CategoriesDetails /></ProtectedRoute>},
    {path:'products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:id/:category',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'address',element:<ProtectedRoute><UserAdress/></ProtectedRoute>},
    {path:'register',element:<Register/>},
    {path:'login',element:<Login/>},
    {path:'forgetpassword',element:<ForgetPassword/>},
    { path: "restCode", element: <RestPassword /> },
    {path:'*',element:<NotFound/>},
  ]}
 ])
  
  return <CartContextProvider>
    <WishProductContextProvider>
               <QueryClientProvider client={query}>
                  <UserContextProvider>
                    <CounterContextProvider>
                      <RouterProvider router={router} ></RouterProvider>
                      <Toaster/>
                      <ReactQueryDevtools/>
                    </CounterContextProvider>
                  </UserContextProvider>
                </QueryClientProvider>
                </WishProductContextProvider>
           </CartContextProvider>
 
   
}

export default App
