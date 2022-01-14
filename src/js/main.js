import { Backend } from "./backend.js";
import { Toast } from "./toast.js";

const API = new Backend()
API.setBaseUrl('http://localhost:3000')
console.log(API.getBaseUrl);

const spanNome = document.querySelector('#nomeMenu')
const selecionarMarcas = document.querySelector('#select-marcas')
const formProduto = document.querySelector('#form-add-produto')
const formProdutoNome = document.querySelector('#input-produto-nome')
const formProdutoQtdade = document.querySelector('#input-produto-qtdade');
const formProdutoValor = document.querySelector('#input-produto-valor')
const formBtnAddProduto = document.querySelector('#input-produto-valor')
const formMarca = document.querySelector('#form-add-marca')
const formMarcaNome = document.querySelector('#btn-add-marca')
const listaProdutos = document.querySelector('#lista-produtos')

const geraNome = () => {
    API.get('/admins')
        .then(data => {
            console.log(data);
            spanNome.textContent = data[data.length - 1].nomeAdmin
            document.title = `Olá, ${data[data.length -1].nomeAdmin}`
        })
}

geraNome()


// BLOCO BUSCAR PRODUTOS E MARCAS
const buscarProduto = () => {
    API.getBoth('/produtos', '/marcas')
        .then(data => {
            console.log(data);
            listaProdutos.innerHTML = ''

            data[0].forEach(function(produto) {
                const nomeDaMarca = data[1][produto.marcaId - 1].nomeMarca
                let itemQuantidade = ''

                if (produto.quantidade <= 1) {
                    itemQuantidade = `${produto.quantidade} unidade`
                } else {
                    itemQuantidade = `${produto.quantidade} unidades`
                }

                listaProdutos.insertAdjacentHTML('beforeend', `
                 <li class="list-group-item bg-my-dark-light">
                    <div class="col-3">
                       <span class="font-weight-bold">${produto.nomeProduto}</span>
                    </div>
                    <div class="col-2">
                       ${nomeDaMarca}
                    </div>
                    <div class="col-2>
                        R$ ${produto.valor}
                    </div>
                    <div class="col-2>
                        R$ ${itemQuantidade}
                    </div>
                 </li>
                                                              `)
            })
        })
}

buscarProduto()