import React, {useEffect, useState} from "react";
import productService from "../../../services/product-services";
import {Col, Row} from "react-bootstrap";
import PetIcon from "../../customers/pets/editable-pet/pet-icon";
import ProductIcon from "../../suppliers/editable-product/product-icon";

const GuestProducts = () => {
    const [productsCache, setProductsCache] = useState([])

    useEffect(() => {
        productService.findAllProducts()
            .then((products) => {
                setProductsCache(products)
            })
    }, [])

    return (
        <Row>
            <Col sm={8}>
                <h3>Our all products:</h3>
                <br/>
                {
                    productsCache.map(product => {
                        return (
                            <li className='list-group-item'>
                                <div className='row'>
                                    <h4>
                                        {product.supplier.companyName}
                                    </h4>
                                </div>
                                <div className='row mb-2'>
                                    <div className='col-3'>
                                        Product Name: <b>{product.name}</b>
                                        <h3><PetIcon animal={product.animal.animal}/>
                                            <ProductIcon category={product.category.category}/></h3>
                                    </div>
                                    <div className='col-3'>Quantity: {product.inventory}</div>
                                    <div className='col-3'>Price: ${product.price}</div>

                                </div>
                                <div className='row'>
                                    <div className='col-3'>Weight: {product.weight} kg</div>
                                    <div className='col-3'>Category: <ProductIcon
                                        category={product.category.category}/>
                                        {product.category.category}
                                    </div>
                                    <div className='col-3'>Animal: <PetIcon
                                        animal={product.animal.animal}/>
                                        {product.animal.animal}
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </Col>
            <Col sm={4}>
                <h4>Log in to start shopping!</h4>
                <a className="btn btn-primary me-3" href="/login">Login</a>
                <a className="btn btn-primary me-3" href="/register">Register</a>
            </Col>
        </Row>
    )
}

export default GuestProducts