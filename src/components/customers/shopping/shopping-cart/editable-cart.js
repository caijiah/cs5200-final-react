import React, {useState} from 'react'
import PetIcon from "../../pets/editable-pet/pet-icon";
import ProductIcon from "../../../suppliers/editable-product/product-icon";

const EditableCart = ({pair, updateShoppingCart}) => {
    const [editing, setEditing] = useState(false)
    const [pairCache, setPairCache] = useState(pair)

    return (<>

            <li className='list-group-item'>
                <div className='row cart-body'>
                    <div className='col-6'>
                        <PetIcon animal={pairCache.product.animal.animal}/>
                        <ProductIcon category={pair.product.category.category}/>
                        <b>{pairCache.product.name}</b>
                        <br/>
                        by {pairCache.product.supplier.companyName}
                    </div>
                    {
                        editing &&
                        <>
                            <input className='col-4 cart-editor-typing'
                                   type='Number'
                                   min={0}
                                   onChange={(e) =>{
                                       if (e.target.value < 0) {
                                           alert("Quantity cannot be negative!")
                                           e.target.value = pairCache.quantity
                                       } else {
                                           setPairCache({...pairCache, quantity: e.target.value})
                                       }
                                   }
                                   }
                                   value={pairCache.quantity}/>
                            <div className='col-2 cart-editor-button'>
                                <i onClick={() => {
                                    setEditing(false)
                                    updateShoppingCart(pairCache)
                                }}
                                   className="float-end edit-button fa fa-check"/>
                                <i
                                    onClick={() => {
                                        updateShoppingCart({
                                            ...pairCache,
                                            quantity: 0
                                        })
                                    }}
                                    className="float-end edit-button fa fa-trash me-1"/>
                            </div>
                        </>
                    }
                    {!editing &&
                     <>
                         <div className='cart-editor col-3'>
                             {pair.quantity}
                         </div>
                         <div className='cart-editor-button col-3'>
                             <i className='float-end fa fa-cog edit-button'
                                onClick={() => {
                                    setEditing(true)
                                }}/>
                         </div>
                     </>
                    }
                </div>
            </li>
        </>
    )
}

export default EditableCart