import React, {useEffect, useState} from 'react'
import userService from "../../../services/user-services";
import {Link, useNavigate} from "react-router-dom";
import AddressProfile from "./address-profile";
import CustomerNavigation from "../../customers/navigation/customer-navigation";


const Profile = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [profileInfo, setProfileInfo] = useState(
        {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            dob: '',
            email: '',
            role: '',
            deliveryAddress: {
                addressLineOne: '',
                addressLineTwo: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            },
            created: '',
            referredBy: '',
            companyName: '',
        })

    useEffect(()=> {
        userService.profile()
            .catch(error => {
                alert("Not logged In!")
                navigate('/')
            })
            .then(profile => {
                if (profile) {
                    console.log(profile)
                    setUserId(profile._id)
                    setProfileInfo(profile)
                }
            })
    },[navigate])

    const updateAddress = (addressUpdate) => {
        const name = Object.keys(addressUpdate)[0]
        const currentAddress = profileInfo.deliveryAddress
        currentAddress[name] = addressUpdate[name]
        setProfileInfo({...profileInfo, deliveryAddress: currentAddress})
    }

    const handleUserUpdate = () => {
        let newUser = {
            userId: userId,
            profileInfo: profileInfo
        }
        userService.updateUserInfo(newUser)
            .then(res=> {
                alert("Successfully Updated!")
                setProfileInfo(newUser.profileInfo)
            })
            .catch(error => {
                alert("failed to update!")
            })

    }

    const handleLogout = () => {
        userService.logout()
            .then(()=> {
                navigate('/')
            })
    }

    return (
        <div className='container'>
            <br/>

            {
                profileInfo.role.role === 'CUSTOMER' &&
                <CustomerNavigation/>
            }

            <br/>

            <h1>Profile</h1>
            <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input type="text"
                           readOnly
                           className="form-control"
                           id="username"
                           autoComplete="off"
                           placeholder="username"
                           value={profileInfo.username}/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="password"
                           readOnly
                           type='password'
                           autoComplete="off"
                           placeholder="password"
                           value={profileInfo.password}/>
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="firstName" className="col-sm-2 col-form-label">
                    First Name
                </label>
                <div className="col-sm-10">
                    <input type="text"
                           className="form-control"
                           id="firstName"
                           onChange={(e)=>{
                               setProfileInfo({
                                   ...profileInfo,
                                   firstName: e.target.value
                               })
                           }}
                           placeholder="firstName"
                           value={profileInfo.firstName}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="lastName" className="col-sm-2 col-form-label">
                    Last Name
                </label>
                <div className="col-sm-10">
                    <input type="text"
                           className="form-control"
                           id="lastName"
                           onChange={(e)=>{
                               setProfileInfo({
                                                  ...profileInfo,
                                                  lastName: e.target.value
                                              })
                           }}
                           placeholder="lastName"
                           value={profileInfo.lastName}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="dob" className="col-sm-2 col-form-label">
                    Date of birth
                </label>
                <div className="col-sm-10">
                    <input type="date"
                           className="form-control"
                           id="dob"
                           onChange={(e)=>{
                               setProfileInfo({
                                                  ...profileInfo,
                                                  dob: e.target.value
                                              })
                           }}
                           placeholder="Date of birth"
                           value={profileInfo.dob.split('T')[0]}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                </label>
                <div className="col-sm-10">
                    <input type="text"
                           className="form-control"
                           id="email"
                           readOnly
                           placeholder="email"
                           value={profileInfo.email}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="created" className="col-sm-2 col-form-label">
                    Created at
                </label>
                <div className="col-sm-10">
                    <input type="date"
                           className="form-control"
                           id="created"
                           readOnly
                           placeholder="Created at"
                           value={profileInfo.created.split('T')[0]}
                    />
                </div>
            </div>

            <div className="mb-3 row">
                <label htmlFor="role" className="col-sm-2 col-form-label">
                    Role
                </label>
                <div className="col-sm-10">
                    <select id="role"
                            disabled={true}
                            value={profileInfo.role.role}
                            className="form-control">
                        <option value="CUSTOMER">CUSTOMER</option>
                        <option value="SUPPLIER">SUPPLIER</option>
                    </select>
                </div>
            </div>

            {
                profileInfo.role.role === 'CUSTOMER' &&
                <>
                    <AddressProfile profileInfo={profileInfo} updateAddress={updateAddress}/>
                    {
                        (profileInfo.referredBy !== undefined && profileInfo.referredBy !== '') &&
                        <>
                            <div className="mb-3 row">
                                <label htmlFor="referredBy" className="col-sm-2 col-form-label">
                                    Referred by
                                </label>
                                <div className="col-sm-10">
                                    <input type="text"
                                           className="form-control"
                                           id="referredBy"
                                           readOnly
                                           placeholder="referredBy"
                                           value={profileInfo.referredBy.username}
                                    />
                                </div>
                            </div>
                        </>
                    }
                </>
            }

            {
                profileInfo.role.role === 'SUPPLIER' &&
                <>
                    <div className="mb-3 row">
                        <label htmlFor="companyName" className="col-sm-2 col-form-label">
                            Company name
                        </label>
                        <div className="col-sm-10">
                            <input className="form-control"
                                   id="companyName"
                                   value={profileInfo.companyName}
                                   readOnly
                                   placeholder="Example: ORIJEN"/>
                        </div>
                    </div>
                </>
            }

            <div className="form-group row">
                <label className="col-sm-2 col-form-label"/>
                <div className="col-sm-10 d-grid gap-2">
                    <button
                        onClick={()=>handleUserUpdate()}
                        className="btn btn-success">
                        Update
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={()=>handleLogout()}>
                        Log out
                    </button>
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

export default Profile