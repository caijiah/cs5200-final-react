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


const petService = {
    findPetsByUserId
}

export default petService