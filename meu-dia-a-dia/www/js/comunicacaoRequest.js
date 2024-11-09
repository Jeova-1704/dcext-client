function fetchCommunicationCards() {
    const userId = localStorage.getItem("idUser")
    
    $.ajax({
        url: "http://localhost:8080/api/v1/cards/get-all",
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

// Função para falar o título
function speakTitle(title) {
    // Verifica se a API de síntese de fala está disponível
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(title);
        speechSynthesis.speak(utterance);
    } else {
        console.error("API de síntese de fala não está disponível.");
    }
}

