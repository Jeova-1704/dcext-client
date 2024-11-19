function fetchAgenda() {
    const userId = localStorage.getItem("idUser");
    const url = `http://localhost:8080/api/v1/agenda-to-do/userTask/${userId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar a agenda');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("agenda-container");
            container.innerHTML = "";

            data.forEach(agenda => {
                const agendaHTML = `
                    <div class="col-lg-4" id="agenda-${123}">
                        <div class="card card-margin">
                            <div class="card-header no-border">
                                <h5 class="card-title">${agenda.dia_da_semana}</h5>
                            </div>
                            <div class="card-body pt-0">
                                <div class="widget-49">
                                    <div class="widget-49-title-wrapper">
                                        <div class="widget-49-date-primary">
                                            <span class="widget-49-date-day">${agenda.dia}</span>
                                            <span class="widget-49-date-month">${agenda.mes}</span>
                                        </div>
                                        <div class="widget-49-meeting-info">
                                            <span class="widget-49-pro-title">${agenda.titulo}</span>
                                            <span class="widget-49-meeting-time">${agenda.hora_inicial} até ${agenda.hora_final} Hrs</span>
                                        </div>
                                    </div>
                                    <ol class="widget-49-meeting-points">
                                        ${agenda.toDos.map(todo => `<li class="widget-49-meeting-item"><span>${todo.description}</span></li>`).join('')}
                                    </ol>
                                    <div class="widget-49-meeting-action">
                                        <button class="btn btn-sm btn-flash-border-primary" onclick="markAsCompleted('${agenda.agenda_id}')">Marcar como concluída?</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                container.insertAdjacentHTML("beforeend", agendaHTML);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar a agenda:', error);
        });
}

function markAsCompleted(agendaId) {
    const url = `http://localhost:8080/api/v1/agenda-to-do/${agendaId}/complete`;
    
    // Dados para atualizar a agenda
    const updatedAgenda = {
        concluida: true
    };

    fetch(url, {
        method: 'PUT', // Usando o PUT para atualizar a agenda
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAgenda) // Envia o campo 'concluida' como 'true'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao marcar a agenda como concluída');
        }
        const agendaElement = document.getElementById(`agenda-${agendaId}`);
        if (agendaElement) {
            agendaElement.classList.add("completed"); // Adiciona a classe 'completed' na tarefa
        }
        alert('Agenda marcada como concluída!');
    })
    .catch(error => {
        console.error('Erro ao marcar a agenda como concluída:', error);
    });
}
