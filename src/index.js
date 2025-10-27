// src/index.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const authController = require('./controllers/auth');
// const expressLayouts = require('express-ejs-layouts');
const { getActivities } = require('./controllers/activities'); // Desestruturando para pegar a função getActivities
const { getAthleteData } = require('./controllers/athletedata');
const { getLoad } = require('./controllers/load');
const router = express.Router();


const app = express();
const port = 27015;


// Configuração para usar o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Pasta onde os templates EJS estarão


// app.use(expressLayouts);


// Define o layout padrão (sem a extensão .ejs)
// app.set('layout', 'layout'); // O arquivo de layout é o layout.ejs

// Usar sessões para armazenar o accessToken
app.use(session({
  secret: 'seu segredo',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use true em ambiente HTTPS
}));

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

app.get('/activities', getActivities);

app.get('/dashboard', getAthleteData);

app.get('/load', getLoad);

app.get('/teste', (req, res) => {
  res.render('teste', {
    title: 'Teste',
    authenticated: '3434343',
    athleteName: 'Denis Menegon',
    body: 'Conteúdo do Teste',
    teste: 'este@'
  });
});


// Middleware para definir a variável "authenticated"
app.use((req, res, next) => {
  // Verifica se há um token de acesso na sessão (ou qualquer outra lógica de autenticação)
  res.locals.authenticated = req.session && req.session.accessToken ? true : false;
  
  next();
});

// Definir a rota principal (index)
app.get('/', (req, res) => {
  res.render('index', {
      title: 'Autenticação com Strava'
    , authenticated: res.locals.authenticated
    , athleteName: req.session.athleteName
    , body: ''
   
  // , authenticated: res.locals.authenticated // Passando a variável 'authenticated' para a view
  });
});

// Rota de autenticação
app.get('/auth', authController.authorize);

// Rota de callback após autorização
app.get('/callback', authController.callback);

// Rota para verificar se o usuário está autenticado
app.get('/check-auth', (req, res) => {
  if (req.session.accessToken) {
      // Se o token de acesso estiver na sessão, o usuário está autenticado
      return res.json({ authenticated: true });
  }
  // Caso contrário, o usuário não está autenticado
  return res.json({ authenticated: false });
});

// Rota de logout
app.get('/logout', (req, res) => {
  req.session.destroy(); // Exclui a sessão ao fazer logout
  res.redirect('/');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = router;