// Dependencies to install:
// $ npm install node-fetch --save
// add "type": "module" to package.json



const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY?.trim();


export async  function getTrendingToken(){
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': REACT_APP_API_KEY,
  },
};

console.log(REACT_APP_API_KEY)
await fetch('https://deep-index.moralis.io/api/v2.2/tokens/trending?chain=eth', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}


