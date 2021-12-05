import React, {useEffect, useState} from "react";
import productService from "../../../services/product-services";
import {Col} from "react-bootstrap";

const GuestBrands = () => {
    const [brandsCache, setBrandsCache] = useState([])
    useEffect(() => {
        productService.findAllBrands()
            .then((brands) => {
                console.log(brands)
                setBrandsCache(brands)
            })
    }, [])
    return (
        <div className='row'>
            <Col sm={8}>
                <h3>Our Suppliers:</h3>
                <br/>
                <ul className='list-group'>
                    {
                        brandsCache.map((brand) => {
                            return (
                                <li className='list-group-item'
                                    key={brand._id}>
                                    {brand.supplier.companyName}
                                </li>
                            )
                        })
                    }
                </ul>
            </Col>
            <Col sm={4}>
                <h4>Log in to start shopping!</h4>
                    <a className="btn btn-primary me-3" href="/login">Login</a>
                    <a className="btn btn-primary me-3" href="/register">Register</a>
            </Col>
        </div>
    )
}

export default GuestBrands