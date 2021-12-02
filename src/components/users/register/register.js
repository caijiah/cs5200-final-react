import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import CustomerRegister from "./customerRegister";
import userService from "../../../services/user-services";

const Register = () => {
    const navigate = useNavigate()
    const [userInfo, setUserInfo] = useState(
        {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            role: 'CUSTOMER',
            deliveryAddress: {
                addressLineOne: '',
                addressLineTwo: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            },
            referredBy: '',
            companyName: ''
        })

    const updateAddress = (addressUpdate) => {
        const name = Object.keys(addressUpdate)[0]
        const currentAddress = userInfo.deliveryAddress
        currentAddress[name] = addressUpdate[name]
        setUserInfo({...userInfo, deliveryAddress: currentAddress})
    }

    const handleRegister = () => {
        if (userInfo.username === '' || userInfo.password === '' || userInfo.companyName) {
            alert("You have to give a username and password")
            if (userInfo.role === 'SUPPLIER') {
                alert("You have to give a username, password and company name")
            }
        } else {
            userService.register(userInfo)
                .then(newUser => {
                    if (newUser) {
                        navigate('/profile')
                    } else {
                        if (userInfo.role === 'CUSTOMER') {
                            alert("username is taken or referrer's username is wrong.")
                        } else {
                            alert("username or company name is taken.")
                        }
                    }
                })
            }
        }

    return (
        <div className='container'>
            <h1>Register</h1>

            <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="username"
                           value={userInfo.username}
                           onChange={(e) => {
                               setUserInfo({
                                               ...userInfo,
                                               username: e.target.value
                                           })
                           }}
                           placeholder="Example: Alice"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="password"
                           type="password"
                           value={userInfo.password}
                           onChange={(e) => {
                               setUserInfo({
                                               ...userInfo,
                                               password: e.target.value
                                           })
                           }}
                           placeholder="Example: abc123!"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="firstName" className="col-sm-2 col-form-label">First name</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="firstName"
                           value={userInfo.firstName}
                           onChange={(e) => {
                               setUserInfo({
                                               ...userInfo,
                                               firstName: e.target.value
                                           })
                           }}
                           placeholder="Example: Alice"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="lastName" className="col-sm-2 col-form-label">Last name</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="lastName"
                           value={userInfo.lastName}
                           onChange={(e) => {
                               setUserInfo({
                                               ...userInfo,
                                               lastName: e.target.value
                                           })
                           }}
                           placeholder="Example: Wonderland"/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="dob" className="col-sm-2 col-form-label">Date of birth</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="dob"
                           value={userInfo.dob}
                           type="Date"
                           onChange={(e) => {
                               setUserInfo({
                                               ...userInfo,
                                               dob: e.target.value
                                           })
                           }}/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="role" className="col-sm-2 col-form-label">
                    Role
                </label>
                <div className="col-sm-10">
                    <select id="role"
                            className="form-control"
                            value={userInfo.role}
                            onChange={(e) => {
                                setUserInfo({
                                                ...userInfo,
                                                role: e.target.value
                                            })
                            }}>
                        <option value={"CUSTOMER"}>CUSTOMER</option>
                        <option value={"SUPPLIER"}>SUPPLIER</option>
                    </select>
                </div>
            </div>

            {
                userInfo.role === "CUSTOMER" &&
                <>
                    <div className="mb-3 row">
                        <label htmlFor="referredBy" className="col-sm-2 col-form-label">Referred by</label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="referredBy"
                                   value={userInfo.referredBy}
                                   onChange={(e) => {
                                       setUserInfo({
                                                       ...userInfo,
                                                       referredBy: e.target.value
                                                   })
                                   }}
                                   placeholder="Example: Alice"/>
                        </div>
                    </div>
                    <CustomerRegister
                        userInfo={userInfo}
                        updateAddress={updateAddress}
                    />
                </>
            }

            {
                userInfo.role === "SUPPLIER" &&
                <>
                    <div className="mb-3 row">
                        <label htmlFor="companyName" className="col-sm-2 col-form-label">
                            Company name
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="companyName"
                                   value={userInfo.companyName}
                                   onChange={(e) => {
                                       setUserInfo({
                                                       ...userInfo,
                                                       companyName: e.target.value
                                                   })
                                   }}
                                   placeholder="Example: ORIJEN"/>
                        </div>
                    </div>
                </>
            }

            <div className="form-group row">
                <label className="col-sm-2 col-form-label"/>
                <div className="col-sm-10 d-grid gap-2">
                    <button
                        onClick={() => handleRegister()}
                        className="btn btn-primary">
                        Sign up
                    </button>
                    <Link to="/" className="btn btn-danger"> Cancel </Link>
                    <div className="row">
                        <div className="col-6">
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-3 row">
                <div className="col-sm-10">
                    <Link to="/">
                        <i className="fa fa-home"/> Back to homepage
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Register