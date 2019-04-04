const express = require('express')
const app = express()
const fetch = require('node-fetch')

app.set('view engine', 'ejs');

app.use(express.static('public'))


app.get('/', function (req, res) {
    router.searchResults().then(data => {
        const array = data.data.map(item => objectify(item))

        return array
    }).then(data => {
        //console.log(res.render)
        res.render('pages/index', {
            page: '../partials/overview',
            data
        })
    });
});

app.get('/:name', function (req, res) {
    router.searchResults().then(data => {
        const array = data.data.map(item => objectify(item))


        return array.filter(item => item.name === req.params.name)
        
    }).then(data => {

        res.render('pages/index', {
            page: '../partials/detail',
            data
        })
    });
});

function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

const storage = {
    score: function (temp, co2, mic) {
        const tempFix = temp / 1000
        const tempScore = Math.max(2,((-0.3 * ((tempFix - 20) ** 2)) + 10))
        const co2Score = map(co2, 0, 2000, 10, 1)
        const micScore = map(mic, 2000, 3600, 8, 1)


        return (tempScore + co2Score + micScore) / 3
    },

}

const router = {

    constructor: {
        URL: 'http://mirabeau.denniswegereef.nl/api/v1/rooms?quantity=1'
    },

    searchResults: function () {
        return fetch(this.constructor.URL)
            .then(body => body.json())
            // .then(results => storage.results = results)
            .catch(error => console.log(error))
    }
}

app.listen(8080);
console.log('8080 is the magic port');

function objectify(object) {
    return {
        name: object.room_name,
        temp: ((object.measurements.temperature-1000) / 1000).toFixed(1),
        tempText: clearify.temp(object.measurements.temperature-1000),
        status: object.measurements.occupancy,
        statusText: object.measurements.occupancy,
        co2: object.measurements.co2,
        co2Text: clearify.co2(object.measurements.co2),
        light: object.measurements.ambient_light,
        mic_level: clearify.volume(object.measurements.mic_level),
        mic_levelText: clearify.volumeSafe(object.measurements.mic_level),
        score: storage.score(object.measurements.temperature, object.measurements.co2, object.measurements.mic_level).toFixed(1),


        
    }
}


const clearify = {
    temp: function (param) {
        if (param < 20000) {
            return "Cool"
        } else if (param > 20000 && param < 22000) {
            {
                return "Aangenaam"
            }
        } else if (param > 22000 && param < 23500) {
            {
                return "Warm"
            }
        }   else if (param > 23500) {
            {
                return "Heet"
            }
        }
    },
    co2: function (param) {
        if (param < 1000) {
            return "Fris"
        } else if (param > 1000 && param < 2000) {
            {
                return "Ijl"
            }
        } else if (param > 2000 && param < 5000) {
            {
                return "Onveilig"
            }
        }
    },
    volume: function (param) {
        return Math.floor(param / 10) / 10
    },
    volumeSafe: function (param) {
        let volume = param / 100
        if (volume < 15) {
            return "Stil"
        } else if (volume > 15 && volume < 30) {
            return "Licht rumoerig"
        } else {
            return "Rumoerig"
        }
    },
    occupancy: function (param) {
        if (param === true) {
            return "Bezet"
        } else {
            return "Vrij"
        }
    }
}