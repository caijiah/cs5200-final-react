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

    const handleCreatePet = () => {
        if (selectedAnimal === '' || selectedAnimal === undefined) {
            alert("You have to choose an animal type for you pet!")
        } else {
            const newPet = {
                animal: selectedAnimal,
                name: "newPet",
                gender: "none",
                age: 0,
                breed: 'pet breed',
                owner: userId
            }

            petService.createPet(newPet)
                .then((createdPet) => {
                    console.log('created', createdPet)
                    setPetsCache([...petsCache, createdPet])
                })
        }
    }

    const handleDeletePet = (deletedPet) => {
        petService.deletePet(deletedPet._id)
            .then(res => {
                let updatedPets = petsCache.filter(pet => {
                    return pet._id !== deletedPet._id
                })
                setPetsCache(updatedPets)
            })
    }

    const handleUpdatePet = (updatedPet) => {
        petService.updatePet(updatedPet._id, updatedPet)
            .then(res => {
                let updatedPets = petsCache.map(pet => {
                    if (pet._id === updatedPet._id) {
                        return updatedPet
                    } else {
                        return pet
                    }
                })
                setPetsCache(updatedPets)
            })
    }

    return (
        <>
            <div>
                <h2>My pets</h2>
                <br/>

                <div className='row'>
                    <h3 className='col-10'> Add your pet:</h3>
                </div>
                <div className='row'>
                    <label
                    htmlFor='select-animal-type'>Animal type:</label>
                    <div className='col-4'>
                            <select
                                id='select-animal-type'
                                onChange={(e) => {
                                    console.log(e.target.value)
                                    setSelectedAnimal(e.target.value)
                                }}
                                defaultValue={'none'}
                                className="form-select">
                                <option value="none" disabled>
                                    Select animal type
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
                            onClick={handleCreatePet}
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
                             animals={animalsCache}
                             updatePet={handleUpdatePet}
                             deletePet={handleDeletePet}/>
                }
            </div>
        </>
    )
}

export default Pets