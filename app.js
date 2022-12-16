/**When the DOM loads */
document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
    homePageLinkEvent();
    workoutListLinkEvent();
})
// Global//
const jsonURL = 'http://localhost:3000';

// Node Getters//
const mainDiv = () => document.getElementById("main")

const homePageLink = () => document.getElementById('home-page')
const workoutListLink = () => document.getElementById('routines-link')

 
/*********Templates******* */

const workoutListTemplate = () => {
    return `
    <h1>Workouts</h1>
    <table class="highlight">
      <thead>
        <tr>
            <th>Date</th>
            <th>Day</th>
            <th>Region</th>
            <th>Exercise</th>
            <th>Sets</th>

        </tr>
      </thead>

      <tbody>
        ${renderWorkouts()}
        
      </tbody>
    </table>
    `
}
const workoutTemplate = (workout) => {
    return `
    <tr>
        <td>${ workout.date }</td>
        <td>${ workout.day }</td>
        <td>${ workout.region }</td>
        <td>${ workout.exercise }</td>
        <td>${ workout.sets }</td>
    </tr>
    `
}


/******Renderers*/
const renderHomePage = () => {
    mainDiv().innerHTML = '';
    const h1 = document.createElement('h1');
    h1.classList.add('center-align');
    h1.innerText = "Let's get fit!"
    mainDiv().appendChild(h1);  
}
/* const renderWorkoutListPage = () => {
    mainDiv().innerHTML = workoutListTemplate();
}
 */

const renderWorkouts = () => {
    return workouts.map(workout => workoutTemplate(workout))
}

const renderWorkoutListPage = () => {
    mainDiv().innerHTML = '';
    const h1 = document.createElement('h1')
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr')
    const thDate = document.createElement('th')
    const thDay = document.createElement('th')
    const thRegion = document.createElement('th');
    const thExercise = document.createElement('th');
    const thSets = document.createElement('');
    const tbody = document.createElement('tbody');
    h1.innerText = 'List Routines';
    thDate.innerText = 'Date';
    thDay.innerText = "Day";
    thRegion.innerText = 'Region';
    thExercise.innerText = "Exercise";
    thSets.innerText = "Sets";
    table.classList.add('highlight');
    tr.appendChild(thDate);
    tr.appendChild(thDay);
    tr.appendChild(thRegion);
    tr.appendChild(thExercise);
    tr.appendChild(thSets);
    thead.appendChild(tr);
    table.appendChild(thead);
    workouts.forEach(workout => tbody.appendChild(workoutTemplate(workout)))
    table.appendChild(tbody);
    mainDiv().appendChild(h1);
    mainDiv().appendChild(table)
}
/***** Events */
const loadWorkouts = async () => {
    const resp = await fetch(jsonURL + '/workouts');
    const data = await resp.json();
    workouts = data;
}
const homePageLinkEvent = () => {
    homePageLink().addEventListener('click', (e) => {
        e.preventDefault()
        renderHomePage();
      })
}

const workoutListLinkEvent = () => {
    workoutListLink().addEventListener('click', async (e) => {
        e.preventDefault()
        await loadWorkouts();
        renderWorkoutListPage();
      })
}





