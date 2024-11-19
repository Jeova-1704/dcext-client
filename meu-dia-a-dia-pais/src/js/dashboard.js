function logout () {
    localStorage.removeItem('userId');
    window.location.href = '/';
}

function loadTasks(userId) {
    $.ajax({
        url: `https://api-dcext-yxco.onrender.com/api/v1/agenda-to-do/${userId}`,
        method: 'GET',
        success: function(response) {
            const tbody = document.getElementById('agendaTableBody');
            tbody.innerHTML = ''; 

            response.forEach(task => {
                let row = document.getElementById('agendaRowTemplate').innerHTML;
                row = row.replace('{titulo}', task.titulo)
                         .replace('{dia_da_semana}', task.dia_da_semana)
                         .replace('{dia}', task.dia)
                         .replace('{mes}', task.mes)
                         .replace('{hora_inicial}', task.hora_inicial)
                         .replace('{hora_final}', task.hora_final)
                         .replace('{status}', task.concluida ? 'Concluida' : 'Atribuida')
                         .replace(/{agenda_id}/g, task.agenda_id);

                tbody.insertAdjacentHTML('beforeend', row);
            });
        }
    });
}


function openCreateForm() {
    document.getElementById("createAgendaForm").reset();
    document.getElementById("toDoList").innerHTML = '<input type="text" class="form-control mb-2" name="toDoDescription" placeholder="Descrição do Item" required>';
    $('#createAgendaModal').modal('show');
}

function addToDoField() {
    const toDoList = document.getElementById("toDoList");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control mb-2";
    input.name = "toDoDescription";
    input.placeholder = "Descrição do Item";
    input.required = true;
    toDoList.appendChild(input);
}

function submitCreateForm() {
    const userId = localStorage.getItem('userId');
    const titulo = document.getElementById("titulo").value;
    const diaDaSemana = document.getElementById("diaDaSemana").value;
    const dia = parseInt(document.getElementById("dia").value);
    const mes = document.getElementById("mes").value;
    const horaInicial = document.getElementById("horaInicial").value;
    const horaFinal = document.getElementById("horaFinal").value;
    
    const toDoDescriptions = document.getElementsByName("toDoDescription");
    const toDos = Array.from(toDoDescriptions).map(input => ({ descricao: input.value }));

    const agendaRequest = {
        user_id: userId,
        titulo: titulo,
        dia_da_semana: diaDaSemana,
        dia: dia,
        mes: mes,
        hora_inicial: horaInicial,
        hora_final: horaFinal,
        toDos: toDos
    };

    $.ajax({
        url: "https://api-dcext-yxco.onrender.com/api/v1/agenda-to-do",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(agendaRequest),
        success: function() {
            alert("Tarefa criada com sucesso!");
            $('#createAgendaModal').modal('hide'); 
            
            loadTasks(userId);
        },
        error: function() {
            alert("Erro ao criar a tarefa.");
        }
    });
}


function deleteTask(agendaId) {
    if (confirm("Tem certeza de que deseja deletar esta tarefa?")) {
        $.ajax({
            url: `https://api-dcext-yxco.onrender.com/api/v1/agenda-to-do/${agendaId}`,
            method: 'DELETE',
            success: function() {
                alert("Tarefa deletada com sucesso!");
                const userId = localStorage.getItem('userId');
                loadTasks(userId);
            }
        });
    }
}

$('#agendaModal').on('show.bs.modal', function() {
    const userId = localStorage.getItem('userId');
    loadTasks(userId);
});


function openViewForm(agendaId) {
    $.ajax({
        url: `https://api-dcext-yxco.onrender.com/api/v1/agenda-to-do/agenda/${agendaId}`,
        method: 'GET',
        success: function(agenda) {
            alert(agenda.titulo) 

            document.getElementById('modalAgendaTitle').innerText = agenda.titulo;
            document.getElementById('modalAgendaDate').innerText = `${agenda.dia_da_semana}, ${agenda.dia} de ${agenda.mes}`;
            document.getElementById('modalAgendaTime').innerText = `${agenda.hora_inicial}h até às ${agenda.hora_final}`;

            const toDoList = document.getElementById('modalToDoList');
            toDoList.innerHTML = ''; 
            agenda.toDos.forEach((toDo, index) => {
                const li = document.createElement('li');
                li.innerText = `${index + 1}. ${toDo.description}`;
                toDoList.appendChild(li);
            });

            $('#viewAgendaModal').modal('show');
        },
        error: function() {
            alert('Erro ao buscar os detalhes da agenda.');
        }
    });
}

















// cards de comunicação
function loadCards(userId) {
    $.ajax({
        url: `https://api-dcext-yxco.onrender.com/api/v1/cards/get-all`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ "user_id": userId }),
        success: function(response) {
            const tbody = document.getElementById('cardTableBody');
            tbody.innerHTML = ''; // Limpa a tabela antes de preencher

            response.forEach(card => {
                let row = document.getElementById('cardRowTemplate').innerHTML;
                row = row.replace('{titulo}', card.title)
                         .replace('{descricao}', card.description)
                         .replace('{icone}', card.icon)
                         .replace('{card_id}', card.cardId);

                tbody.insertAdjacentHTML('beforeend', row);
            });
        }
    });
}

function deleteCard(cardId) {
    $.ajax({
        url: `https://api-dcext-yxco.onrender.com/api/v1/cards`,
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({ "cardId": cardId }),
        success: function() {
            alert('Card deletado com sucesso!');
            loadCards(localStorage.getItem('userId'));
        },
        error: function() {
            alert('Erro ao tentar deletar o card');
        }
    });
}

$('#createCardModal').on('shown.bs.modal', function () {
    const userId = localStorage.getItem('userId');
    loadCards(userId);
});

function openCreateCardForm() {
    $('#createCardFormModal').modal('show');
}

$('#createCardForm').on('submit', function (e) {
    console.log('Formulário submetido'); 
    e.preventDefault();

    const cardTitle = $('#cardTitle').val();
    const cardDescription = $('#cardDescription').val();
    const cardIcon = $('#cardIcon').val();
    const userId = localStorage.getItem('userId');

    $.ajax({
        url: 'https://api-dcext-yxco.onrender.com/api/v1/cards/create',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            title: cardTitle,
            description: cardDescription,
            icon: cardIcon,
            user_id: userId
        }),
        success: function(response) {
            alert('Cartão criado com sucesso!');
            $('#createCardFormModal').modal('hide');
            loadCards(userId);
        },
        error: function() {
            alert('Erro ao tentar criar o cartão.');
        }
    });
});

// Função para abrir o modal de seleção de ícones
function openIconSelectionModal() {
    $('#selectIconModal').modal('show');
}

// Função para selecionar o ícone
function selectIcon(iconClass) {
    // Exibe o ícone selecionado no campo do formulário
    $('#cardIcon').val(iconClass); // Campo hidden com a classe do ícone

    // Atualiza a visualização do ícone escolhido no modal
    $('#selectedIconPreview').html(`<i class="${iconClass} fa-2x"></i>`);
    
    // Fecha o modal após a seleção
    $('#selectIconModal').modal('hide');
}

