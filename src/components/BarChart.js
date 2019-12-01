import React, { Component } from 'react'
import {Chart} from 'chart.js'

export class BarChart extends Component {
    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }

    getRandomColor() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgba(" + r + "," + g + "," + b + ", 0.5)";
    }

    getRandomColorEachBar(count) {
      var data =[];
      for (var i = 0; i < count; i++) {
          data.push(this.getRandomColor());
      }
      return data;
    }
  
    componentDidUpdate() {
      this.myChart.data.labels = this.props.insuranceDetail.map(d => d.company_name+"("+d.program_name+")");
      this.myChart.data.datasets[0].data = this.props.insuranceDetail.map(d => d.premium_rate);
      this.myChart.data.datasets[0].backgroundColor = this.getRandomColorEachBar(this.props.insuranceDetail.length)
      this.myChart.update();
    }
  
    componentDidMount() {
      this.myChart = new Chart(this.chartRef.current, {
        type: 'bar',
        data: {
          labels: this.props.insuranceDetail.map(d => d.company_name),
          datasets: [{
            label: 'premium rate',
            data: this.props.insuranceDetail.map(item => item.premium_rate),
            backgroundColor: this.getRandomColorEachBar(this.props.insuranceDetail.length),
          }]
        }
      });
    }
  
    render() {
      // console.log(this.props.insuranceDetail)
      return <canvas ref={this.chartRef} />;
    }
  }

export default BarChart

  