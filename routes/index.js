
var climate = require('city-weather');
var fs = require('fs');


module.exports = (app) => {


    app.post('/weather', (req, res, next) => {

        const { body } = req;
        const {
            weather
        } = body;

        async function f() {

            let promise = new Promise((resolve, reject) => {
                var data = {};
                for (let i = 0; i < weather.length; i++) {
                    if (!data[weather[i]]) {
                        data[weather[i]] = {};
                    }
                    climate.getMaximumTemp(weather[i], (temp) => {
                        console.log("Maximum temperature: " + temp);
                        data[weather[i]]['TempMax'] = temp;
                    });

                    climate.getMinimumTemp(weather[i], function (temp) {
                        data[weather[i]]['TempMin'] = temp;
                    });

                    climate.getActualTemp(weather[i], function (temp) {
                        data[weather[i]]['AtualTemp'] = temp;
                    });

                    climate.getClimateDescription(weather[i], function (description) {
                        data[weather[i]]['Description'] = description;
                    });

                    climate.getWindSpeed(weather[i], (speed) => {
                        data[weather[i]]['Wind'] = speed;

                    });
                }
                setTimeout(() => resolve(data), 1000)
            });

            let result = await promise; // wait till the promise resolves (*)

            fs.writeFile("temp.txt", JSON.stringify(result), (err) => {       //// Bloco de notas
                if (err) {
                    console.log(err);
                }
            });
            res.send({
                success: true,
                data: result
            })
            console.log(result); // "done!"
        }

        f();


    })


}