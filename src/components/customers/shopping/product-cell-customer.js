import React from 'react'
import ProductIcon from "../../suppliers/editable-product/product-icon";
import PetIcon from "../pets/editable-pet/pet-icon";

const ProductCellCustomer = ({product, addAProductToCart}) => {
    return(
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
                <div className='col-3'>Category: <ProductIcon category={product.category.category}/>
                    {product.category.category}
                </div>
                <div className='col-3'>Animal: <PetIcon animal={product.animal.animal}/>
                    {product.animal.animal}
                </div>
                <div className='col-3'>
                    {
                        product.inventory === 0 &&
                        <i className="unavailable-warning
                                         float-right fas fa-exclamation-triangle">Unavailable</i>
                    }
                    <button
                        disabled={product.inventory === 0}
                        title={product.inventory === 0? 'Currently unavailable!': ""}
                        onClick={()=> addAProductToCart({product: product, quantity: 1})}
                        className='float-end btn btn-primary'>
                        Add
                    </button>
                </div>
            </div>
        </li>
    )
}

export default ProductCellCustomer