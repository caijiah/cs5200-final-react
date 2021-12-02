const PET_URL = process.env.REACT_APP_API_URL

const findPetsByUserId = (userId) => {
    return fetch(`${PET_URL}/pets`, {
        method: 'POST',
        body: JSON.stringify({userId: userId}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))
}

const updatePet = (petId, newPet) =>
    fetch(`${PET_URL}/pets/updatePet`, {
        method: 'PUT',
        body: JSON.stringify({petID: petId, petUpdate: newPet}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))

const deletePet = (petId) =>
    fetch(`${PET_URL}/pets/${petId}`, {
        method: 'DELETE'
    }).then(res => res.json())
        .catch(error => console.log(error))

const createPet = (newPet) =>
    fetch(`${PET_URL}/pets/createPet`, {
        method: 'POST',
        body: JSON.stringify({newPet}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))

const petService = {
    findPetsByUserId,
    updatePet,
    createPet,
    deletePet
}

export default petService