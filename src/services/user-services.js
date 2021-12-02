const USER_URL = process.env.REACT_APP_API_URL

const register = (user) =>
    fetch(`${USER_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())
        .catch((error) => console.log(error))

const login = (user) =>
    fetch(`${USER_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

const profile = () =>
    fetch(`${USER_URL}/profile`, {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())

const logout = () =>
    fetch(`${USER_URL}/logout`, {
        method: 'POST',
        credentials: "include"
    })

const updateUserInfo = (userProfile) =>
    fetch(`${USER_URL}/profile`, {
        method: 'PUT',
        credentials: "include",
        body: JSON.stringify(userProfile),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => {
        return response.json()
    })

const userService = {
    register,
    login,
    profile,
    logout,
    updateUserInfo
}

export default userService