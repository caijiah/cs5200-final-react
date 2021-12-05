import React, {useEffect, useState} from "react";
import productService from "../../../../services/product-services";
import ProductCellCustomer from "../product-cell-customer";

const ShopAllProducts = ({addAProductToCart}) => {
    const [productsCache, setProductsCache] = useState([])

    useEffect(() => {
        productService.findAllProducts()
            .then(products => {
                setProductsCache(products)
            })
    }, [])

    return (
        <>
            <br/>
            <h3>All Products in our web:</h3>
            <br/>
            {
                productsCache.length === 0 &&
                <h3>No products yet.</h3>
            }
            {
                productsCache.length !== 0 &&
                productsCache.map((product) =>
                                      <ProductCellCustomer
                                          key={product._id}
                                          addAProductToCart={addAProductToCart}
                                          product={product}/>
                )
            }
        </>
    )
}

export default ShopAllProducts