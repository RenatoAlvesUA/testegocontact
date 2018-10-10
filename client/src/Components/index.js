import React, { Component } from 'react';
import Form from "./Form.js"
import CardWeather from "./CardWeather.js"
import Graph from "./Graph.js"

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citys: false
        };
    }




    render() {
        const {
            citys,
        } = this.state;

        if (citys) {
            console.log(citys,'Array retornado node')
            return (<div>
                <CardWeather cities={citys} />
                <Graph cities={citys} />
            </div>
            )
        }

        return (
            <div>
                <Form setValues={(cities) => this.setState({ citys: cities })} />
            </div>
        )
    }
}


export default index;