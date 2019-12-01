import React, {Component} from 'react'
import {Chart} from 'chart.js'

export class LineChart extends Component {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }
  
    componentDidUpdate() {
        this.myChart.data.labels = this.props.insuranceDetail.map(d => d.company_name+"("+d.program_name+")");
        this.myChart.data.datasets[0].data = this.props.insuranceDetail.map(d => d.covered_expense);
      this.myChart.update();
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.chartRef.current, {
        type: 'line',
        options: {},
        data: {
          labels: this.props.insuranceDetail.map(d => d.company_name),
          datasets: [{
            label: 'Covered Expenses',
            data: this.props.insuranceDetail.map(item => item.covered_expense),
            backgroundColor: 'rgb(255,127,80,0.4)',
            pointRadius: 2,
            borderColor: 'rgb(255,127,80)',
            borderWidth: 1,
            lineTension: 0
          }]
        }
      });
    }
  
    render() {
      return <canvas ref={this.chartRef} />;
    }
  }

  export default LineChart