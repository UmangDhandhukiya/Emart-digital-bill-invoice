import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import Profile from './pages/Profile'
import Hero from './pages/Hero'
import Addcart from './pages/Addcart'
import Layout from './components/Layout'
import Dashboard from './pages/Admin/Dashboard'
import ManageUsers from './pages/Admin/ManageUsers'
import AddCategory from './pages/Admin/AddCategory'
import Search from './pages/Search'
import AddProduct from './pages/Admin/AddProduct'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Hero />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Addcart />} />
          <Route path="/search" element={<Search />} />
        </Route>

        <Route path='/admin' element={<Dashboard/>} >
          <Route path='/admin/manage-users' element={<ManageUsers/>}/>  
          <Route path='/admin/add-categories' element={<AddCategory/>}/> 
          <Route path='/admin/add-product' element={<AddProduct/>}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
