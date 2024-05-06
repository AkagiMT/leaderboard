//to-do


// visuals:
// 1. make controls for team element height and font size (seperate on menu open for all team at once)
// 2. make grid setup

// functionality:
// 1. edit team button make it be interchange-able with add team
// 2. update score



// critial points:
// 1. apply changes to objects
// 2. make the fade-ins


// current focus ("current"):
// 1. learn to loop html 
//(example: update score for every team. tab on team ele. on update all click loop over ele update  js select on id and refresh)




// update focus
// 1. figure out how to update score
// 2. how to do the fade


//startup
window.addEventListener("load", logic);
class Team {
    constructor(name){
        this.name = name;
        this.score = 0;
        this.history = [0];
        this.id = Math.random();
    };
};



//testcase
let team1 = new Team('unga');
team1.score += 10
let team2 = new Team('bunga');
let team3 = new Team('bunga');
team3.score += 30
team2.score += 20
let teams = [];
teams.push(team1);
teams.push(team2);
teams.push(team3);

//team unga / score 10 / score history []



function logic() {
    let menuButtonElement = document.getElementById('menuButton');
    let inputFieldElement = document.getElementById('inputName');
    let addTeamButtonElement = document.getElementById('addTeam');
    let menuElement = document.getElementById('menu');
    let teamShowcaseElement = document.getElementById('teamShowcase');
    let teamActionContainerElement = document.getElementsByClassName('actionBar');
    let updateScoreButtonElement = document.getElementById('updateScoreButton');
    //loads the teams ordered by score then name

    function loadTeams(){
        //clearing the board for reload
        teamShowcaseElement.innerHTML = '';
        for (let team of teams){
            team.score = team.history.reduce((sum, a)=> sum + a, 0);
        };
        ///sort by score
        teams.sort((a, b) => b.score - a.score);
        ///postion for rankings
        position = 0;
        ///loading teams into page
        for (let team of teams){
            //making the team element
            //team object id added as html container id

            let teamContainerElement = document.createElement('div');
            teamContainerElement.classList.add('teamcontainer');
            teamContainerElement.setAttribute('id', String(team.id));
            let teamPlacementElement = document.createElement('h2');
            teamPlacementElement.classList.add('placement');
            let teamInfoElement = document.createElement('div');
            teamInfoElement.classList.add('teamInfoBorder');
            let teamNameElement = document.createElement('h2');
            teamNameElement.classList.add('teamName');
            let teamScoreElement = document.createElement('h2');
            teamScoreElement.classList.add('score');
            let actionContainerElement = document.createElement('div');
            actionContainerElement.classList.add('actionBar');
            let teamUpdaterElement = document.createElement('input');
            teamUpdaterElement.classList.add('scoreUpdater');
            let teamEditButton = document.createElement('h3');
            teamEditButton.classList.add('editTeam');
            teamEditButton.textContent = 'edit team';


            position += 1;

            teamPlacementElement.textContent = position;
            teamNameElement.textContent = team.name;
            teamScoreElement.textContent = team.score;

            teamInfoElement.appendChild(teamNameElement);
            teamInfoElement.appendChild(teamScoreElement);
            teamContainerElement.appendChild(teamPlacementElement);
            teamContainerElement.appendChild(teamInfoElement);
            actionContainerElement.appendChild(teamEditButton);
            actionContainerElement.appendChild(teamUpdaterElement);
            teamContainerElement.appendChild(actionContainerElement);
            teamShowcaseElement.appendChild(teamContainerElement);
        };
    };

    ///adding team object then reloading (input will be empty);
    function addTeam(){
        if (inputFieldElement.value.trim() == ''){return};
        let newTeam = new Team(inputFieldElement.value);
        inputFieldElement.value = '';
        teams.push(newTeam);
        loadTeams();
    };

    //makes menu + menu related elements visible
    function openMenu(){
        if(menuElement.style.display === 'none'){
            menuElement.style.display = 'inline';
            for(actionmenu of teamActionContainerElement){
                actionmenu.style.display = 'inline'
            };

        } else {
            menuElement.style.display = 'none';
            for(actionmenu of teamActionContainerElement){
                actionmenu.style.display = 'none'
            };
        };
    };
    function updateScore(){
        
        // Select all elements with class "teamcontainer"
        const teamContainers = document.querySelectorAll('.teamcontainer');

       // Loop over each team container 
       teamContainers.forEach(container => {
        // Get container ID
        const containerId = container.id;
        // Get scoreUpdater info
        const scoreUpdater = container.querySelector('.scoreUpdater').value;
        // Do something with container ID and scoreUpdater info

        for (let team of teams){
            if (String(team.id) === containerId){
                if(Number(scoreUpdater)){
                    team.history.push(Number(scoreUpdater));
                }
            }
        }
        loadTeams();
});
        };
    menuButtonElement.addEventListener('click', openMenu);
    addTeamButtonElement.addEventListener('click',addTeam);
    updateScoreButtonElement.addEventListener('click',updateScore);

    let presentButtonElement = document.body;
    let positionPresented = 0
    function presentButton(){
        let teamstoShowcase = document.querySelectorAll('.teamcontainer');
        if(positionPresented === 0){
            positionPresented = teamstoShowcase.length -1
        } else (positionPresented -= 1);
        if(positionPresented === 1){
            teamstoShowcase[positionPresented].style.opacity = '1';
            positionPresented -= 1;
            teamstoShowcase[positionPresented].style.opacity = '1';
        } else{teamstoShowcase[positionPresented].style.opacity = '1';}
    }
    presentButtonElement.addEventListener('keypress',function(e){
        if(e.key == 'n'){presentButton()};
    });
    let setupPresentButton = document.getElementById('present');
    function setupfades(){
        let teamstoShowcase = document.querySelectorAll('.teamcontainer');
        for (let team of teamstoShowcase){
            team.style.opacity = '0';
        };
    }
    setupPresentButton.addEventListener('click',setupfades);
};