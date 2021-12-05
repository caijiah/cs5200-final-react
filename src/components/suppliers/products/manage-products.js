import React, {useEffect, useState} from "react";
import userService from "../../../services/user-services";
import {useNavigate} from "react-router-dom";
import categoryService from "../../../services/category-services";
import animalService from "../../../services/animal-services";
import productService from "../../../services/product-services";
import ProductList from "../product-list/product-list";

const ManageProducts = () => {
    const navigate = useNavigate()
    const [supplierInfo, setSupplierInfo] = useState({
                                                         companyName: ''
                                                     })
    const [productCategories, setProductCategories] = useState([])
    const [supplierId, setSupplierId] = useState('')
    const [animalsTypes, setAnimalTypes] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedAnimal, setSelectedAnimal] = useState('')
    const [productsCache, setProductsCache] = useState([])

    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [weight, setWeight] = useState(0)
    const [productName, setProductName] = useState('')

    useEffect(() => {
        userService.profile()
            .catch(error => {
                alert("Not logged in as a Seller!")
                navigate('/')
            })
            .then(profile => {
                setSupplierInfo(profile)
                setSupplierId(profile._id)
                productService.findProductsForSupplier(profile._id)
                    .then(products => {
                        if (products) {
                            setProductsCache(products)
                        }
                    })
            })

        categoryService.findAllProductCategory()
            .then(res => {
                setProductCategories(res)
            })

        animalService.findAllAnimalsType()
            .then(res => {
                setAnimalTypes(res)
            })
    }, [navigate])

    const handAddProduct = () => {
        if (selectedCategory !=='None' || selectedCategory !== '' || selectedAnimal !== '') {
            if (quantity === 0 || price === 0 || weight === 0) {
                alert("Please check your product quantity, price and wight! They cannot be 0!")
                return
            }
            const newProduct = {
                animal: selectedAnimal,
                category: selectedCategory,
                supplier: supplierId,
                name: productName,
                inventory: quantity,
                price: price,
                weight: weight
            }
            productService.createProduct(newProduct)
                .then((createdProduct) => {
                    setProductsCache([...productsCache, createdProduct])
                })
        } else {
            alert("You have to select a your product category and for what animal!")
        }
    }

    const updateProduct = (updatedProduct) => {
        updatedProduct.supplier = supplierId
        productService.updateProduct(updatedProduct._id, updatedProduct)
            .then(res => {
                let updatedProducts = productsCache.map(product => {
                    if (product._id === updatedProduct._id) {
                        return updatedProduct
                    } else {
                        return product
                    }
                })
                setProductsCache(updatedProducts)
            })
    }

    const deleteProduct = (deletedProduct) => {
        productService.deleteProduct(deletedProduct._id)
            .then(res => {
                let updatedProducts = productsCache.filter((product) => {
                    if (product._id !== deletedProduct._id) {
                        return product
                    }
                    return null
                })
                setProductsCache(updatedProducts)
            })
    }

    return (
        <>
            <div>
                <h1>Brand: {supplierInfo.companyName}</h1>
            </div>

            <br/>

            <div className='row'>
                <h3 className='col-6'>
                    <i className="fas fa-hand-holding-usd"/>
                    Total Revenue: ${supplierInfo.revenue}
                </h3>
            </div>
            <br/>
            <div className='row'>
                <h2 className='col-10'> Add a new product:</h2>
            </div>
            <div className='row'>
                <div className='col-3'><label htmlFor='select-product-cate'>Select product
                    category:</label></div>
                <div className='col-3'><label htmlFor='select-animal-type'>Select animal
                    type:</label></div>
                <div className='col-3'>
                    <label htmlFor='product-name'>Product name:</label>
                </div>
            </div>
            <div className='row'>

                <div className='col-3'>
                    <select
                        id='select-product-cate'
                        onChange={(e) => {
                            setSelectedCategory(e.target.value)
                        }}
                        defaultValue={'none'}
                        className="form-select">
                        <option value="none" disabled>
                            Select product category
                        </option>
                        {
                            productCategories.map((category, index) => {
                                return (<option
                                    key={index}
                                    value={category._id}>{category.category}</option>)
                            })
                        }
                    </select>
                </div>

                <div className='col-3'>
                    <select
                        id='select-animal-type'
                        defaultChecked={"Please select the animal type"}
                        onChange={(e) => {
                            setSelectedAnimal(e.target.value)
                        }}
                        disabled={selectedCategory === ""}
                        title={"Please select a drink type first!"}
                        defaultValue={'none'}
                        className="form-select">
                        <option value="none" disabled>
                            Select animal type
                        </option>
                        {
                            animalsTypes.map((animal, index) => {
                                return (<option
                                    key={index}
                                    value={animal._id}>{animal.animal}</option>)
                            })
                        }
                    </select>
                </div>
                <div className='col-3'>
                    <input id='product-name'
                           type='text'
                           className='form-control'
                           value={productName}
                           name='product name'
                           onChange={(e) => {
                               if (e.target.value.length > 40) {
                                   alert('Product name is too long!')
                               } else {
                                   setProductName(e.target.value)
                               }
                           }
                           }

                    />
                </div>
            </div>

            <div className='row'>
                <div className='col-3'>
                    <label htmlFor="quantity"> Quantity: </label>
                    <input type="number"
                           id="quantity"
                           min='0'
                           value={quantity}
                           onChange={(e) =>
                               setQuantity(e.target.value)}
                           className='form-control'
                           name="quantity"/>
                </div>
                <div className='col-3'>
                    <label htmlFor="price"> Price: </label>
                    <input type="number"
                           className='form-control'
                           id="price"
                           min='0'
                           value={price}
                           onChange={(e) =>
                               setPrice(e.target.value)}
                           name="price"/>
                </div>
                <div className='col-3'>
                    <label htmlFor="weight"> Weight: </label>
                    <input type="number"
                           className='form-control'
                           id="weight"
                           min='0'
                           value={weight}
                           onChange={(e) =>
                               setWeight(e.target.value)}
                           name="weight"/>
                </div>
                <div className='col-3'>
                    <button
                        onClick={handAddProduct}
                        className="btn btn-success btn-block"><i
                        className="fas fa-plus-circle mr-1"/>
                        Add a product
                    </button>
                </div>
            </div>
            <br/>

            {
                productsCache.length === 0 &&
                <h5>No products on record, you can add products here.</h5>
            }

            {
                productsCache.length !== 0 &&
                <ProductList products={productsCache}
                             animals={animalsTypes}
                             updateProduct={updateProduct}
                             deleteProduct={deleteProduct}
                             categories={productCategories}/>
            }
        </>
    )
}

export default ManageProducts