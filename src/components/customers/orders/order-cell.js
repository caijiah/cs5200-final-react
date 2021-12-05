import React from 'react'
import PetIcon from "../pets/editable-pet/pet-icon";
import ProductIcon from "../../suppliers/editable-product/product-icon";

const OrderCell = ({order, num}) => {
    return (
        <>
            <li className='list-group-item order-cell-style'>
                <h3>Order {num}</h3>
                {
                    order.products.map((product, index) => {
                        let getProduct = product.product
                        return (
                            <div className="container"
                                 key={product._id}>
                                <div className='row'>
                                    <h5 className='col-sm'>
                                        Product {index+1}:
                                        <span className='me-2'/>
                                        <PetIcon animal={getProduct.animal.animal}/>
                                        <ProductIcon category={getProduct.category.category}/>
                                    </h5>
                                </div>
                                <div className="row">
                                    <div className="col-sm">
                                        <b>{getProduct.name }</b>
                                        <span className='me-2'/>
                                        from {getProduct.supplier.companyName}
                                    </div>
                                    <div className="col-sm">
                                        Quantity: {product.quantity}
                                    </div>
                                    <div className="col-sm">
                                        Unit Price: ${getProduct.price}
                                    </div>
                                </div>
                                <br/>
                            </div>
                        )
                    })
                }
                <b> Total Price: ${order.totalPrice}</b>
                <br/>
                <b> Order Date: {new Date(order.created).toDateString()}</b>
            </li>
        </>
    )
}

export default OrderCell