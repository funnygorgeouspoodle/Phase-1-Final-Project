//List all upcoming contests
//User should be able to add their own contest
//Have a favorites button
//Have a favorites list
document.addEventListener("DOMContentLoaded", () => {
    let contestContainer = document.querySelector('#contest_list')
    fetchContests()
    addContest()
    
    document.querySelector('#contest-form').addEventListener('submit', (event) => {
        event.preventDefault()
        let name = document.querySelector("comtest name").value 
        let url = document.querySelector("#Url").value 
        let start_time = document.querySelector("start_time").value 
        let end_time = document.querySelector("end_time").value 
        let duration = document.querySelector("duration").value 
        let site = doument.querySelector("site").value
        let in_24_hours = document.querySelector("in_24_hours").value 
        let status = document.querySelector("status").value 

        contestObj = {
            name, url, start_time, end_time, duration, site, in_24_hours, status
        }
        console.log(contestObj)
        postNewContest(contestObj)
        
    })
    addToFavorites()
    

})

const fetchContests = () => {
fetch("https://kontests.net/api/v1/all")
    .then(resp => resp.json())
    .then(contestData => {
        console.log(contestData)
        contestData.forEach((contest) => {
            appendContest(contest)
        })

    })
}
//Adding items from JSON to the site
let fav = []
const appendContest = (contest) => {
    let contestContainer = document.querySelector('#contest_list')

    let card = document.createElement("div")
    let contest_name = document.createElement('h4')
    let url = document.createElement('a')
    url.setAttribute('href',`${contest.url}`)
    let start_time = document.createElement('h6')
    let end_time = document.createElement("h6")
    let duration = document.createElement("h6")
    let site = document.createElement("h6")
    let in_24_hours = document.createElement("h6")
    let status = document.createElement("h6")

    contest_name.innerText = contest.name
    url.innerText = contest.url
    start_time.innerText = `Start Time: ${contest.start_time}`
    end_time.innerText = `End Time: ${contest.end_time}`
    duration.innerText = `Duration: ${contest.duration}`
    site.innerText = `Site: ${contest.site}`
    in_24_hours.innerText = `Event In 24 Hours: ${contest.in_24_hours}`
    status.innerText = `Status: ${contest.status}`

    let fav_btn = document.createElement('button')
    fav_btn.id = "favorite buttton"
    fav_btn.innerHTML = "Add to Favorites" 
   
    
    fav_btn.addEventListener('click', () => {
        fav.push(contest.name)
        
        
    }) 

    card.append(contest_name, url, start_time, end_time, duration, site, in_24_hours, status, fav_btn)
    contestContainer.append(card)

}


//Method for posting new card 
const addContest = () => {
    let container = document.querySelector("#insert-contest")
    let card = document.createElement("div")
    let form = document.createElement('form')
    form.id = 'contest-form'
    let nameInput = document.createElement('input')
    let nameLabel = document.createElement('label')
    let urlInput = document.createElement('input')
    urlInput.setAttribute('href', `${urlInput}`)
    let urlLabel = document.createElement('label')
    let startTimeInput = document.createElement('input')
    let startTimeLabel = document.createElement('label')
    let endTimeInput = document.createElement('input')
    let endTimeLabel = document.createElement('label')
    let durationInput = document.createElement('input')
    let durationLabel = document.createElement('label')
    let siteInput = document.createElement('input')
    let siteLabel = document.createElement('label')
    let in_24_hoursInput = document.createElement('input')
    let in_24_hoursLabel = document.createElement('label')
    let statusInput = document.createElement('input')
    let statusLabel = document.createElement('label')
    let h2 = document.createElement('h2')
    let button = document.createElement('button')
    button.innerText = "Add Contest"

    nameLabel.innerText = "Name"
    urlLabel.innerText = "url"
    startTimeLabel.innerText = "Start Time"
    endTimeLabel.innerText  = 'End Time'
    durationLabel.innerText = "Duration"
    siteLabel.innerText = "Site"
    in_24_hoursLabel.innerText = "in_24_hours"
    statusLabel.innerText = "Status"
    h2.innerText = "Add your own contest!"

    nameInput.id = "contest name"
    urlInput.id = "Url"
    startTimeInput.id = "start_time"
    endTimeInput.id = "end_time"
    durationInput.id = "duration"
    siteInput.id = "site"
    in_24_hoursInput.id = "in_24_hours"
    statusInput.id = "status"

    form.append(nameInput, nameLabel, urlInput, urlLabel, startTimeInput, startTimeLabel, endTimeInput,
        endTimeLabel, durationInput, durationLabel, siteInput, siteLabel, in_24_hoursInput, in_24_hoursLabel,
        statusInput, startTimeLabel, button)
    
    card.append(h2, form)
    
    container.append(card)
    
}

//Posting new contest by user
const postNewContest = ({contest_name, url, start_time, end_time, duration, site, in_24_hours, status}) => {
    fetch("https://kontests.net/api/v1/all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"

        },
        body: JSON.stringify({contest_name, url, start_time, end_time, duration, site, in_24_hours, status})
    })
    .then(resp => resp.json())
    .then(contest => {
        appendContest(contest)
        e.target.removeEventListener()
    })
}
//Adding favroties button and list
const addToFavorites = () => {
    let favoritesContainer = document.querySelector("#favorites_list")
    let card = document.createElement('div')
    let favoritesButton = document.createElement('button')
    favoritesButton.id = "Favorites"
    favoritesButton.innerHTML = "Favorites"

    let list = document.getElementById("favo_list")
    list=fav
    //fav.forEach((item) => {
    //    let li = document.createElement("li")
    //    li.innerText = item
    //    list.appendChild(li)
    //})
    
    favoritesButton.addEventListener('click', () => {
        
        alert(list)
    })
    card.append(favoritesButton, list)
    favoritesContainer.append(card)
}

//Append the contents of fav on the screen.
