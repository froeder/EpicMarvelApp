import axios from 'axios';
import md5 from 'md5'

const urlBaseMarvel = 'https://gateway.marvel.com:443/v1/public/';
const apiKey = '2355bc2c542231d7d0c2255c6310ecfc';
const privateKey = '4631762a2a1c854cad8f2381fd04674692feda30'

var ts = new Date().getTime();

var stringToHash = ts  + privateKey + apiKey;
var hash = md5(stringToHash);

export default {
    getAllCharacters: (nome, callback) => {
        const urlCharacters = urlBaseMarvel + 'characters?name=' +nome+ '&ts='+ts+ '&apikey=' + apiKey + '&hash=' + hash;
        axios.get(urlCharacters).then((characters) => {
            if (callback) {
                callback(characters);
            }
        })
    }
}