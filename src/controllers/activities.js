// src/controllers/activities.js
const axios = require('axios');
const strava = require('../services/strava');
const athleteController = require('./athletedata'); // Importando o controlador de dados do atleta


async function getActivities(req, res) {
  // const accessToken = req.query.accessToken; // Ou obter de uma sessão ou banco de dados

  const accessToken = req.session.accessToken; // Obtendo o token da sessão

  if (!accessToken) {
    // return res.status(400).send('Você precisa se autenticar primeiro.');
    return res.redirect('/');
  }

  // Pegando parâmetros de filtro da requisição
  const { startDate, endDate, activityTypeFilter } = req.query;

  try {
    const athleteName = await athleteController.getAthleteName(req, res);

    const activities = await strava.getActivities(accessToken, startDate, endDate);

    const kmPorData = {};

    // Convertendo startDate e endDate para o formato de comparação
    const start = startDate ? new Date(startDate + 'T00:00:00') : null;
    const end = endDate ? new Date(endDate + 'T23:59:59') : null;

   
    // Iterar sobre as atividades
    for (const activity of activities) {
      let latitude, longitude, city;

      // // Verificar se há coordenadas de início
      if (activity.start_latlng) {
        latitude = activity.start_latlng[0];
        longitude = activity.start_latlng[1];
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

      //   // Usar a função de geocodificação para obter a cidade
      //   try {
      //     city = await strava.getCityFromCoordinates(latitude, longitude);
      //     console.log(`Cidade: ${city}`);
      //   } catch (err) {
      //     console.error('Erro ao obter a cidade:', err);
      //     city = '';
      //   }
      }

      // Verificar a data da atividade e se está dentro do intervalo
      const activityDate = new Date(activity.start_date);
      const dateString = activityDate.toISOString().split('T')[0]; // Data no formato YYYY-MM-DD

      // Verificando se a atividade está dentro do intervalo de datas
      if (start && activityDate < start) continue; // Ignora atividades antes do startDate
      if (end && activityDate > end) continue; // Ignora atividades após o endDate

      // Filtragem do tipo de atividade (se fornecido)
      if (activityTypeFilter && activity.type !== activityTypeFilter) continue; // Ignora atividades que não são do tipo especificado

      // Convertendo distância para quilômetros
      const distanceKm = activity.distance / 1000;

      // Soma a distância do dia
      kmPorData[dateString] = (kmPorData[dateString] || 0) + distanceKm;
    }
  

    // });
    let popup = [];
    let i = 0;
    let movingTimeInSeconds = 0;  // 30 minutos = 1800 segundos
    let distanceInMeters = 0;    // 10 km = 10000 metros
    let velmax = 0
    let velmedia = 0
    let pace = 0;
    let calories = 0;
    let freqcard = 0;
    let ganel = 0;

    for (const activity of activities) {
      if (activityTypeFilter && activity.type !== activityTypeFilter) continue;
      console.log('Velocidade: ' + activity.average_speed * 3.6);

      movingTimeInSeconds = (activity.moving_time / 60).toFixed(2);
      distanceInMeters = (activity.distance / 1000).toFixed(2);
      pace = (movingTimeInSeconds / distanceInMeters).toFixed(2);

      console.log('Distância: ' + distanceInMeters);

      console.log('Tempo: ' + movingTimeInSeconds);

      console.log('Ritmo Médio: ' + movingTimeInSeconds / distanceInMeters);

      velmedia = activity.average_speed;
      velmedia = (velmedia * 3.6).toFixed(2);

      velmax = activity.max_speed;
      velmax = (velmax * 3.6).toFixed(2);  // Arredondando para 2 casas decimais

      calories = activity.calories;

      freqcard = activity.average_heartrate;

      ganel = activity.total_elevation_gain

      // Agora, adicionamos ao array popup
      popup.push(`${distanceInMeters} km \n ${movingTimeInSeconds} m \n ${pace} pace p. min/km \n ${velmax} vel. max. \n ${velmedia} vel. med. \n ${freqcard} freq. card. med. \n ${ganel} ele. max.`)  // Use push para adicionar ao arrayers + "</td>";

      console.log(popup.length);
    }


    
    let texto = '';
    i = 0;
    for (const [date, km] of Object.entries(kmPorData)) {
      // Verifique se o índice i está dentro do limite do array popup
      // const popupValue = popup[i] ? popup[i] : '';  // Se popup[i] não existir, use uma string vazia

      texto += `<tr class="linhacorrente"><td> ${date} - ${km.toFixed(2)} km</td><td style="display: none"> ${popup[i]} </td> <td style="display: none"><input data-input type="text" id="${i}" name="Total_Soma" value="teste"></td></tr> \n`;


      

      i += 1;
    }

    // Calculando o total de quilômetros percorridos (considerando todos os filtros)
    const totalKm = Object.values(kmPorData).reduce((total, km) => total + km, 0);

    texto += `<tr><td> Total de quilômetros percorridos: ${totalKm.toFixed(2)} km </td></tr>`;

    const authenticated = !!accessToken;

    res.render('activities', {
      title: 'Dashboard Strava - Activities',
      authenticated: authenticated, 
      athleteName: athleteName,
      body: texto
    });

  } catch (error) {
    res.status(500).send('Erro ao obter atividades');
  }
}

module.exports = { getActivities };

