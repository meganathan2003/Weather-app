document.addEventListener('DOMContentLoaded', function () {

    const searchbtn = document.querySelector('.search-box button');
    const errorImg = document.querySelector('.error img');
    const errortxt = document.querySelector('.error h3')
    const container = document.querySelector('.container');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');

    searchbtn.addEventListener('click', () => {

        const APIKey = config.API_KEY;
        const city = document.querySelector('#location').value;

        // validate the city name
        if (city === '') {
            alert('Please Enter the city name');
            return;
        }

        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then((response) => {
            if (!response.ok) {
                container.style.height = '400px';
                errorImg.style.display = 'block';
                errortxt.style.display = 'block';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                return;
            }
            return response.json();

        }).then((json) => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                errorImg.style.display = 'block';
                return;
            }
            errorImg.style.display = 'none';
            errortxt.style.display = 'none';

            const image = document.querySelector('.weather-box img');
            const description = document.querySelector('.description');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';

            }

            document.getElementById('temp').innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            document.getElementById('humi').innerText = `${json.main.humidity}%`;
            document.getElementById('wind speed').innerText = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            container.style.height = '520px';
        })
    });
});



