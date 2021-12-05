import React from "react";
import {useNavigate} from "react-router-dom";

const CustomerNavigation = () => {
    const navigate = useNavigate()
    return (
        <div className='mb-3 row'>
            <div className='d-grid col-3'>
                <button
                    onClick={() => navigate('/shopping/products')}
                    className='btn btn-primary btn-block'>
                    <i className="fas fa-dog me-1"/>Browse products
                </button>
            </div>
            <div className='d-grid col-3'>
                <button
                    onClick={() => navigate('/pets')}
                    className='btn btn-primary btn-block'><i
                    className="fas fa-cat me-1"/>My pets
                </button>
            </div>
            <div className='d-grid col-3'>
                <button
                    // onClick={() => navigate('/orders')}
                    className='btn btn-primary btn-block'><i
                    className="fas fa-file-invoice-dollar me-1"/>My orders
                </button>
            </div>
            <div className='d-grid col-3'>
                <button
                    onClick={() => navigate('/referrals')}
                    className='btn btn-primary btn-block'><i
                    className="fas fa-user-friends me-1"/>My referrals
                </button>
            </div>
        </div>
    )
}

export default CustomerNavigation