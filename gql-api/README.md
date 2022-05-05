# Example Queries:

### example variables used:
### Empty ones needs to be filled e.g with response ones
`
{ "username": null,
  "password": null,
  "deleteSubscriptionId": null
  "userID": null,
  "sportId": "6261176df8fe4168e434340f",
  "leagueId": null,
  "teamId": null,
  "subscriptionId": null,
  "teams": [],
  "sportName", null,
  "deleteTeamId", null
}
`

## Mutation Register User:
`mutation RegisterUser($username: String!, $password: String!) {
  registerUser(Username: $username, Password: $password) {
    id
    Username
    Subscription {
      id
      Teams {
        id
      }
    }
    Token
  }
}
`

## Mutation Login User:
`
mutation LoginUser($username: String!, $password: String!) {
  login(Username: $username, Password: $password) {
    id
    Username
    Subscription {
      id
      Teams {
        Name
      }
    }
    Token
  }
}
`

### Authentication needed for below queries/mutations:
`
headers: {
    "Content-type": "application/json",
    'Authorization': "Bearer {JWT TOKEN}"
}
`

### Or optionally add this bearer token in e.g postman to check it

## Mutation Delete user:
`
mutation DeleteUser($userID: ID!) {
  deleteUser(id: $userID) {
    id
    Username
    Subscription {
      id  
    }
  }
}
`

## Mutation Delete Subscription:
`
deleteSubscription(id: $deleteSubscriptionId) {
    id
}
`

## Query Sports:
`
query Sports {
  sports {
    id
    Name
  }
}
`

## Query Leagues:
`
leagues(sportID: $sportId) {
    id
    Name
    LatestUpdate
    Sport {
      Name
    }
}
`

## Query Teams:
`
teams(leagueID: $leagueId) {
    id
    Name
    Link
    Matches
    Place
    Wins
    Draws
    Losses
    Goals
    Points
    NextMatch
    NextMatchHour
    Form
    League {
      Name
    }
  }
`

## Query Team:
`
team(id: $teamId) {
    id
    Name
    Link
    Matches
    Place
    Wins
    Draws
    Losses
    Goals
    Points
    NextMatch
    NextMatchHour
    Form
    League {
      Name
    }
  }
`

## Query User:
`
user(id: $userId) {
    id
    Username
    Subscription {
      id
      Teams
    }
    Token
  }
`

## Query Subscription used in Dashboard:
`
getSubscription(id: $subscriptionId) {
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
`

## Mutation Subscription used in CustomizeDashboard:
`
updateSubscription(id: $subscriptionId, Teams: $teams) {
    Teams {
            id
            Name
        }
}
`

## Mutation addSport:
`
mutation AddSport($sportName: String!) {
  addSport(Name: $sportName) {
    id
    Name
  }
}
`

## Mutation deleteTeam:
`
deleteTeam(id: $deleteTeamId) {
    id
    Name
  }
`