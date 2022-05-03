'use strict';
const getSports = () => {
    return `query { 
        sports {
            id
            Name
        }
    }`
}
const getLeagues = (sport) => {
    return `query { 
        leagues(sportID: "${sport}") {
            id
            Name
        }
    }`
}

const getTeams = (league) => {
    return `query { 
        teams(leagueID: "${league}") {
            id
            Name
        }
    }`
}

const getSubscription = (id) => {
    return `query { 
        user(id: "${id}") {
            Subscription {
                Teams {
                    id
                    Name
                }
                id
            }
        }
    }`
}
export {
    getSports, 
    getLeagues,
    getTeams,
    getSubscription
}