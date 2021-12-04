import React from 'react'
import "./Home.css"

const Home = () => {

    return (
        <div>
            <nav className="navbar navbar-light bg-light static-top">
                <div className="container">
                    <a className="navbar-brand" href="/"><h2>Pet Lovers</h2></a>
                    <div>
                        <a className="btn btn-primary me-3" href="/login">Login</a>
                        <a className="btn btn-primary me-3" href="/register">Register</a>
                        <a className="btn btn-primary me-3" href="/profile">Profile</a>
                    </div>
                </div>
            </nav>
            <div className="container">
                <br/>
                <div className='row'>
                    <div className="d-grid col">
                        <button className='btn btn-primary' type="button">
                            Our brands
                        </button>
                    </div>
                    <div className="d-grid col">
                        <button className='btn btn-primary' type="button">
                            Browse Products
                        </button>
                    </div>
                    {/*<div className="d-grid col-3">*/}
                    {/*    <button className='btn btn-primary' type="button">*/}
                    {/*        Shop for Cats*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    {/*<div className="d-grid col-3">*/}
                    {/*    <button className='btn btn-primary' type="button">*/}
                    {/*        Shop for dogs*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default Home