//CRUD - create, read, update and delete

const cNome = document.querySelector('#c-nome')
const cTel = document.querySelector('#c-tel')
const cEmail = document.querySelector('#c-email')
const modal = document.querySelector('.modal-container')
const btnSalvar = document.querySelector('#btnSalvar')
const tBody = document.querySelector('#tBody')
let indexMap = {};
let clients = []
let id

const openModal = function (edit = false, index = 0) { 
    modal.classList.add('active')
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('active')
    }
}

const createRow = (item,index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `<td>${item.nome}</td>
    <td>${item.tel}</td>
    <td>${item.email}</td>
    <td class="acao">
        <button type="button" class="button edit" id="edit-${index}">Editar</button>
    </td>
    <td class="acao">
        <button type="button" class="button delete" id="delete-${index}" >Excluir</button>
    </td>`

    tBody.appendChild(newRow)

    // Adicionando event listeners aos botões
    document.querySelector(`#edit-${index}`).addEventListener('click', () => editClient(index))
    document.querySelector(`#delete-${index}`).addEventListener('click', () => deleteClient(index))

    indexMap[index] = tBody.childNodes.length - 1;
}

const updateRow = (index, client) => {
    // Seleciona a linha da tabela no índice especificado
    const row = tBody.childNodes[indexMap[index]];

    // Atualiza o conteúdo HTML da linha com os novos dados do cliente
    /* row.innerHTML = `<td>${client.nome}</td>
    <td>${client.tel}</td>
    <td>${client.email}</td>
    <td class="acao">
        <button type="button" class="button edit" id="edit-${index}">Editar</button>
    </td>
    <td class="acao">
        <button type="button" class="button delete" id="delete-${index}" >Excluir</button>
    </td>`

    document.querySelector(`#edit-${index}`).addEventListener('click', () => editClient(index))
    document.querySelector(`#delete-${index}`).addEventListener('click', () => deleteClient(index)) */

    row.cells[0].innerText = client.nome;
    row.cells[1].innerText = client.tel;
    row.cells[2].innerText = client.email;
     
}

const creatClient = () => {
    const client =  {
        nome: cNome.value,
        tel: cTel.value,
        email: cEmail.value
    }

    clients.push(client)
    createRow(client, clients.length - 1)

    // Limpa os campos de entrada
    cNome.value = ''
    cTel.value = ''
    cEmail.value = ''
}

const deleteClient = (index) => {
    clients.splice(index, 1)
    tBody.removeChild(tBody.childNodes[index])

    delete indexMap[index];
    for (let key in indexMap) {
        if (indexMap[key] > index) {
            indexMap[key]--;
        }
    }
}

const updateClient = (index, newClient) => {
    clients[index] = newClient;
    updateRow(index, newClient)
}

const editClient = (index) => {
    id = index;

    // Preenche os campos de entrada com os dados do cliente
    cNome.value = clients[index].nome;
    cTel.value = clients[index].tel;
    cEmail.value = clients[index].email;

    openModal();
}

btnSalvar.onclick = e => {
    e.preventDefault();

    //verifica se os campos de entradas estão vazios e se estiverem entra no modo de edição
    if(cNome.value !== '' && cTel.value !== '' && cEmail.value !== ''){
        const newClient = {  //variavel que armazena os dados atualizados do
            nome: cNome.value,
            tel: cTel.value,
            email: cEmail.value
        };
        if (id !== undefined) {
            updateClient(id, newClient);
        } else {
            creatClient();
        }
        // Limpa os campos de entrada e o id
        cNome.value = ''
        cTel.value = ''
        cEmail.value = ''
        id = undefined
    }

    console.log(tBody)
}