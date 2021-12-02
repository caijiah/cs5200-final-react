import React from 'react'
import EditablePet from "../editable-pet/editable-pet";

const PetList = ({petList, animals, updatePet, deletePet}) => {
    return (
        <ul className='list-group'>
            {
                petList.map((pet) =>
                    <li key={pet._id}
                        className='list-group-item'>
                        <EditablePet pet={pet} animals={animals}/>
                    </li>
                )
            }
        </ul>
    )
}

export default PetList