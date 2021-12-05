import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/users/login/login"
import Profile from "./components/users/profile/profile"
import './App.css';
import Register from "./components/users/register/register";
import ReferralList from "./components/customers/refferals/referral-list";
import Pets from "./components/customers/pets/pets";
import ManageProducts from "./components/suppliers/products/manage-products";
import ShoppingMain from "./components/customers/shopping/shopping-main";
import OrderList from "./components/customers/orders/order-list";

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
                    <Route path="/pets" element={
                        <div className='container-fluid'>
                            <Pets/>
                        </div>}/>
                    <Route path="/inventory" element={
                        <div className='container-fluid'>
                            <ManageProducts/>
                        </div>}>
                    </Route>

                    <Route path='/shopping/*' element={
                        <div className='container-fluid'>
                            <ShoppingMain/>
                        </div>}>
                        <Route path=':shopBy' element={
                            <div className='container-fluid'>
                                <ShoppingMain/>
                            </div>}>
                        </Route>
                    </Route>
                    <Route path='/orders' element={
                        <div className='container-fluid'>
                            <OrderList/>
                        </div>}>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
