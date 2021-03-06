import { Backend } from "./backend.js";

const API = new Backend()
API.setBaseUrl('http://localhost:3000')
console.log(API.getBaseUrl());

const novoAdmin = () => {
    API.post('/admins', {
        nomeAdmin: nomeLogin.value
    }).then(data => {
        console.log(data);
        window.location.href = './painel.html'
    })
}

const nomeLogin = document.querySelector('#inputNome')
const formLogin = document.querySelector('#formLogin')
const btnLogin = document.querySelector('#btnLogin')

formLogin.addEventListener('submit', event => {
    event.preventDefault()

    if (!nomeLogin.value) {
        nomeLogin.classList.add('is-invalid')
    } else {
        nomeLogin.classList.remove('is-invalid')
        nomeLogin.classList.add('is-invalid')
        btnLogin.setAttribute('disabled', 'disabled')
        btnLogin.innerHTML = `
                                <div class="spinner-border spinner-border-sm text-dark" role="status"
                                <span class="sr-only">Carregando...</span>
                                </div>
                             `
        novoAdmin()
    }
})