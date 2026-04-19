import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import ChooseRegister from '../pages/auth/ChooseRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import BottomNav from '../components/BottomNav'
import Saved from '../pages/general/Saved'

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
                    <Route path="/home" element={<><Home /><BottomNav /></>} />
                    <Route path="/saved" element={<><Saved /><BottomNav /></>} />
                    <Route path="/create-food" element={<CreateFood />} />
                    <Route path="/food-partner/:id" element={<Profile />} />
                </Routes>
            </Router>
        </div>
    )
}

export default AppRouter