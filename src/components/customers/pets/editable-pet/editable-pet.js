import React, {useState} from "react";
import PetIcon from "./petIcon";

const EditablePet = ({pet, animals, updatePet, deletePet}) => {
    const [petCache, setPetCache] = useState(pet)
    const [editing, setEditing] = useState(false)
    return (
        <>
            <div className='row'>
                {
                    !editing &&
                    <>
                        <div className='col-3'>
                            <PetIcon animal={petCache.animal.animal}/>
                            Name: {petCache.name}
                        </div>
                        <div className='col-2'>
                            Age: {petCache.age}
                        </div>
                        <div className='col-3'>
                            Breed: {petCache.breed}
                        </div>
                        <div className='col-2'>
                            Gender: {petCache.gender}
                        </div>
                        <div className='col-2'>
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
                        <div className='col-3'>
                            <label>
                                Name:
                                <input value={petCache.name}
                                       type='text'
                                       onChange={(e) => {
                                           if (e.target.value.length > 20) {
                                               alert("Name is too long!")
                                               setEditing(false)
                                           } else {
                                               setPetCache({
                                                               ...petCache,
                                                               name: e.target.value
                                                           })
                                           }
                                       }}
                                       className="form-control me-3"/>
                            </label>
                        </div>
                        <div className='col-1'>
                            <label>
                                Age:
                                <input value={petCache.age}
                                       type='number'
                                       min="0"
                                       onChange={(e) => {
                                           if (e.target.value < 0) {
                                               alert("Cannot set price to negative")
                                               setEditing(false)
                                           } else {
                                               setPetCache({
                                                            ...petCache,
                                                            age: e.target.value
                                                        })
                                           }
                                       }}
                                       className="form-control mb-3"/>
                            </label>
                        </div>

                        <div className='col-2'>
                            <label>
                                Breed:
                                <input value={petCache.breed}
                                       type='text'
                                       onChange={(e) => {
                                           if (e.target.value.length > 20) {
                                               alert("Breed is too long!")
                                               setEditing(false)
                                           } else {
                                               setPetCache({
                                                               ...petCache,
                                                               breed: e.target.value
                                                           })
                                           }
                                       }}
                                       className="form-control me-3"/>
                            </label>
                        </div>
                        <div className='col-2'>
                            <label>
                                Gender:
                                <select
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setPetCache({
                                                        ...petCache,
                                                        gender: e.target.value
                                                        })
                                    }}
                                    value={petCache.gender}
                                    className="form-control">
                                    <option value="none" disabled>
                                        Select a type
                                    </option>
                                    <option value="male">
                                        male
                                    </option>
                                    <option value="female">
                                        female
                                    </option>
                                </select>
                            </label>
                        </div>
                        <div className='col-2'>
                            <label>
                                Type:
                                <select
                                    onChange={(e) => {
                                        console.log(e.target.value)
                                        setPetCache({
                                                        ...petCache,
                                                        animal: animals.find((matching)=> {
                                                            if (matching._id === e.target.value) {
                                                                return matching
                                                            }
                                                        })
                                                    })
                                    }}
                                    value={petCache.animal._id}
                                    className="form-control">
                                    <option value="none" disabled>
                                        Select a type
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


                        <div className='col-2 up-del-buttons'>
                            <i onClick={() => {
                                setEditing(false)
                                // updateProduct(productCache)
                            }}
                               className="float-end fa fa-2x fa-check"/>
                            <i
                                onClick={() => {
                                    // deleteProduct(productCache)
                                }}
                                className="float-end fa fa-2x fa-trash me-1"/>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default EditablePet