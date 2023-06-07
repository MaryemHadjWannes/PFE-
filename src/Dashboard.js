import React from 'react';
import * as Chart from 'chart.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "line",
      data: {
        labels: this.props.data.map(d => d.date),
        datasets: [
          {
            label: "Nombre de signups",
            data: this.props.data.map(d => d.signups),
            borderColor: "#3e95cd",
            fill: false
          },
          {
            label: "Nombre de transactions",
            data: this.props.data.map(d => d.transactions),
            borderColor: "#8e5ea2",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Statistiques des signups et des transactions"
        }
      }
    });
  }

  render() {
    return (
      <div>
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    );
  }
}

export default Dashboard;