import React, {useState} from "react";
import PetIcon from "../../customers/pets/editable-pet/pet-icon";
import ProductIcon from "./product-icon";

const EditableProduct = ({product, animals, categories, updateProduct, deleteProduct}) => {
    const [productCache, setProductCache] = useState(product)
    const [editing, setEditing] = useState(false)

    return (
        <>
            <div className='row'>
                {
                    !editing &&
                    <>
                        <div className='col-2'>
                            Name: {product.name}
                        </div>
                        <div className='col'>
                            Inventory: {product.inventory}
                        </div>
                        <div className='col-1'>
                            Price: ${product.price}
                        </div>
                        <div className='col-2'>
                            Weight: {product.weight} kg
                        </div>
                        <div className='col-2'>
                            {/*Category: */}
                            <ProductIcon
                                category={productCache.category.category}/>
                            {product.category.category}
                        </div>
                        <div className='col-2'>
                            {/*Animal:*/}
                            <PetIcon
                                animal={productCache.animal.animal}/>
                            {product.animal.animal}
                        </div>
                        <div className='col-1'>
                            <i className='float-end fa fa-cog edit-button fa-2x'
                               onClick={() => {
                                   setEditing(true)
                               }}/>
                        </div>
                    </>
                }
                {
                    editing &&
                    <>
                        <div className='col-2'>
                            <label>
                                Name:
                                <input value={productCache.name}
                                type='text'
                                onChange={(e) => {
                                    if (e.target.value.length > 40) {
                                        alert("Name is too long!")
                                    } else {
                                        setProductCache({
                                            ...productCache,
                                            name: e.target.value
                                        })
                                    }
                                }}
                                className='form-control col-2 me-3'/>
                            </label>
                        </div>
                        <div className='col'>
                            <label>
                                Inventory:
                                <input value={productCache.inventory}
                                       type='number'
                                       min="0"
                                       onChange={(e) => {
                                           if (e.target.value <= 0) {
                                               alert("Cannot set inventory to zero")
                                           } else {
                                               setProductCache({
                                                               ...productCache,
                                                               inventory: e.target.value
                                                           })
                                           }
                                       }}
                                       className="form-control col mb-3"/>
                            </label>
                        </div>
                        <div className='col-1'>
                            <label>
                                Price: $
                                <input value={productCache.price}
                                       type='number'
                                       min="0"
                                       onChange={(e) => {
                                           if (e.target.value <= 0) {
                                               alert("Cannot set price to zero")
                                           } else {
                                               setProductCache({
                                                                   ...productCache,
                                                                   price: e.target.value
                                                               })
                                           }
                                       }}
                                       className="form-control col-1 mb-3"/>
                            </label>
                        </div>
                        <div className='col-2'>
                            <label>
                                Weight (kg):
                                <input value={productCache.weight}
                                       type='number'
                                       min="0"
                                       onChange={(e) => {
                                           if (e.target.value <= 0) {
                                               alert("Cannot set weight to zero")
                                           } else {
                                               setProductCache({
                                                                   ...productCache,
                                                                   weight: e.target.value
                                                               })
                                           }
                                       }}
                                       className="form-control col-2 mb-3"/>
                            </label>
                        </div>
                        <div className='col-2'>
                            <label>
                                Category:
                                <select
                                    onChange={(e) => {
                                        setProductCache({
                                                            ...productCache,
                                                            category: categories.find(matching => {
                                                                if (matching._id === e.target.value) {
                                                                    return matching
                                                                }
                                                                return undefined
                                                            })
                                                        })
                                    }}
                                    value={productCache.category._id}
                                    className="form-select">
                                    <option value="none" disabled>
                                        Select a category
                                    </option>
                                    {
                                        categories.map((category, index) => {
                                            return (<option
                                                key={index}
                                                value={category._id}>{category.category}</option>)
                                        })
                                    }
                                </select>
                            </label>
                        </div>
                        <div className='col-2'>
                            <label>
                                Animal type:
                                <select
                                    onChange={(e) => {
                                        setProductCache({
                                                        ...productCache,
                                                        animal: animals.find(matching => {
                                                            if (matching._id === e.target.value) {
                                                                return matching
                                                            }
                                                            return undefined
                                                        })
                                                    })
                                    }}
                                    value={productCache.animal._id}
                                    className="form-select">
                                    <option value="none" disabled>
                                        Select animal type
                                    </option>
                                    {
                                        animals.map((animal, index) => {
                                            return (<option
                                                key={index}
                                                value={animal._id}>{animal.animal}</option>)
                                        })
                                    }
                                </select>
                            </label>
                        </div>
                        <div className='col-1 up-del-buttons'>
                            <i onClick={() => {
                                setEditing(false)
                                updateProduct(productCache)
                            }}
                               className="float-end fa fa-2x fa-check"/>
                            <i
                                onClick={() => {
                                    deleteProduct(productCache)
                                }}
                                className="float-end fa fa-2x fa-trash me-1"/>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default EditableProduct