
var climate = require('city-weather');
var fs = require('fs');
const OpenWeatherMapHelper = require("openweathermap-node");
const helper = new OpenWeatherMapHelper(
    {
        APPID: '9ba93df184746ae637c18d8119b8cce0',
        units: "metric"
    }
);

module.exports = (app) => {


    app.post('/weather', (req, res, next) => {

        const { body } = req;
        const {
            weather
        } = body;


            let promise = new Promise((resolve, reject) => {
                var data = {};
                for (let i = 0; i < weather.length; i++) {
                    if (!data[weather[i]]) {
                        data[weather[i]] = {};
                    }

                    helper.getCurrentWeatherByCityName(weather[i], (err, currentWeather) => {
                        if (err) {
                            reject(err)
                        }
                        else {
                            console.log(currentWeather,'API RETURN')
                            data[weather[i]]['AtualTemp'] = currentWeather.main.temp;
                            data[weather[i]]['TempMax'] = currentWeather.main.temp_max;
                            data[weather[i]]['TempMin'] = currentWeather.main.temp_min;
                            data[weather[i]]['Description'] = currentWeather.weather[0].description;
                            data[weather[i]]['Wind'] = currentWeather.wind.speed;
                        }
                    });
                }
                setTimeout(() => resolve(data), 1000)

            }).then((value) => {
                console.log(value, 'value')
                fs.appendFile("temp.txt", JSON.stringify(value), (err) => {       //// Bloco de notas
                    if (err) {
                        console.log(err);
                    }
                    console.log('Saved Log!')
                });
        
                res.send({
                    success: true,
                    data: value
                })
            }).catch((err) => {
                console.log(err)
                res.send({
                    success: false,
                    err: err
                })
            });
    })
}