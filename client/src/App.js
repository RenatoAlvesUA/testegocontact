import React from 'react';

import {BrowserRouter as Router,} from 'react-router-dom'
import App from './Components/index.js';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
//     <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>

const muiTheme = getMuiTheme({
    fontFamily: 'metropolis-regular, sans-serif',

    palette: {
        fontFamily: 'metropolis-regular, sans-serif',


    },

});
const Application = () =>
    <MuiThemeProvider muiTheme={muiTheme}>
            <App/>
    </MuiThemeProvider>

export default Application;


