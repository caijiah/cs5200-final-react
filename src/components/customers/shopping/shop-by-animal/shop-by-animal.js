import React, {useEffect, useState} from "react";
import productService from "../../../../services/product-services";
import ProductCellCustomer from "../product-cell-customer";

const ShopByAnimal = ({selectedAnimal, selectedAnimalName, addAProductToCart}) => {
    const [productsCache, setProductsCache] = useState([])

    useEffect(() => {
        if (selectedAnimal !== '') {
            productService.findProductsByAnimalType(selectedAnimal)
                .then(products => {
                    setProductsCache(products)
                })
        }
    }, [selectedAnimal])
    return(
        <>
            <h3> Shop by: {selectedAnimalName}</h3>
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

export default ShopByAnimal