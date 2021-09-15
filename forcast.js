const key = 'ya6QxdGcXt6q4jQzEit89FiTz48FxiP9';

const getWeather = async(id) => {

    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;

    const respone = await fetch(base + query);
    const data = await respone.json();
    return data[0];

}

//  sending a request to the server to get the City info
const getCity = async(city) => {

    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const respone = await fetch(base + query);
    const data = await respone.json();

    return data[0];
};