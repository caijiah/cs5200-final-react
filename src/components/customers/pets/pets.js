import React, {useEffect, useState} from "react";
import userService from "../../../services/user-services";
import {useNavigate} from "react-router-dom";
import animalService from "../../../services/animal-services";
import petService from "../../../services/pet-services";
import './pets.css'
import PetList from "./pet-list/pet-list";

const Pets = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('');
    const [petsCache, setPetsCache] = useState([])
    const [animalsCache, setAnimalsCache] = useState([])
    const [selectedAnimal, setSelectedAnimal] = useState('')

    useEffect(() => {
        userService.profile()
            .catch((error) => {
                alert("Not logged in!")
                navigate('/')
            })
            .then((profile) => {
                if (profile) {
                    setUserId(profile._id)
                    petService.findPetsByUserId(profile._id)
                        .then(pets => {
                            console.log(pets)
                            if (pets) {
                                setPetsCache(pets)
                            }
                        })
                }
            })

        animalService.findAllAnimalsType()
            .then(animals => {
                console.log(animals)
                setAnimalsCache(animals)
            })
    }, [navigate])




    return (
        <>
            <div>
                <h2>My pets</h2>
                <br/>

                <div className='row'>
                    <h3 className='col-10'> Add your pet:</h3>
                </div>
                <div className='row'>
                    <div className='col-4'>
                        <select
                            onChange={(e) => {
                                console.log(e.target.value)
                                setSelectedAnimal(e.target.value)
                            }}
                            defaultValue={'none'}
                            className="form-control">
                            <option value="none" disabled>
                                Select a type
                            </option>
                            {
                                animalsCache.map((animal, index) => {
                                    return (<option
                                        key={index}
                                        value={animal._id}>{animal.animal}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className='col-4'>
                        <button
                            // onClick={handleAddADrink}
                            className="btn btn-success btn-block"><i
                            className="fas fa-plus-circle me-1"/>
                            Add a Pet
                        </button>
                    </div>
                </div>
                <br/>
                {
                    petsCache.length === 0 &&
                    <h5>No pets on record, you can add your pets.</h5>
                }

                {
                    petsCache.length !== 0 &&
                    <PetList petList={petsCache}
                             animals={animalsCache}/>
                }
            </div>
        </>
    )
}

export default Pets