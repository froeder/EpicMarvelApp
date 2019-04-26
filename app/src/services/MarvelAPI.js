import axios from 'axios';
import md5 from 'md5'

const urlBaseMarvel = 'https://gateway.marvel.com:443/v1/public/';
const apiKey = '2355bc2c542231d7d0c2255c6310ecfc';
const privateKey = '4631762a2a1c854cad8f2381fd04674692feda30'

var ts = new Date().getTime();

var stringToHash = ts  + privateKey + apiKey;
var hash = md5(stringToHash);



export default {
    getAllCharacters: (limit, callback) => {
        const urlCharacters = urlBaseMarvel + 'characters?ts='+ts+ '&limit='+ limit + '&apikey=' + apiKey + '&hash=' + hash;
        console.log(urlCharacters)
        axios.get(urlCharacters).then((characters) => {
            if (callback) {
                callback(characters);
            }
        })
    }
}

// const hash = md5.create()
        // hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY)

        // const response = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`)
        // const responseJson = await response.json()