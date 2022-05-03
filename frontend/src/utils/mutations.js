'use strict';

const getLogin = (user, pass) => {
    return `mutation {
        login(Username: "${user}", Password: "${pass}") {
            id
            Username
            Token
        }}`
}

const getRegister = (user, pass) => {
    return `mutation {
        registerUser(Username: "${user}", Password: "${pass}") {
            id
            Username
            Token
        }}`
}

export {
    getLogin,
    getRegister
}