import React, {useEffect, useState} from "react";
import animalService from "../../../../services/animal-services";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import ShopByAnimal from "./shop-by-animal";

const AnimalList = ({addAProductToCart}) => {
    const [key, setKey] = useState('')
    const [allAnimalTypes, setAllAnimalTypes] = useState([])
    const [selectedAnimal, setSelectedAnimal] = useState('')
    const [selectedAnimalName, setSelectedAnimalName] = useState('')

    useEffect(()=> {
        animalService.findAllAnimalsType()
            .then(types => {
                setAllAnimalTypes(types)
            })
    }, [])

    const findAnimalName = (animalId) => {
        const found = allAnimalTypes.find((animal) => animal._id === animalId)
        return found.animal
    }

    return (
        <>
            <br/>
            <br/>
            <Tab.Container id="left-tabs-example" defaultActiveKey={key}
                           activeKey={key}
                           onSelect={(k) => {
                               setKey(k)
                               setSelectedAnimal(k)
                               setSelectedAnimalName(findAnimalName(k))
                           }}>
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column" onSelect={k => setKey(k)}>
                            {
                                allAnimalTypes.map((animal) => {
                                    return (
                                        <Nav.Item key={animal._id}>
                                            <Nav.Link
                                                eventKey={animal._id}>{animal.animal}</Nav.Link>
                                        </Nav.Item>
                                    )
                                })
                            }
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        {
                            selectedAnimal !== '' &&
                            <ShopByAnimal
                                selectedAnimalName={selectedAnimalName}
                                addAProductToCart={addAProductToCart}
                                selectedAnimal={selectedAnimal}/>
                        }
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default AnimalList