import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/users/login/login"
import Profile from "./components/users/profile/profile"
import './App.css';
import Register from "./components/users/register/register";
import ReferralList from "./components/customers/refferals/referral-list";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route path="/referrals" element={
                        <div className='container-fluid'>
                            <ReferralList/>
                        </div>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
