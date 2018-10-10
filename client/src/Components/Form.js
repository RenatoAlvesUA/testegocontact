import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Button } from 'reactstrap';


//const queryString = require('query-string');


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nrCidades: false,
      cities: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.confirmCities = this.confirmCities.bind(this);

  }

  handleChange(event) {
    event.preventDefault();
    let cities = this.state.cities;
    let name = event.target.name;
    let value = event.target.value;
    cities[name] = value;
    console.log(this.state.cities)
    this.setState({ cities })
  }

  confirmCities() {
    const {
      cities
    } = this.state;
    console.log(cities)

    fetch('/weather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        weather: cities,
      }),
    }).then(res => res.json())
      .then(json => {
        //console.log(json)
        if (json.success) {
          console.log('fetch with server success')
          this.props.setValues(json.data)
        } else {
          console.log('client fail')

        }
      })
  }

  render() {
    const {
      nrCidades
    } = this.state;

    if (nrCidades) {
      var data = [];
      for (var i = 0; i < nrCidades; i++) {
        data.push(<div key={i} className="wrap-input100 validate-input" data-validate="Name is required">
          <input className="input100" id="name" type="text" value={this.state.cities[i] || []} onChange={this.handleChange} name={i} placeholder='Cidade' />
          <label className="label-input100" htmlFor="name">
            <span className="lnr lnr-user" />
          </label>
        </div>)
      }
      return (<div className="container-contact100">
        <div className="wrap-contact100">
          <span className="contact100-form-title">
            Insira a cidade ou cidades.
                </span>
    
            {data}
            <Button outline onClick={this.confirmCities} size="lg" color="secondary">Confirmar</Button>{' '}
        </div>
      </div>)
    }


    return (
      <div className="container-contact100">
        <div className="wrap-contact100">
            <span className="contact100-form-title">
              Insira o número de cidades que pretende.
                </span>

            <DropDownMenu
              value={nrCidades}
              onChange={(event, index, value) => this.setState({ nrCidades: value })}
              labelStyle={{ textColor: "black", color: 'black', paddingLeft: 0, marginLeft: 0 }}
              underlineStyle={{ borderColor: 'black', margin: 0 }}
              autoWidth={true}
              selectedMenuItemStyle={{ color: 'black' }}
              animated={true}
              menuStyle={{ fontFamily: "metropolis-regular" }}
              style={{ width: '100% !important' }}
              iconStyle={{ fill: '#000000' }}

            >
              <MenuItem value={1} primaryText='1' />
              <MenuItem value={2} primaryText='2' />
              <MenuItem value={3} primaryText='3' />
              <MenuItem value={4} primaryText='4' />
              <MenuItem value={5} primaryText='5' />
              <MenuItem value={6} primaryText='6' />
              <MenuItem value={7} primaryText='7' />
              <MenuItem value={8} primaryText='8' />

            </DropDownMenu>

            <br />

         </div></div>
    )
  }
}


export default Form;