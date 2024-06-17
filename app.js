//to-do

// visuals:
// 1. make controls for team element height and font size (seperate on menu open for all team at once)
// 2. make grid setup

// functionality:
// 1. edit team button make it be interchange-able with add team

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
let teams = [];


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
    let presentButtonElement = document.body;
    let positionPresented = 0;
    let setupPresentButton = document.getElementById('present');
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
            let teamEditField = document.createElement('input')
            teamEditField.classList.add('editField');
            teamEditButton.appendChild(teamEditField)    
            let teamDeleteButton = document.createElement('h3');
            teamDeleteButton.classList.add('deleteTeam');
            teamDeleteButton.textContent = 'Delete'


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
            actionContainerElement.appendChild(teamDeleteButton);
            teamContainerElement.appendChild(actionContainerElement);
            teamShowcaseElement.appendChild(teamContainerElement);

            //delete button remove from js list and reload
            teamDeleteButton.addEventListener('click',deleteTeam)
            function deleteTeam(){
                teams.splice(position-1,1);
                loadTeams()
            }
            //checks for empty value and passes as new name if not empty
            teamEditButton.addEventListener('click', editTeam)
            function editTeam(){
                if (teamEditField.value.trim() == ''){return};
                team.name = teamEditField.value.trim()
                teamEditField.value = ''
                loadTeams()
            }
            teamEditField.addEventListener('keypress',function(e){
                if(e.key =='Enter'){editTeam()}
            })
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
            menuElement.style.display = 'flex   ';
            for(actionmenu of teamActionContainerElement){
                actionmenu.style.display = 'flex'
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
    };

    function setupfades(){
        openMenu()
        let teamstoShowcase = document.querySelectorAll('.teamcontainer');
        for (let team of teamstoShowcase){
            team.style.opacity = '0';
            positionPresented = 0;
        };
    };

    presentButtonElement.addEventListener('keypress',function(e){
        if(e.key == 'n'){presentButton(); console.log('a')};
    });

    menuButtonElement.addEventListener('click', openMenu);
    addTeamButtonElement.addEventListener('click',addTeam);
    inputFieldElement.addEventListener('keypress',function(e){
        if (e.key == 'Enter'){addTeam()}
    })
    updateScoreButtonElement.addEventListener('click',updateScore);
    setupPresentButton.addEventListener('click',setupfades);
};