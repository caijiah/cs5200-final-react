import React, {useEffect, useState} from 'react'
import productService from "../../../../services/product-services";
import ProductCellCustomer from "../product-cell-customer";

const ShopByBrand = ({selectedBrand, selectedBrandName, addAProductToCart}) => {
    const [productsCache, setProductsCache] = useState([])

    useEffect(() => {
        if (selectedBrand !== '') {
            productService.findProductsForSupplier(selectedBrand)
                .then(products => {
                    setProductsCache(products)
                })
        }
    }, [selectedBrand])

    return(
        <>
            <h3>{selectedBrandName}</h3>
            <br/>
            {
                productsCache.length === 0 &&
                <h3>No products yet.</h3>
            }
            {
                productsCache.length !== 0 &&
                productsCache.map((product)=>
                                      <ProductCellCustomer
                                          key={product._id}
                                          product={product}
                                          addAProductToCart={addAProductToCart}/>)
            }
        </>
    )
}

export default ShopByBrand