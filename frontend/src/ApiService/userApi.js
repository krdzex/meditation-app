import url from "../config/config.js"
const headers = { "Accept": "application/json", "Content-Type": "application/json" };

const createUser = (user) => {
    console.log(user)
    return fetch(`${url}/api/users`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(err => console.log(err))
}

const listUsers = () => {
    return fetch(`${url}/api/users`, {
        method: "GET",
    }).then(response => response.json()).catch(err => console.log(err))
}

const userInfo = (id) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "GET",
        headers: headers,
    }).then(response => response.json()).catch(err => console.log(err))
}
const updateUser = (id, data) => {
    return fetch(`${url}/api/users/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}

const updatePassword = (id, data) => {
    return fetch(`${url}/api/users/password/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data)
    }).then(response => response.json()).catch(err => console.log(err))
}

const updateTime = (id, time) => {
    return fetch(`${url}/api/users/time/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ time: time })
    }).then(response => response.json()).catch(err => console.log(err))
}

export { createUser, listUsers, userInfo, updateUser, updatePassword, updateTime }