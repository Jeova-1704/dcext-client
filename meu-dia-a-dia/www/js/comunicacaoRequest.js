function fetchCommunicationCards() {
    const userId = localStorage.getItem("idUser")
    
    $.ajax({
        url: "https://api-dcext-yxco.onrender.com/api/v1/cards/get-all",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ user_id: userId }),
        success: function(response) {
            displayCards(response);
        },
        error: function(error) {
            console.error("Erro ao buscar os cartões de comunicação:", error);
        }
    });
}

function displayCards(cartoes) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Limpa o conteúdo do contêiner antes de inserir novos cartões

    cartoes.forEach(carte => {
        const cardHtml = `
            <div class="col-6 col-md-4 col-lg-3">
                <div class="featurs-item text-center rounded bg-light p-4" onclick="speakTitle('${carte.title}')">
                    <div class="featurs-icon btn-square rounded-circle mb-4 mx-auto" style="background-color: #2196f3;">
                        <i class="${carte.icon} fa-3x text-white"></i>
                    </div>
                    <div class="featurs-content text-center">
                        <h5>${carte.title}</h5>
                        <p class="mb-0">${carte.description}</p>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML("beforeend", cardHtml);
    });
}

// Função para falar o texto usando TTS
function speakText(text) {
    // Verifica se o plugin de TTS está disponível
    if (window.TTS) {
        window.TTS.speak({
            text: text,
            locale: 'pt-BR', // Defina o idioma para Português Brasileiro
            rate: 1.0        // A velocidade do TTS (1.0 é normal)
        }).then(function () {
            console.log("Texto falado com sucesso!");
        }).catch(function (error) {
            console.error("Erro ao tentar falar o texto: ", error);
        });
    } else {
        console.error("O plugin TTS não está disponível.");
    }
}

// Exemplo de como usar a função para falar um título
function speakTitle(title) {
    speakText(title);
}