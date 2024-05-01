class Team {
    constructor(name){
        this.name = name;
        this.score = 0;
        this.history = [];
        this.id = Math.random();
    };
};
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
for(let team of teams){
    console.log(team)
}

teams.sort((a, b) => b.score - a.score);
for(let team of teams){
    console.log(team)
}