import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import userService from "../../../services/user-services";

const Login = () => {
    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    const handleLogin = (user) => {
        userService.login(user).then(
            currentUser => {
                navigate('/profile')
            }
        ).catch(error => {
            console.log(error)
            alert('username or password is wrong!')
        })
    }

    return (
        <div className="container">
            <h1>Sign In</h1>
            <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="username"
                           value={credentials.username}
                           onChange={(e) => setCredentials({
                                                               ...credentials,
                                                               username: e.target.value
                           })}
                           placeholder="e.g Alice"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input className="form-control"
                           id="password"
                           type="password"
                           value={credentials.password}
                           onChange={(e) => setCredentials({
                                                               ...credentials,
                                                               password:e.target.value
                           })}
                           placeholder="e.g abc123!"/>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-from-label"/>
                <div className="col-sm-10 d-grid gap-2">
                    <button className="btn btn-primary"
                            onClick={() => handleLogin(credentials)}>Sign in
                    </button>
                    <Link to="/" className="btn btn-danger"> Cancel </Link>
                    <div className="row">
                        <div className="col-6">
                            <Link to="/">Forgot Password</Link>
                        </div>
                        <div className="col-6">
                            <Link to="/register"
                                  className="float-end">
                                Sign up
                            </Link>
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

export default Login