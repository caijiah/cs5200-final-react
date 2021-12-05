import React, {useEffect, useState} from "react";
import userService from "../../../services/user-services";
import {useNavigate} from "react-router-dom";
import orderService from "../../../services/order-services";
import OrderCell from "./order-cell";
import './orders.css'

const OrderList = () => {
    const navigate = useNavigate()
    const [ordersCache, setOrdersCache] = useState([])

    useEffect(() => {
        userService.profile()
            .catch(error => {
                alert('Not logged in!')
                navigate('/')
            })
            .then(profile => {
                if (profile) {
                    orderService.findOrdersForCustomer(profile._id)
                        .then((orders) => {
                            setOrdersCache(orders)
                        })
                }
            })
    }, [navigate])

    return (
        <>
            <div>
                <h1>My orders</h1>
                <button
                    className="btn btn-primary me-2"
                    onClick={() => {
                        navigate('/shopping')
                    }
                    }>
                    <i className='me-1 fa fa-shopping-bag'/>Shopping
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        userService.logout()
                        navigate('/')
                    }}>
                    Log out
                </button>

                <br/>
                {
                    ordersCache.length === 0 &&
                    <>
                        <h3>No orders yet.</h3>
                    </>
                }
                <br/>
                {
                    ordersCache.length !== 0 &&
                    <>
                        <div className="mb-3">
                            {
                                ordersCache.map((order, index) =>
                                                    <OrderCell
                                                        num={index + 1}
                                                        key={order._id}
                                                        order={order}/>
                                )
                            }
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default OrderList