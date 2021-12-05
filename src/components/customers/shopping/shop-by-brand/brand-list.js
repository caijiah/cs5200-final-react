import React, {useEffect, useState} from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import productService from "../../../../services/product-services";
import ShopByBrand from "./shop-by-brand";


const BrandList = ({addAProductToCart}) => {
    const [key, setKey] = useState('')
    const [allBrands, setAllBrands] = useState([])
    const [selectedBrand, setSelectedBrand] = useState('')
    const [selectedBrandName, setSelectedBrandName] = useState('')

    useEffect(() => {
        productService.findAllBrands().then(brands=> {
            setAllBrands(brands)
        })
    }, [])

    const findStoreName = (supplierId) => {
        const found = allBrands.find((supplier) => supplier._id === supplierId)
        return found.supplier.companyName
    }

    return(
        <>
            <br/>
            <br/>
            <Tab.Container id="left-tabs-example" defaultActiveKey={key}
                           activeKey={key}
                           onSelect={(k) => {
                               setKey(k)
                               setSelectedBrand(k)
                               setSelectedBrandName(findStoreName(k))
                           }}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column" onSelect={k => setKey(k)}>
                            {
                                allBrands.map((supplier) => {
                                    const brand = supplier.supplier
                                    return (
                                        <Nav.Item key={supplier._id}>
                                            <Nav.Link
                                                eventKey={supplier._id}>{brand.companyName}</Nav.Link>
                                        </Nav.Item>
                                    )
                                })
                            }
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        {
                            selectedBrand !== '' &&
                            <ShopByBrand
                                selectedBrandName={selectedBrandName}
                                addAProductToCart={addAProductToCart}
                                selectedBrand={selectedBrand}/>
                        }
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default BrandList