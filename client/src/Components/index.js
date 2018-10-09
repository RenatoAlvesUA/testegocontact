import React, {Component} from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Form from "./Form.js"

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
        if(citys){
        const data=[];
            for(let i in citys){
                console.log(citys[i])
                console.log(i)
                data.push(<div class="col-sm-6">
                <div  className="weather-card one">
                
                <div className="top">
                  <div className="wrapper">
                    <div className="mynav">
                      <a href="javascript:;"><span className="lnr lnr-chevron-left" /></a>
                      <a href="javascript:;"><span className="lnr lnr-cog" /></a>
                    </div>
                    <h1 className="heading">{citys[i].Description}</h1>
                    <h3 className="location">{i}</h3>
                    <p className="temp">
                      <span className="temp-value">{citys[i].AtualTemp}</span>
                      <span className="deg">0</span>
                      <a href="javascript:;"><span className="temp-type">C</span></a>
                    </p>
                    <p className="temp">
                      <span className="temp-value">Vento: {citys[i].Wind}</span>
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
                          <span className="temp">{citys[i].TempMax}<span className="deg">0</span><span className="temp-type">C</span></span>
                        </span>
                      </li>
                      <li>
                        <span className="date">Temperatura Minima</span>
                        <span className="lnr lnr-cloud condition">
                          <span className="temp">{citys[i].TempMin}<span className="deg">0</span><span className="temp-type">C</span></span>
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
        
        /*const data = this.state.citys && this.state.citys.map((val) =>
        <div className="weather-card one">
        <div className="top">
          <div className="wrapper">
            <div className="mynav">
              <a href="javascript:;"><span className="lnr lnr-chevron-left" /></a>
              <a href="javascript:;"><span className="lnr lnr-cog" /></a>
            </div>
            <h1 className="heading">Clear night</h1>
            <h3 className="location">Dhaka, Bangladesh</h3>
            <p className="temp">
              <span className="temp-value">20</span>
              <span className="deg">0</span>
              <a href="javascript:;"><span className="temp-type">C</span></a>
            </p>
          </div>
        </div>
        <div className="bottom">
          <div className="wrapper">
            <ul className="forecast">
              <a href="javascript:;"><span className="lnr lnr-chevron-up go-up" /></a>
              <li className="active">
                <span className="date">Yesterday</span>
                <span className="lnr lnr-sun condition">
                  <span className="temp">23<span className="deg">0</span><span className="temp-type">C</span></span>
                </span>
              </li>
              <li>
                <span className="date">Tomorrow</span>
                <span className="lnr lnr-cloud condition">
                  <span className="temp">21<span className="deg">0</span><span className="temp-type">C</span></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
            
        );*/



        return (
           <div>
              <Form setValues={(cities) => this.setState({citys: cities})}/>
           </div>
               )
    }
}


export default index;