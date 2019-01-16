var vue = new Vue({
    el: '#app',
    data: {
        matches: [],
        teams: [],
        name: '',
        currentTeam: null,
        groups: []
    },
    methods: {
        loadMatches: function() {
            var url = 'https://worldcup.sfg.io/matches';
            this.$http.get(url).then(response => {
                this.matches = response.body;
            });
        },
        loadMatchesByCode: function(team){
            this.currentTeam = team;
            var url = 'https://worldcup.sfg.io/matches/country?fifa_code=' + team.fifa_code;
            this.$http.get(url).then(response => {
                this.matches = response.body;
            });
        },
        loadTeams: function() {
            var url = 'https://worldcup.sfg.io/teams/';
            this.$http.get(url).then(response => {
                this.teams = response.body;
            });
        },
        findCodeByTeamName: function(name) {
            for(var team of this.teams) {
                if (team.country === name) {
                    return this.loadMatchesByCode(team);
                }
            }
        },
        loadGroups: function() {
            var url = 'https://worldcup.sfg.io/teams/group_results';
            this.$http.get(url).then(response => {
                this.groups = response.body;
            });
        },
        newToDo: function() {
            var newToDo = {
                name: 'Ciao',
                description: 'Ciao',
                assignedTo: 'caio'
            }
            var url = 'https://todos-list-sj.herokuapp.com/todos';
            this.$http.post(url, newToDo).then(response => {
                console.log("response:", response);
            });
        }
    },
    created: function() {
        this.loadTeams();
        this.loadMatches();
        this.loadGroups();
    },
    watch: {
        /*'code': function (newVal) {
            if(newVal.length === 3){
                this.loadMatchesByCode(newVal);
            }
        }*/
        'currentTeam': function(newVal, oldVal) {
            if (newVal === null && oldVal !== null) {
                this.loadMatches();
            }
        }
    }
})