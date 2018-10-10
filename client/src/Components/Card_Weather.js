import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Button } from 'reactstrap';


//const queryString = require('query-string');


class Card_Weather extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const {
      cities,
  } = this.props;
  console.log(this.props)
      const data=[];
          for(let i in cities){
              console.log(cities[i])
              console.log(i)
              data.push(<div class="col-sm-6">
              <div  className="weather-card one">
              
              <div className="top">
                <div className="wrapper">
                  <div className="mynav">
                    <a href="javascript:;"><span className="lnr lnr-chevron-left" /></a>
                    <a href="javascript:;"><span className="lnr lnr-cog" /></a>
                  </div>
                  <h1 className="heading">{cities[i].Description}</h1>
                  <h3 className="location">{i}</h3>
                  <p className="temp">
                    <span className="temp-value">{cities[i].AtualTemp}</span>
                    <span className="deg">0</span>
                    <a href="javascript:;"><span className="temp-type">C</span></a>
                  </p>
                  <p className="temp">
                    <span className="temp-value">Vento: {cities[i].Wind}</span>
                    <span className="deg">0</span></p>
                </div>
              </div>
              <div className="bottom">
                <div className="wrapper">
                  <ul className="forecast">
                    <a href="javascript:;"><span className="lnr lnr-chevron-up go-up" /></a>
                    <li className="active">
                      <span className="date">Temperatura Máxima</span>
                      <span className="lnr lnr-sun condition">
                        <span className="temp">{cities[i].TempMax}<span className="deg">0</span><span className="temp-type">C</span></span>
                      </span>
                    </li>
                    <li>
                      <span className="date">Temperatura Minima</span>
                      <span className="lnr lnr-cloud condition">
                        <span className="temp">{cities[i].TempMin}<span className="deg">0</span><span className="temp-type">C</span></span>
                      </span>
                    </li>
                    
                  </ul>
                </div>
              </div></div>
            </div>)
    }
return(<div class="row">
{data}</div>)

    
  }
}


export default Card_Weather;