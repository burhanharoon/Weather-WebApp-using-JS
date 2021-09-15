const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // const city = data.cityDetails;
    // const weather = data.weatherDetails;

    // Destructuring
    const { cityDetails, weatherDetails } = data;

    details.innerHTML =
        `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
            <div class="my-3">${weatherDetails.WeatherText}</div>
            <div class="display-4 my-4">
                 <span>${weatherDetails.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
    `;

    // update the icon/day & icon image
    if (weatherDetails.WeatherIcon) {
        let iconSrc = `img/icons/${weatherDetails.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);
    }

    //  All of this can be easily done by the TERNARY Operator
    // let timesrc = null;
    // if (weatherDetails.IsDayTime) {
    //     timesrc = 'img/day.svg';
    // } else {
    //     timesrc = 'img/night.svg';
    // }
    let timesrc = weatherDetails.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timesrc);


    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }

};

const getInfo = async(city) => {

    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return {
        // cityDetails: cityDetails,
        // weatherDetails: weatherDetails

        cityDetails,
        weatherDetails
    };

};

form.addEventListener('submit', e => {
    e.preventDefault();

    const cityName = form.city.value.trim();
	

    getInfo(cityName)
        .then(data => {
           // console.log(data);
            updateUI(data);
        }).catch(error => {
            console.log(error);
        });

window.localStorage.setItem('city', cityName);

});


if (localStorage.getItem('city')) {
    getInfo(localStorage.getItem('city'))
        .then(data => {
            // console.log(data);
            updateUI(data);
        }).catch(error => {
            console.log(error);
        });
}

