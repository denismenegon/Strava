// Função para buscar as atividades do atleta
async function fetchActivities() {
    try {
      const response = await fetch('/activities');
      const htmlContent = await response.text(); // Pega o HTML retornado pelo servidor
      document.getElementById('activities-container').innerHTML = htmlContent; // Insere o conteúdo HTML na página
    } catch (error) {
      console.error('Erro ao carregar as atividades:', error);
      document.getElementById('activities-container').innerHTML = 'Erro ao carregar as atividades.';
    }
  }
  
  // Chamar a função para buscar as atividades
  fetchActivities();