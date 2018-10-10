import React, { Component } from 'react';
import Chart from "react-google-charts";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphss: false,
      loading: false
    };
  }

  componentWillMount() {
    const {
      cities,
    } = this.props;
    const data = {};
    for (let i in cities) {
      for (let d in cities[i]) {
        if (!data[d]) {
          data[d] = {};
        }
        data[d][i] = cities[i][d];
      }
    }
    delete data["Description"];
    console.log(data,'Organizado por categorias')

    const graphs = []
    for (let i in data) {
      if (!graphs[i]) {
        graphs[i] = [["País", i, { role: "style" }]];
      }
      for (let d in data[i]) {
        graphs[i].push([d, data[i][d], "color: gray"])
      }
    }
    console.log(graphs,'Array no formato para api google charts')

    this.setState({
      graphs: graphs,
      loading: true
    })
  }

  render() {
    if (this.state.loading) {
      let data = [];
      for (let i in this.state.graphs) {
        data.push(<Chart graph_id={i} key={i} chartType="BarChart" width="100%" height="400px" data={this.state.graphs[i]} />)
      };

      return (<div className="row">
        {data}
      </div>
      )
    }

    return (<div>loading...</div>)

  }

}


export default Graph;