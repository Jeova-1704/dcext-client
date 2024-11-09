function fetchAgenda() {
    const userId = localStorage.getItem("idUser");
    const url = `http://localhost:8080/api/v1/agenda-to-do/${userId}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar a agenda');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("agenda-container"); // Adicione um div com o id "agenda-container" no HTML
            container.innerHTML = ""; // Limpa o conteúdo anterior

            data.forEach(agenda => {
                // Criação do HTML para cada tarefa
                const agendaHTML = `
                    <div class="col-lg-4">
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
                                        <a href="#" class="btn btn-sm btn-flash-border-primary">Concluido</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Adiciona o HTML da tarefa ao container
                container.insertAdjacentHTML("beforeend", agendaHTML);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar a agenda:', error);
        });
}
