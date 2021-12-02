const ANIMAL_URL = process.env.REACT_APP_API_URL

const findAllAnimalsType = () =>
    fetch(`${ANIMAL_URL}/animals`)
        .then((res) => res.json())


const animalService = {
    findAllAnimalsType
}

export default animalService