window.addEventListener("load", logic);

// Class representing a Team
class Team {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.history = [0];
        this.id = Math.random();
    }
}

let teams = [];  // Array to store all team objects

function logic() {
    // DOM elements
    const presentButtonElement = document.body;
    const setupPresentButton = document.getElementById('present');
    const menuButtonElement = document.getElementById('menuButton');
    const inputFieldElement = document.getElementById('inputName');
    const addTeamButtonElement = document.getElementById('addTeam');
    const menuElement = document.getElementById('menu');
    const teamShowcaseElement = document.getElementById('teamShowcase');
    const teamActionContainerElement = document.getElementsByClassName('actionBar');
    const updateScoreButtonElement = document.getElementById('updateScoreButton');

    let positionPresented = 0;

    // Load teams and update the UI
    function loadTeams() {
        // Clear the showcase element
        teamShowcaseElement.innerHTML = '';

        // Calculate scores from history
        teams.forEach(team => {
            team.score = team.history.reduce((sum, score) => sum + score, 0);
        });

        // Sort teams by score in descending order
        teams.sort((a, b) => b.score - a.score);

        let position = 0;

        // Create and append team elements to the showcase
        teams.forEach(team => {
            position += 1;

            const teamContainerElement = document.createElement('div');
            teamContainerElement.classList.add('teamcontainer');
            teamContainerElement.id = String(team.id);

            const teamPlacementElement = document.createElement('h2');
            teamPlacementElement.classList.add('placement');
            teamPlacementElement.textContent = position;

            const teamInfoElement = document.createElement('div');
            teamInfoElement.classList.add('teamInfoBorder');

            const teamNameElement = document.createElement('h2');
            teamNameElement.classList.add('teamName');
            teamNameElement.textContent = team.name;

            const teamScoreElement = document.createElement('h2');
            teamScoreElement.classList.add('score');
            teamScoreElement.textContent = team.score;

            const actionContainerElement = document.createElement('div');
            actionContainerElement.classList.add('actionBar');

            const teamUpdaterElement = document.createElement('input');
            teamUpdaterElement.classList.add('scoreUpdater');

            const teamEditButton = document.createElement('h3');
            teamEditButton.classList.add('editTeam');
            teamEditButton.textContent = 'Edit Team';

            const teamEditField = document.createElement('input');
            teamEditField.classList.add('editField');
            teamEditButton.appendChild(teamEditField);

            const teamDeleteButton = document.createElement('h3');
            teamDeleteButton.classList.add('deleteTeam');
            teamDeleteButton.textContent = 'Delete';

            teamInfoElement.append(teamNameElement, teamScoreElement);
            actionContainerElement.append(teamEditButton, teamUpdaterElement, teamDeleteButton);
            teamContainerElement.append(teamPlacementElement, teamInfoElement, actionContainerElement);
            teamShowcaseElement.appendChild(teamContainerElement);

            // Event listeners for edit and delete buttons
            teamDeleteButton.addEventListener('click', () => deleteTeam(position - 1));
            teamEditButton.addEventListener('click', () => editTeam(team, teamEditField));
            teamEditField.addEventListener('keypress', e => {
                if (e.key === 'Enter') editTeam(team, teamEditField);
            });
        });
    }

    // Delete a team by its position in the array
    function deleteTeam(index) {
        teams.splice(index, 1);
        loadTeams();
    }

    // Edit a team's name
    function editTeam(team, teamEditField) {
        if (teamEditField.value.trim() === '') return;
        team.name = teamEditField.value.trim();
        teamEditField.value = '';
        loadTeams();
    }

    // Add a new team
    function addTeam() {
        if (inputFieldElement.value.trim() === '') return;
        const newTeam = new Team(inputFieldElement.value);
        inputFieldElement.value = '';
        teams.push(newTeam);
        loadTeams();
    }

    // Toggle the visibility of the menu
    function openMenu() {
        const isVisible = menuElement.style.display !== 'none';
        menuElement.style.display = isVisible ? 'none' : 'flex';
        Array.from(teamActionContainerElement).forEach(actionMenu => {
            actionMenu.style.display = isVisible ? 'none' : 'flex';
        });
    }

    // Update team scores based on user input
    function updateScore() {
        document.querySelectorAll('.teamcontainer').forEach(container => {
            const containerId = container.id;
            const scoreUpdaterValue = container.querySelector('.scoreUpdater').value;

            teams.forEach(team => {
                if (String(team.id) === containerId && Number(scoreUpdaterValue)) {
                    team.history.push(Number(scoreUpdaterValue));
                }
            });
        });
        loadTeams();
    }

    // Handle the presentation of teams
    function presentButton() {
        const teamsToShowcase = document.querySelectorAll('.teamcontainer');
        if (positionPresented === 0) {
            positionPresented = teamsToShowcase.length - 1;
        } else {
            positionPresented -= 1;
        }
        if (positionPresented === 1) {
            teamsToShowcase[positionPresented].style.opacity = '1';
            positionPresented -= 1;
            teamsToShowcase[positionPresented].style.opacity = '1';
        } else {
            teamsToShowcase[positionPresented].style.opacity = '1';
        }
    }

    // Set up the initial fades for the presentation
    function setupFades() {
        openMenu();
        const teamsToShowcase = document.querySelectorAll('.teamcontainer');
        teamsToShowcase.forEach(team => {
            team.style.opacity = '0';
        });
        positionPresented = 0;
    }

    // Event listeners for various elements
    presentButtonElement.addEventListener('keypress',function(e){
        if(e.key == 'n' || e.key == 'н'){presentButton();};
    });

    menuButtonElement.addEventListener('click', openMenu);
    addTeamButtonElement.addEventListener('click', addTeam);
    inputFieldElement.addEventListener('keypress', e => {
        if (e.key === 'Enter') addTeam();
    });
    updateScoreButtonElement.addEventListener('click', updateScore);
    setupPresentButton.addEventListener('click', setupFades);
}
