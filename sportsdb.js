document.getElementById('spineer').style.display = 'none'
const searchteam = async () => {
    const search = document.getElementById('input-field')
    document.getElementById('spineer').style.display = 'block'
    const searchValue = search.value
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchValue}`
    search.value = ''
    const res = await fetch(url)
    const data = await res.json()
    showingTeam(data.teams)
    if (res.status === 200) {
        document.getElementById('spineer').style.display = 'none'
    }
}
const showingTeam = team => {
    const previousDiv = document.getElementById('showingResults')
    previousDiv.textContent = ''
    team.forEach(element => {
        console.log(element)
        const newDiv = document.createElement('div')
        newDiv.classList.add('col')
        newDiv.innerHTML =
            `
            <div onclick="showDetails(${element.idTeam})" class="card h-100">
                <img src="${element.strTeamBadge}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${element.strAlternate}</h5>
                    <p class="card-text">${element.strDescriptionEN.slice(0, 200)}</p>
                </div>
            </div>  
              `
        previousDiv.appendChild(newDiv)
    });
}
const showDetails = async short => {
    // console.log(short)
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${short}`
    const res = await fetch(url)
    const data = await res.json()
    showData(data.teams[0])
}
const showData = value => {
    console.log(value)
    const oldDiv = document.getElementById('showDetails')
    oldDiv.textContent = ''
    const brandNeWDiv = document.createElement('div')
    brandNeWDiv.classList.add('card')
    brandNeWDiv.innerHTML =
        `
    <div class="card">
            <img src="${value.strTeamJersey}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${value.strCountry}</h5>
                <h5 class="card-title">${value.strLeague}</h5>
                
                <a href="${value.strFacebook}" class="btn btn-primary">Go Facebook</a>
                <a href="${value.strYoutube}" class="btn btn-primary">Go Youtube</a>
                
            </div>
        </div>
    `
    oldDiv.appendChild(brandNeWDiv)
}