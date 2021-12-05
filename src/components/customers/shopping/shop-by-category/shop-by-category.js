import React, {useEffect, useState} from "react";
import productService from "../../../../services/product-services";
import ProductCellCustomer from "../product-cell-customer";

const ShopByCategory = ({selectedCategoryName,
                            addAProductToCart,
                            selectedCategory,}) => {
    const [productsCache, setProductsCache] = useState([])

    useEffect(()=> {
        if (selectedCategory !== '') {
            productService.findProductsByCategoryId(selectedCategory)
                .then(products => {
                    setProductsCache(products)
                })
        }
    }, [selectedCategory])

    return(
        <>
            <h3>Shop by: {selectedCategoryName}</h3>
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

export default ShopByCategory