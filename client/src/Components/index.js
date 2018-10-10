import React, {Component} from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Form from "./Form.js"
import Card_Weather from "./Card_Weather.js"
import Graph from "./Graph.js"

//const queryString = require('query-string');


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
    console.log(citys)
    if(citys){
      return(<div>
      <Card_Weather cities={citys} />
      <Graph cities={citys}/>
      </div>
      )
      }

        
        return (
           <div>
              <Form setValues={(cities) => this.setState({citys: cities})}/>
           </div>
               )
    }
}


export default index;