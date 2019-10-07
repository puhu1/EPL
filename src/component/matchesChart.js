import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import '../App.css';

class MatchesChart extends Component {

    render() {

        let chart_data = [];

        if(Object.keys(this.props.matchesChart_data).length > 0) {
            Object.keys(this.props.matchesChart_data).map((data, index) => {
                data = this.props.matchesChart_data[data];
                if(data['code'] && data['code'] !== ''){
                    chart_data.push(
                        <TableRow key={index}>
                            <TableCell align='center'>{data['code']}</TableCell>  {/*data['name']*/}
                            <TableCell align='center'>{data['total_matches']}</TableCell>
                            <TableCell align='center'>{data['win_count']}</TableCell>
                            <TableCell align='center'>{data['total_loss']}</TableCell>
                            <TableCell align='center'>{data['total_tie']}</TableCell>
                            <TableCell align='center'>{data['team_score']}</TableCell>
                            <TableCell align='center'>{data['against_score']}</TableCell>
                        </TableRow>
                    )
                }
            });
        }

        return(
            <div className="row">
                <div className="col-md-12 text-center">
                    <div style={{width: 'auto', margin: '0 auto'}}>
                        <Table>
                            <TableHead className='make-gold'>
                                <TableRow>
                                    <TableCell align='center'>Teams</TableCell>
                                    <TableCell align='center'>Total Matches</TableCell>
                                    <TableCell align='center' >Won</TableCell>
                                    <TableCell align='center' >Lost</TableCell>
                                    <TableCell  align='center'>Ties</TableCell>
                                    <TableCell align='center' >Total Goals Scored For</TableCell>
                                    <TableCell  align='center'>Total Goals Scored Against</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {chart_data}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default MatchesChart;