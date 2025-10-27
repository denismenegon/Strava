
const table = document.getElementById("myTable");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

// Evento para mouse sobre a tabela
table.addEventListener("mouseover", function(event) {
    const row = event.target.closest("tr");  // Verifica a linha que o mouse passou

    // Verifica se o mouse passou sobre uma linha de dados (não o cabeçalho)
    if (row && row.parentNode.tagName !== "THEAD") {
        const cells = row.getElementsByTagName("td");  // Pega todas as células da linha

        let hiddenText = '';

        // Itera sobre todas as células da linha para pegar as que estão com display: none
        for (let cell of cells) {
            // Verifica se a célula está com display: none
            if (getComputedStyle(cell).display === 'none') {
                hiddenText += cell.innerText + ' ';  // Pega o conteúdo da célula oculta
            }
        }

        // Exibe as informações das células ocultas na pop-up
        if (hiddenText) {
            popupText.innerText = hiddenText;
            popup.style.display = "block";  // Exibe a pop-up

     

            // Seleciona todas as linhas da tabela
            // const rows = document.querySelectorAll("tr");

            // Obtém o espaço onde o ID será exibido
            // const idDisplay = document.getElementById("idDisplay");

            // Para cada linha, adicione o evento de mouseover
            // rows.forEach(row => {
            // row.addEventListener("mouseover", function() {
            //     // Exibe o ID da linha quando o mouse passa sobre ela
            //     // idDisplay.textContent = `ID da linha: ${this.id}`;

            //     alert(this.id);
            // });

            // let meuID = document.querySelectorAll('[data-input]');

            // meuID.forEach( (e) => {
            //     meuID.addEventListener("mouseover", function() {
            //     let qualID = e.id;
            //     console.log(qualID);
            //     alert(qualID);
                
            // })
        }

       


        // const name = cells[0].innerText;  // Pega o conteúdo da primeira célula (nome)
        // const age = cells[1].innerText;   // Pega o conteúdo da segunda célula (idade)
        // const city = cells[2].innerText;  // Pega o conteúdo da terceira célula (cidade)

        // Exibe as informações da linha na pop-up
        // popupText.innerText = `Nome: ${name}\nIdade: ${age}\nCidade: ${city}`;

        // popupText.innerText = cells[0].innerText;
        // popup.style.display = "block";  // Exibe a pop-up
    }
});



// Seleciona todas as linhas com o atributo data-input (onde os inputs estão localizados)
// const rows = document.querySelectorAll(".linhacorrente");

// document.addEventListener("DOMContentLoaded", function() {
//     // Seleciona todas as linhas da tabela com a classe 'linhacorrente'
//     const rows = document.querySelectorAll(".linhacorrente");

//     rows.forEach(row => {
//       // Adiciona o evento de mouseover para cada linha
//       row.addEventListener("mouseover", function() {
//         // Encontrar o campo de entrada (input) dentro da célula (td) que tem o atributo data-input
//         const inputIdCell = this.querySelector('input[data-input]'); // Seleciona o input da linha
        
//         if (inputIdCell) {
//           const inputId = inputIdCell.id;  // Pega o id do input
//           const inputValue = inputIdCell.value;  // Pega o valor do input

//           // Exibe o valor do id e o valor do campo input no console e alert
//           console.log(`ID do campo: ${inputId}, Valor do campo: ${inputValue}`);
//           alert(`ID do campo: ${inputId}, Valor do campo: ${inputValue}`);
//         }
//       });
//     });
//   });

  

function closePopup() {
    popup.style.display = "none";
}

// Fecha o pop-up quando o mouse sai da linha (opcional)
table.addEventListener("mouseout", function(event) {
    const row = event.target.closest("tr");
    if (row && row.parentNode.tagName !== "THEAD") {
        popup.style.display = "none";
    }
});
