import React, { Component } from 'react';
import './App.css';
import MatchesChart from "./component/matchesChart";
import BubbleChart from "./component/BubbleChart";
import matchesData from "./component/matches";
import teamsJsonData from "./component/teams";

class App extends Component {
constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        matchData_array: [],
        data_by_team_array: [],
        chart_final_data: {}
    }
}

    componentDidMount() {
        this.getMatchData();

    }
    getMatchData =() => {
        let matchData = matchesData;
        let teamData = teamsJsonData;
        this.setState({ matchData_array: matchData['rounds'], data_by_team_array: teamData['clubs'] }, () => {
            this.dispalyFinalData();
        });
    };

    dispalyFinalData = () => {
        const { matchData_array, data_by_team_array } = this.state;
        let data_by_team = {};

        data_by_team_array.forEach(team => {
            let teamName = team.key;
            data_by_team[teamName] = {};
            data_by_team[teamName].name = team.name;
            data_by_team[teamName].code = team.code;
            data_by_team[teamName].team_score = 0;
            data_by_team[teamName].against_score = 0;
            data_by_team[teamName].win_count = 0;
            data_by_team[teamName].total_loss = 0;
            data_by_team[teamName].total_tie = 0;
            data_by_team[teamName].total_matches = 0;

            matchData_array.forEach(data => {
                data.matches.forEach(resp => {
                    //getting score according to team
                    let team1 = false;
                    let team2 = false;
                    if(resp.team1.key === team.key){
                        team1 = true;
                    }
                    if(resp.team2.key === team.key){
                        team2 = true;
                    }

                    if(team1 || team2) {

                        data_by_team[teamName].total_matches += 1;

                        let team_score = 0;
                        let against_score = 0;
                        if (team1){
                            team_score = resp.score1;
                            against_score = resp.score2;
                        }
                        else{
                            team_score = resp.score2;
                            against_score = resp.score1;
                        }

                        data_by_team[teamName].team_score += team_score;
                        data_by_team[teamName].against_score += against_score;

                        if(team_score === against_score) {
                            data_by_team[teamName].total_tie += 1;
                        } else if (team_score>against_score) {
                            data_by_team[teamName].win_count += 1;
                        } else {
                            data_by_team[teamName].total_loss += 1;
                        }
                    }
                });
            });
        });

        this.setState({ chart_final_data : data_by_team });
    };

    render() {
        return (
            <div className="App">
                <div className="row">
                    <div className="col-md-12">
                        <div className='App-header '>
                            <h1>EPL Season 2011-12</h1>
                            <p>1. Bubble Chart</p>
                        </div>
                    </div>
                    <div className="col-md-12">
                       <BubbleChart
                           bubbleChart_data= {this.state.chart_final_data}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className='App-header'>
                            <p>2. Matches Chart</p>
                        </div>
                        <MatchesChart
                            matchesChart_data = {this.state.chart_final_data}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;