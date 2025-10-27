// src/services/strava.js
const axios = require('axios');
const { CLIENT_ID, CLIENT_SECRET } = require('../config');

// Função para obter o token de acesso
async function getAccessToken(code) {
  try {
    const response = await axios.post('https://www.strava.com/oauth/token', null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      },
    });
    
    return response.data.access_token;
  } catch (error) {
    throw new Error('Erro ao obter o access token');
  }
}

// Função para obter atividades
async function getActivities(accessToken, startDate, endDate) {
  try {
    // Converter startDate e endDate para timestamps Unix (segundos desde 1970)
    const after = startDate ? new Date(startDate).getTime() / 1000 : null; // Convertendo para Unix timestamp
    const before = endDate ? new Date(endDate).getTime() / 1000 : null; // Convertendo para Unix timestamp

    const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: { Authorization: `Bearer ${accessToken}` },
      params: { 
        per_page: 150,
        page: 1,
        after: after,
        before: before } 
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter atividades');
  }
}

// Função para obter dados do atleta
async function getAthleteData(accessToken) {
  try {
    const response = await axios.get('https://www.strava.com/api/v3/athlete', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter atividades');
  }
}

// Função para obter dados do atleta
async function getAthleteName(accessToken) {
  try {
    const response = await axios.get('https://www.strava.com/api/v3/athlete', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter atividades');
  }
}


// Função async que realiza a geocodificação reversa (como exemplo, uma função fictícia)
async function getCityFromCoordinates(latitude, longitude) {
  const apiKey = 'AIzaSyDP_PkEJ32dw08nikiY8aXLxUz49cSyozY'; // Substitua com sua chave de API válida
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  try {
    // Fazendo a requisição para a API
    const response = await axios.get(apiUrl);

    if (response.data.results && response.data.results.length > 0) {
      const city = response.data.results[0].components.city || 'Cidade não encontrada';
      return city;
    } else {
      console.error('Nenhum resultado encontrado para as coordenadas');
      return 'Cidade não encontrada';
    }
  } catch (err) {
    console.error('Erro ao acessar o serviço de geocodificação:', err.message || err);
    return 'Erro ao acessar o serviço de geocodificação';
  }
}

// async function getLoad(accessToken) {
//   try {
//     // Converter startDate e endDate para timestamps Unix (segundos desde 1970)

//     const response = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
//       headers: { Authorization: `Bearer ${accessToken}` }
//     });

//     return response.data;

//   } catch (error) {
//     throw new Error('Erro ao obter atividades');
//   }
// }


// module.exports = { getAccessToken, getActivities, getAthleteData, getAthleteName, getCityFromCoordinates, getLoad };

module.exports = { getAccessToken, getActivities, getAthleteData, getAthleteName, getCityFromCoordinates };