import React from "react";
import EditableProduct from "../editable-product/editable-product";

const ProductList = ({products, animals, categories, updateProduct, deleteProduct}) => {
    return (
        <ul className='list-group'>
            {
                products.map((product) =>
                                 <li key={product._id}
                                     className='list-group-item'>
                                     <EditableProduct
                                         product={product}
                                         animals={animals}
                                         updateProduct={updateProduct}
                                         deleteProduct={deleteProduct}
                                         categories={categories}/>
                                 </li>
                )
            }
        </ul>
    )
}

export default ProductList