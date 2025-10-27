// src/controllers/athletedata.js
const axios = require('axios');
const strava = require('../services/strava');

// Rota de exemplo após login com Strava
async function getAthleteData(req, res) {

  console.log(req.session.accessToken);

  const accessToken = req.session.accessToken; // Obtendo o token da sessão

  if (!accessToken) {
      return res.status(400).send('Você precisa se autenticar primeiro.');
  }

  try {
      const dashboard = await strava.getAthleteData(accessToken); // Chamada para obter dados do atleta

      // Verifique se a resposta contém dados do atleta
      if (!dashboard || !dashboard.firstname) {
          return res.status(500).send('Não foi possível obter os dados do atleta');
      }

      // Verifica se o token de acesso está disponível, ou seja, o usuário está autenticado
      const authenticated = !!accessToken;  // Se accessToken existe, então está autenticado

      // O nome do atleta será retornado na resposta da API
      const athleteName = `${dashboard.firstname} ${dashboard.lastname}`;

      // Armazene o nome do atleta na sessão
      req.session.athleteName = athleteName; // Salvando o nome do atleta na sessão

      // Passe o nome do atleta para a view
      res.render('dashboard', {
          title: 'Dashboard Strava',
          authenticated: authenticated,
          athleteName: athleteName,
          body: '',
          teste: 'funcionou!'
      });
  } catch (error) {
      console.error('Erro ao obter informações do atleta:', error);
      res.status(500).send('Erro ao obter dados do Strava');
  }
}


async function getAthleteName(req, res) {

  console.log(req.session.accessToken);

  const accessToken = req.session.accessToken; // Obtendo o token da sessão

  if (!accessToken) {
      return res.status(400).send('Você precisa se autenticar primeiro.');
  }

  try {
      const dashboard = await strava.getAthleteName(accessToken); // Chamada para obter dados do atleta

      // Verifique se a resposta contém dados do atleta
      if (!dashboard || !dashboard.firstname) {
          return res.status(500).send('Não foi possível obter os dados do atleta');
      }
  
      // Verifica se o token de acesso está disponível, ou seja, o usuário está autenticado
      const authenticated = !!accessToken;  // Se accessToken existe, então está autenticado

      // O nome do atleta será retornado na resposta da API
      const athleteName = `${dashboard.firstname} ${dashboard.lastname}`;

      // Armazene o nome do atleta na sessão
      req.session.athleteName = athleteName; // Salvando o nome do atleta na sessão

      return athleteName;
  } catch (error) {
      console.error('Erro ao obter informações do atleta:', error);
      res.status(500).send('Erro ao obter dados do Strava');
  }
}

  module.exports = { getAthleteData, getAthleteName };