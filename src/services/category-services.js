const CATEGORY_URL = process.env.REACT_APP_API_URL

const findAllProductCategory = () =>
    fetch(`${CATEGORY_URL}/categories`)
        .then(res => res.json())

const categoryService = {
    findAllProductCategory
}

export default categoryService