import React, { Component } from 'react';
import Chart from "chart.js";


class BubbleChart extends Component {

    chartRef = React.createRef();

    createChart = (bubbleChart_data) => {
        const myChartRef = this.chartRef.current.getContext("2d");

        let option = {
            type: 'bubble',
            data: {
                datasets: Object.keys(bubbleChart_data).map(i => {
                    i = bubbleChart_data[i];
                    return {
                        label:i.name,
                        data:[{
                            x:i.total_loss,
                            y:i.win_count,
                            r:i.team_score
                        }],
                        backgroundColor: this.getRandomColor(),
                        borderColor:'#000',
                    }
                })
            }
        };

        new Chart(myChartRef,option);
    };

    getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    componentWillReceiveProps(nextProps){
        if(this.props.bubbleChart_data !== nextProps.bubbleChart_data) {
                    this.createChart(nextProps.bubbleChart_data);
                }
    }

    render() {
        return(
            <div>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        );
    }
}

export default BubbleChart;