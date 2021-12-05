const PRODUCT_URL = process.env.REACT_APP_API_URL

const findProductsForSupplier = (supplierId) =>
    fetch(`${PRODUCT_URL}/products/forSupplier`, {
        method: 'POST',
        body: JSON.stringify({supplierId}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))

const updateProduct = (productId, product) =>
    fetch(`${PRODUCT_URL}/products/updateProduct`, {
        method: 'PUT',
        body: JSON.stringify({productId, product}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))

const createProduct = (product) =>
    fetch(`${PRODUCT_URL}/products/createProduct`, {
        method: 'POST',
        body: JSON.stringify({product}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))

const deleteProduct = (productId) =>
    fetch(`${PRODUCT_URL}/products`, {
        method: 'DELETE',
        body: JSON.stringify({productId}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log(error))

const findAllProducts = () =>
    fetch(`${PRODUCT_URL}/products`)
        .then(res => res.json())

const findAllBrands = () =>
    fetch(`${PRODUCT_URL}/products/brands`)
        .then(res => res.json())

const findProductsByAnimalType = (byAnimal) =>
    fetch(`${PRODUCT_URL}/products/animal/${byAnimal}`)
        .then(res => res.json())

const findProductsByCategoryId = (byCategory) =>
    fetch(`${PRODUCT_URL}/products/category/${byCategory}`)
        .then(res => res.json())

const productService = {
    findProductsForSupplier,
    updateProduct,
    createProduct,
    deleteProduct,
    findAllProducts,
    findAllBrands,
    findProductsByAnimalType,
    findProductsByCategoryId
}

export default productService