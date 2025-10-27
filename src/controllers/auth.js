// src/controllers/auth.js
const strava = require('../services/strava');
const { REDIRECT_URI } = require('../config');
const { CLIENT_ID, CLIENT_SECRET } = require('../config');

// Função para identificar se o ambiente é local ou não
function isLocalEnvironment(req) {
  const host = req.get('Host'); // Obtém o Host a partir dos cabeçalhos da requisição
  return host.includes('localhost') || host.includes('127.0.0.1');
}

async function authorize(req, res) {
  // const authUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=activity:read&state`;

  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=activity:read,read&state=randomStateString`;

  console.log('Redirecionando para:', authUrl);
  res.redirect(authUrl);
}


async function callback(req, res) {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('Code is required.');
  }

  try {
     // Obtendo o accessToken
    const accessToken = await strava.getAccessToken(code);

    // Armazenando o accessToken na sessão
    req.session.accessToken = accessToken;
    
    // Agora, definindo authenticated com base no token armazenado
    const authenticated = req.session && req.session.accessToken ? true : false;

    res.redirect('/load');
  
  } catch (error) {
    res.status(500).send('Erro ao obter o access token');
  }
}


module.exports = { authorize, callback };