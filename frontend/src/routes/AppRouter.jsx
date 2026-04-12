import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import ChooseRegister from '../pages/auth/ChooseRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'

const AppRouter = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<ChooseRegister />} />
                    <Route path='/user/register' element={<UserRegister />} />
                    <Route path='/user/login' element={<UserLogin />} />
                    <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
                    <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
                </Routes>
            </Router>
        </div>
    )
}

export default AppRouter