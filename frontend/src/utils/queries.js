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

const getSubscriptionMain = (id) => {
    return `query { 
        getSubscription(id: "${id}") {
            Teams {
              id
              Name
              Place
              Points
              Form
              League {
                id
                Name
                Sport {
                  id
                  Name
                }
              }
            }
        }
    }`
}

export {
    getSports, 
    getLeagues,
    getTeams,
    getSubscription,
    getSubscriptionMain
}