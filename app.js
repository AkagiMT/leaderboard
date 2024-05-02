//CLASS THAT MAKES OBJECTS WITH:
    //team-id: id (generate num from 1 to x)
    //name: str team name
    //score: int team score
    //history: array of int score history
//get all objects in an array -> order by score than name
//for loop nums the teams on html generation

//page reloads on enter

//team id is gonna be hidden var used for calcs and item movement



//height is set to % make it react with font (button cuz im lazy?)



//height and font are spearate add buttons for each on menu














//startup
window.addEventListener("load", logic);
class Team {
    constructor(name){
        this.name = name;
        this.score = 0;
        this.history = [];
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




function logic() {
    let menuButtonElement = document.getElementById('menuButton');
    let inputFieldElement = document.getElementById('inputName');
    let addTeamButtonElement = document.getElementById('addTeam');
    let menuElement = document.getElementById('menu');
    let teamShowcaseElement = document.getElementById('teamShowcase');




    //loads the teams ordered by score then name


    function loadTeams(){
        //clearing the board for reload
        teamShowcaseElement.innerHTML = '';
        ///sort by score
        teams.sort((a, b) => b.score - a.score);
        ///postion for rankings
        position = 0;
        ///loading teams into page
        for (let team of teams){
            //making the team element
            let teamContainerElement = document.createElement('div');
            teamContainerElement.classList.add('teamcontainer');
            let teamPlacementElement = document.createElement('h2');
            teamPlacementElement.classList.add('placement');
            let teamInfoElement = document.createElement('section');
            teamInfoElement.classList.add('teamInfoBorder');
            let teamNameElement = document.createElement('h2');
            teamNameElement.classList.add('teamName');
            let teamScoreElement = document.createElement('score');
            teamScoreElement.classList.add('score');

            position += 1;

            teamPlacementElement.textContent = position;
            teamNameElement.textContent = team.name;
            teamScoreElement.textContent = team.score;

            teamInfoElement.appendChild(teamNameElement);
            teamInfoElement.appendChild(teamScoreElement);
            teamContainerElement.appendChild(teamPlacementElement);
            teamContainerElement.appendChild(teamInfoElement);
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


    function openMenu(){
        if(menuElement.style.display === 'none'){
            menuElement.style.display = 'inline';
        } else {menuElement.style.display = 'none'}
    };

    menuButtonElement.addEventListener('click', openMenu);
    addTeamButtonElement.addEventListener('click',addTeam);
};