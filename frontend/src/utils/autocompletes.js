const searchCompetition = (competitions, searchThing) => {
    let matches = 0
    return competitions.filter(competition => {
        if (competition.Name.toLowerCase().includes(searchThing.toLowerCase()) && matches < 4) {
            matches++;
            return competition
        }
    })
}

const searchTarget = (targets, searchThing) => {
    let matches = 0
    return targets.filter(target => {
        if (target.Name.toLowerCase().includes(searchThing.toLowerCase()) && matches < 4) {
            matches++;
            return target
        }
    })
}

const mapTeams = (teams) => {
    return teams.map(team => {
        return { "id": team.id }
    });
}

const reverseSubscription = (subscription) => {
    //disgusting function btw
    const reversed = {
        Sports: {}
    }
    for (const team of subscription) {
        if (!(team.League.Sport.Name in Object.keys(reversed.Sports))) {
            reversed.Sports[team.League.Sport.Name] = {
                Leagues: {}
            }
        }
        
    }
    for (const team of subscription) {
        if (!(team.League.Name in Object.keys(reversed.Sports[team.League.Sport.Name].Leagues))) {
            reversed.Sports[team.League.Sport.Name].Leagues[team.League.Name] = {
                Teams: {}
            }
        }
    }
    for (const team of subscription) {
        if (!(team.Name in Object.keys(reversed.Sports[team.League.Sport.Name].Leagues[team.League.Name].Teams))) {
            reversed.Sports[team.League.Sport.Name].Leagues[team.League.Name].Teams[team.Name] = team
        }
    }
    return reversed
}


export {
    searchCompetition, 
    searchTarget,
    mapTeams,
    reverseSubscription
}