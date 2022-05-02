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


export {
    searchCompetition, 
    searchTarget,
    mapTeams
}