import React, {useEffect, useState} from 'react'
import "./Home.css"
import userService from "../services/user-services";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const [loggedIn, setLoggedIn] = useState(false)
    const [userName, setUsername] = useState("")
    const [userRole, setUserRole] = useState('')

    useEffect(() => {
        userService.profile()
            .then(user => {
                if (user) {
                    setLoggedIn(true)
                    setUsername(user.username)
                    setUserRole(user.role.role)
                } else {
                    setLoggedIn(false)
                }
            })
    })

    return (
        <div>
            <nav className="navbar navbar-light bg-light static-top">
                <div className="container">
                    <a className="navbar-brand" href="/"><h2>Pet Lovers</h2></a>
                    <div>
                        <a className="btn btn-primary me-3" href="/login">Login</a>
                        <a className="btn btn-primary me-3" href="/register">Register</a>
                        {loggedIn &&
                         <>
                             <a className="btn btn-primary me-3" href="/profile">Profile</a>
                             <span onClick={() => {
                                 userService.logout()
                                 setLoggedIn(false)
                                 navigate('/')
                                 alert("successfully logout!")
                             }}
                                className="btn btn-danger">Logout</span>
                         </>}
                    </div>
                </div>
            </nav>

            {loggedIn &&
             <div className='greeting'>Hello {userName}!</div>
            }

            <div className="container">
                <br/>
                <div className='row'>
                    <div className="d-grid col">
                        <button className='btn btn-primary'
                                onClick={() => {
                                    if (loggedIn && userRole === 'CUSTOMER') {
                                        navigate('/shopping/brands')
                                    } else {
                                        navigate('/guest/brands')
                                    }}}
                                type="button">
                            Our brands
                        </button>
                    </div>
                    <div className="d-grid col">
                        <button className='btn btn-primary'
                                onClick={()=> {
                                    if (loggedIn && userRole === 'CUSTOMER') {
                                        navigate('/shopping/products')
                                    } else {
                                        navigate('/guest/products')
                                    }}
                                }
                                type="button">
                            Browse Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home