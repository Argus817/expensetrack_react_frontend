import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import { useState } from "react"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { AuthProvider } from "./utility/AuthContext"
import PrivateRoute from "./utility/PrivateRoute"
import PublicRoute from "./utility/PublicRoute"
import Expenses from "./pages/Expenses"
import ExpenseAdd from "./pages/ExpenseAdd"
import ExpenseUpdate from "./pages/ExpenseUpdate"


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/login' element={
                        <PublicRoute><Login /></PublicRoute>
                    } />
                    <Route path="/register" element={
                        <PublicRoute><Register /></PublicRoute>
                    } />
                    <Route path="/" element={
                        <PrivateRoute><Home /></PrivateRoute>
                    } />
                    <Route path="/expenses/" element={
                        <PrivateRoute><Expenses /></PrivateRoute>
                    } />
                    <Route path="/expenses/new/add/" element={
                        <PrivateRoute><ExpenseAdd /></PrivateRoute>
                    } />
                    <Route path="/expenses/update/:id" element={
                        <PrivateRoute><ExpenseUpdate /></PrivateRoute>
                    } />
                    <Route path="/profile/" element={
                        <PrivateRoute><Profile /></PrivateRoute>
                    } />
                    <Route path="*" element={<Navigate to='/'/>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
