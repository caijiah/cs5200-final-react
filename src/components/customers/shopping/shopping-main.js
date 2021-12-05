import React, {useEffect, useState} from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import ShoppingCart from "./shopping-cart/shopping-cart";
import userService from "../../../services/user-services";
import ShopAllProducts from "./all-products/shop-all-products";
import orderService from "../../../services/order-services";
import BrandList from "./shop-by-brand/brand-list";
import CategoryList from "./shop-by-category/category-list";
import AnimalList from "./shop-by-animal/animal-list";

const ShoppingMain = () => {
    const navigate = useNavigate()
    const {shopBy} = useParams()
    const [key, setKey] = useState()
    const [shoppingCartCache, setShoppingCartCache] = useState({items: []})
    const [customerId, setCustomerId] = useState('')

    useEffect(() => {
        setKey(shopBy)
        userService.profile()
            .catch(error => {
                alert("Not logged in!")
                navigate('/')
            })
            .then(profile => {
                if (profile) {
                    setCustomerId(profile._id)
                    userService.findCustomerShoppingCart(profile._id)
                        .then(response => {
                            setShoppingCartCache(response.shoppingCart)
                        })
                }
            })
    }, [navigate, shopBy])

    const addAProductToCart = (pair) => {
        const getProduct = pair.product
        const getQuantity = pair.quantity
        let currItems = shoppingCartCache.items
        const inShoppingCart = currItems.find((existing) => {
            if (existing.product._id === getProduct._id) {
                return existing
            }
            return null
        })

        if (inShoppingCart) {
            // if the product is existing, then simply increment the quantity by 1
            pair.quantity = inShoppingCart.quantity + getQuantity
            updateShoppingCart(pair)
        } else {
            // if not, add it to shoppingCart
            let newItems = [...shoppingCartCache.items, pair]
            // need update totalPrice
            let addOnPrice = pair.product.price * pair.quantity
            let newPrice = shoppingCartCache.totalPrice + addOnPrice
            // newShoppingCart
            let newShoppingCart = {totalPrice: newPrice, items: newItems}
            userService.updateCustomerShoppingCart(customerId, newShoppingCart)
                .then(status => setShoppingCartCache(newShoppingCart))
        }
    }

    const updateShoppingCart = (pair) => {
        const getProduct = pair.product
        if (pair.quantity === '') {
            pair.quantity = 0
        }
        const getQuantity = parseInt(pair.quantity)

        // copy the shopping cart, so that we don't directly
        // work on cached shopping cart
        let newItems = [...shoppingCartCache.items]
        const inShoppingCart = newItems.find((existing) => {
            if (existing.product._id === getProduct._id) {
                return existing
            }
            return null
        })

        // calculate the new total price
        let newPrice = shoppingCartCache.totalPrice
        if (getQuantity > inShoppingCart.quantity) {
            // get more quantity, we need add
            newPrice += pair.product.price * (pair.quantity - inShoppingCart.quantity)
        } else {
            // get less quantity, we need reduce
            newPrice -= pair.product.price * (inShoppingCart.quantity - pair.quantity)
        }

        let newShoppingCart
        if (getQuantity === 0) {
            // remove item with quantity 0
            const updatedItems = newItems.filter((existing) => {
                return existing.product._id !== getProduct._id
            })
            newShoppingCart = {totalPrice: newPrice, items: updatedItems}
        } else {
            inShoppingCart.quantity = getQuantity
            newShoppingCart = {totalPrice: newPrice, items: newItems}
        }
        userService.updateCustomerShoppingCart(customerId, newShoppingCart)
            .then(status => setShoppingCartCache(newShoppingCart))
    }

    const payOrder = () => {
        if (shoppingCartCache.items.length !== 0) {
            orderService.finishCurrentOrder(customerId)
                .then((status) => {
                    alert("Successful place the order!")
                    window.location.reload()
                })
                .catch((error) => {
                    alert("Fail to place the order! Some items may not be available!")
                    window.location.reload()
                })
        } else {
            alert("Shopping cart is empty!")
        }
    }

    return (
        <div>
            <Tab.Container defaultActiveKey={key}
                           activeKey={key}
                           onSelect={(k) => {
                               switch (k) {
                                   case 'orders':
                                       navigate('/orders')
                                       break;
                                   default:
                                       setKey(k)
                                       navigate(`/shopping/${k}`)
                               }
                           }}>
                <Row>
                    <Col sm={8}>
                        <div className='edit-button'
                             onClick={() => navigate('/')}>
                            <i className='fas fa-home'/>
                            Back to Home
                        </div>
                        <h1> Welcome to Shopping Page</h1>
                        <br/>
                        <Nav className='ms-1 flex-row'
                             variant='tabs'>
                            <Nav.Item>
                                <Nav.Link eventKey='products'>All Products</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='brands'>Brands</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='animal'>Shop by Animal</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='category'>Shop by Category</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey='orders'>Orders</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="brands">
                                <BrandList
                                    addAProductToCart={addAProductToCart}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="products">
                                <ShopAllProducts
                                    addAProductToCart={addAProductToCart}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="animal">
                                <AnimalList addAProductToCart={addAProductToCart}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="category">
                                <CategoryList
                                    addAProductToCart={addAProductToCart}/>
                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                    <Col sm={4}>
                        <ShoppingCart
                            shoppingCartCache={shoppingCartCache}
                            updateShoppingCart={updateShoppingCart}
                        />
                        <br/>
                        <button
                            onClick={() => payOrder()}
                            className='float-right btn btn-success'><i
                            className="fas fa-cash-register me-1"/>Pay
                        </button>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default ShoppingMain