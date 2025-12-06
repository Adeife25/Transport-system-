// npm init -y;
// npm install axios;


const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function ax() {
    const url = 'http://api.weatherapi.com/v1/current.json?key=${YOUR_API_KEY}&q=London';
    const result = await axios.get(url)
    return result.data;
}

// api for generating tickets
// use weather api to determine price change based on weather conditions

// objectives
// producing the best possible solution
// consuming third party api
// logic building
// use of API .method of prompting

// base skillset
// start and setup a node project(backend)
// implement MVC architecture
// connect to a database(mysql)
// build, manage and develop databases. deploy RESTful APIs
// conecting node to sql
// creating get and post Request menthd en