// Espera todo o HTML ser carregado para o JS começar a rodar
document.addEventListener('DOMContentLoaded', () => {

    // Objeto para armazenar os itens do carrinho (ID do produto e quantidade)
    const carrinho = {};

    // Seleciona todos os botões de adicionar e remover
    const botoesAdicionar = document.querySelectorAll('.btn-adicionar');
    const botoesRemover = document.querySelectorAll('.btn-remover');
    
    // Seleciona os elementos do carrinho no HTML
    const listaCarrinho = document.getElementById('lista-carrinho');
    const valorTotalElemento = document.getElementById('valor-total');

    // Adiciona o evento de clique para cada botão de ADICIONAR
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', () => {
            const produtoDiv = botao.closest('.produto');
            const produtoId = produtoDiv.dataset.id;
            
            // Adiciona ou incrementa a quantidade do produto no carrinho
            carrinho[produtoId] = (carrinho[produtoId] || 0) + 1;
            
            atualizarCarrinho();
        });
    });

    // Adiciona o evento de clique para cada botão de REMOVER
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', () => {
            const produtoDiv = botao.closest('.produto');
            const produtoId = produtoDiv.dataset.id;

            // Só remove se a quantidade for maior que 0
            if (carrinho[produtoId] > 0) {
                carrinho[produtoId]--;
                // Se a quantidade chegar a 0, remove o item do objeto
                if (carrinho[produtoId] === 0) {
                    delete carrinho[produtoId];
                }
            }
            
            atualizarCarrinho();
        });
    });

    // Função principal que atualiza TODA a interface
    function atualizarCarrinho() {
        // Limpa a lista de itens do carrinho no HTML
        listaCarrinho.innerHTML = '';
        let valorTotal = 0;

        // Verifica se o carrinho está vazio
        if (Object.keys(carrinho).length === 0) {
            listaCarrinho.innerHTML = '<li class="placeholder">Seu carrinho está vazio.</li>';
        } else {
             // Passa por cada item no objeto 'carrinho'
            for (const produtoId in carrinho) {
                const quantidade = carrinho[produtoId];
                const produtoDiv = document.querySelector(`.produto[data-id='${produtoId}']`);
                const nome = produtoDiv.dataset.nome;
                const preco = parseFloat(produtoDiv.dataset.preco);

                const subtotal = quantidade * preco;
                valorTotal += subtotal;

                // Cria um novo item (li) para a lista do carrinho
                const itemCarrinho = document.createElement('li');
                itemCarrinho.innerHTML = `
                    <span>${quantidade}x ${nome}</span>
                    <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
                `;
                listaCarrinho.appendChild(itemCarrinho);
            }
        }

        // Atualiza a quantidade exibida ao lado de cada produto
        document.querySelectorAll('.produto').forEach(produtoDiv => {
            const produtoId = produtoDiv.dataset.id;
            const quantidadeSpan = produtoDiv.querySelector('.quantidade');
            quantidadeSpan.textContent = carrinho[produtoId] || 0;
        });
        
        // Atualiza o valor total no final da página
        valorTotalElemento.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }

});