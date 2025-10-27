// src/controllers/activities.js
const axios = require('axios');
// const strava = require('../services/strava');
const athleteController = require('./athletedata'); // Importando o controlador de dados do atleta


async function getLoad(req, res) {

  const accessToken = req.session.accessToken; // Obtendo o token da sessão

  if (!accessToken) {
    // return res.status(400).send('Você precisa se autenticar primeiro.');
    return res.redirect('/');
  }

  // Pegando parâmetros de filtro da requisição
  const { startDate, endDate, activityTypeFilter } = req.query;

  try {
    const athleteName = await athleteController.getAthleteName(req, res);

    const authenticated = !!accessToken;

    res.render('index', {
      title: '',
      authenticated: authenticated, 
      athleteName: athleteName,
      body: ''
    });

  } catch (error) {
    res.status(500).send('Erro ao obter atividades');
  }
}

module.exports = { getLoad };

