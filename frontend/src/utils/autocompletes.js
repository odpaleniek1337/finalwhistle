const searchCompetition = (competitions, searchThing) => {
    let matches = 0
    return competitions.filter(competition => {
        if (competition.Name.toLowerCase().includes(searchThing.toLowerCase()) && matches < 4) {
            matches++;
            return competition
        }
    })
}


export default searchCompetition