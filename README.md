🏃 Strava Data Visualizer (Node.js/EJS)

Este é um projeto web desenvolvido em Node.js que se conecta à API do Strava, autentica o usuário via OAuth e exibe dados de atividades, permitindo filtros por tipo de atividade e datas.

🌟 Funcionalidades

Autenticação OAuth2: Login seguro através da plataforma Strava.

Visualização de Dados: Exibe a lista de atividades do atleta autenticado.

Filtros: Permite filtrar as atividades por tipo (corrida, pedalada, etc.) e por intervalo de datas.

Interface Dinâmica: Utiliza EJS para renderizar visualizações dinâmicas e amigáveis ao usuário.

🛠️ Tecnologias Utilizadas

O projeto utiliza a seguinte stack tecnológica:

Categoria

Tecnologia

Descrição

Backend

Node.js

Ambiente de execução JavaScript.

Framework Web

Express

Framework minimalista para criar a aplicação web.

Templates

EJS (Embedded JavaScript)

Motor de template para gerar HTML dinâmico.

Auth/State

express-session

Gerenciamento de sessões para armazenar o accessToken.

HTTP Requests

axios

Cliente HTTP para interagir com a API do Strava.

Variáveis de Ambiente

dotenv

Para gerenciar credenciais e configurações sensíveis.

![Exemplo](tela_01.png)

🚀 Como Configurar e Executar

Siga estas etapas para ter o projeto rodando localmente.

1. Pré-requisitos

Node.js (versão LTS recomendada)

Conta de Desenvolvedor Strava (para obter Client ID e Secret)

2. Clonagem do Repositório

git clone [https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github](https://docs.github.com/pt/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)
cd strava-data-visualizer


3. Instalação de Dependências

Instale todas as bibliotecas listadas no seu package.json:

npm install


4. Configuração da API do Strava

Para se conectar à API, você precisa configurar um aplicativo no Strava Developers.

Passos:

Crie ou acesse seu aplicativo.

Defina o Authorization Callback Domain como localhost.

Anote o Client ID e o Client Secret.

5. Configuração das Variáveis de Ambiente (.env)

Crie um arquivo chamado .env na raiz do projeto (/Strava/.env) e insira suas credenciais.

Estrutura do .env:

# Credenciais fornecidas pelo Strava
STRAVA_CLIENT_ID=SEU_CLIENT_ID_AQUI
STRAVA_CLIENT_SECRET=SEU_CLIENT_SECRET_AQUI

# URI de redirecionamento usada no processo OAuth
# O servidor Express está configurado para rodar na porta 27015
STRAVA_REDIRECT_URI=http://localhost:27015/callback

# Variável opcional para o seu mapa, se estiver usando
MAPS_ID=SUA_CHAVE_DE_MAPA


6. Execução do Projeto

O servidor está configurado para iniciar na porta 27015 (conforme o arquivo src/index.js).

Inicie o servidor Node.js:

node src/index.js


Ou, se você definir um script start no seu package.json:

"scripts": {
  "start": "node src/index.js",
  ...
}


Então, você pode rodar:

npm start


Após a execução, acesse no seu navegador:

http://localhost:27015

👤 Desenvolvedor

Este projeto foi desenvolvido por:

Denis Menegon

https://www.linkedin.com/in/denis-menegon/

https://github.com/denismenegon
