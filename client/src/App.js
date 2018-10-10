import React from 'react';
import App from './Components/index.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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


