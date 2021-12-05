import React, {useEffect, useState} from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import categoryService from "../../../../services/category-services";
import ShopByCategory from "./shop-by-category";


const CategoryList = ({addAProductToCart}) => {
    const [key, setKey] = useState('')
    const [allCategories, setAllCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedCategoryName, setSelectedCategoryName] = useState('')

    useEffect(() => {
        categoryService.findAllProductCategory()
            .then(categories => {
                setAllCategories(categories)
            })
    }, [])

    const findCategoryName = (categoryId) => {
        const found = allCategories.find((category) => category._id === categoryId)
        return found.category
    }

    return(
        <>
            <br/>
            <br/>
            <Tab.Container id="left-tabs-example" defaultActiveKey={key}
                           activeKey={key}
                           onSelect={(k) => {
                               setKey(k)
                               setSelectedCategory(k)
                               setSelectedCategoryName(findCategoryName(k))
                           }}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column" onSelect={k => setKey(k)}>
                            {
                                allCategories.map((category) => {
                                    return (
                                        <Nav.Item key={category._id}>
                                            <Nav.Link
                                                eventKey={category._id}>{category.category}</Nav.Link>
                                        </Nav.Item>
                                    )
                                })
                            }
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        {
                            selectedCategory !== '' &&
                            <ShopByCategory
                                selectedCategoryName={selectedCategoryName}
                                addAProductToCart={addAProductToCart}
                                selectedCategory={selectedCategory}/>
                        }
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default CategoryList