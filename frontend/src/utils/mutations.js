'use strict';

const getLogin = (user, pass) => {
    console.log(user, pass)
    return `mutation {
        login(Username: "${user}", Password: "${pass}") {
            id
            Username
            Subscription {
                id
            }
            Token
        }}`
}

const getRegister = (user, pass) => {
    return `mutation {
        registerUser(Username: "${user}", Password: "${pass}") {
            id
            Username
            Token
            Subscription {
                id
            }
        }}`
}

export {
    getLogin,
    getRegister
}