// ===========================================
// ARQUIVO: carrinho.js
// CARRINHO COMPLETO - 100% FUNCIONAL
// ===========================================

const CARRINHO_STORAGE_KEY = 'comprafacil_carrinho';
let carrinho = [];

// ===========================================
// INICIALIZAÇÃO
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Carrinho inicializado');
    carregarCarrinho();
    atualizarTodosContadores();
    atualizarCarrinhoUI();
    configurarEventos();
});

// ===========================================
// FUNÇÃO PRINCIPAL - ADICIONAR AO CARRINHO
// ===========================================
window.adicionarAoCarrinho = function(produto) {
    console.log('✅ Adicionando ao carrinho:', produto);
    
    // Validação básica
    if (!produto || !produto.id) {
        console.error('Produto inválido');
        return;
    }
    
    // Verifica se produto já existe no carrinho
    const itemExistente = carrinho.find(item => item.id === produto.id);
    
    if (itemExistente) {
        // Aumenta quantidade
        itemExistente.quantidade += 1;
        mostrarNotificacao(`➕ Mais um ${produto.nome}`, 'success');
    } else {
        // Adiciona novo item
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagem || 'default.jpg',
            bancada: produto.bancada || 'TI12BD',
            quantidade: 1
        });
        mostrarNotificacao(`✅ ${produto.nome} adicionado!`, 'success');
    }
    
    // Salva e atualiza
    salvarCarrinho();
    atualizarTodosContadores();
    atualizarCarrinhoUI();
    animarBotaoAdicionar();
};

// ===========================================
// FUNÇÕES DE QUANTIDADE
// ===========================================
window.alterarQuantidade = function(id, acao) {
    const item = carrinho.find(item => item.id === id);
    
    if (!item) return;
    
    if (acao === 'aumentar') {
        item.quantidade += 1;
        mostrarNotificacao(`➕ ${item.nome}`, 'info');
    } else if (acao === 'diminuir') {
        if (item.quantidade > 1) {
            item.quantidade -= 1;
            mostrarNotificacao(`➖ ${item.nome}`, 'info');
        } else {
            removerDoCarrinho(id);
            return;
        }
    }
    
    salvarCarrinho();
    atualizarTodosContadores();
    atualizarCarrinhoUI();
};

window.removerDoCarrinho = function(id) {
    const item = carrinho.find(item => item.id === id);
    carrinho = carrinho.filter(item => item.id !== id);
    mostrarNotificacao(`🗑️ ${item?.nome || 'Item'} removido`, 'warning');
    salvarCarrinho();
    atualizarTodosContadores();
    atualizarCarrinhoUI();
};

window.limparCarrinho = function() {
    if (carrinho.length === 0) {
        mostrarNotificacao('ℹ️ Carrinho vazio', 'info');
        return;
    }
    
    if (confirm('Tem certeza?')) {
        carrinho = [];
        salvarCarrinho();
        atualizarTodosContadores();
        atualizarCarrinhoUI();
        mostrarNotificacao('🗑️ Carrinho limpo', 'warning');
    }
};

// ===========================================
// CÁLCULOS
// ===========================================
function calcularTotal() {
    return carrinho.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function calcularTotalItens() {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

// ===========================================
// ARMAZENAMENTO
// ===========================================
function salvarCarrinho() {
    localStorage.setItem(CARRINHO_STORAGE_KEY, JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const salvo = localStorage.getItem(CARRINHO_STORAGE_KEY);
    if (salvo) {
        try {
            carrinho = JSON.parse(salvo);
        } catch (e) {
            carrinho = [];
        }
    }
}

// ===========================================
// ATUALIZAÇÃO DE INTERFACE
// ===========================================
function atualizarTodosContadores() {
    const totalItens = calcularTotalItens();
    const contadores = document.querySelectorAll('#contador-carrinho');
    
    contadores.forEach(contador => {
        contador.textContent = totalItens;
        
        // Animação
        contador.style.animation = 'none';
        contador.offsetHeight;
        contador.style.animation = 'pulse 0.3s ease';
    });
}

function atualizarCarrinhoUI() {
    const container = document.getElementById('carrinho-itens');
    const totalElement = document.getElementById('total-carrinho');
    
    if (!container) return;
    
    if (carrinho.length === 0) {
        container.innerHTML = `
            <div class="carrinho-vazio">
                <i class="fas fa-shopping-cart"></i>
                <p>Seu carrinho está vazio</p>
                <small>Adicione produtos das bancadas</small>
            </div>
        `;
    } else {
        let html = '';
        
        carrinho.forEach(item => {
            html += `
                <div class="carrinho-item" data-id="${item.id}">
                    <div class="carrinho-item-imagem">
                        <img src="imagens/produtos/${item.imagem}" 
                             alt="${item.nome}"
                             onerror="this.src='https://placehold.co/60x60/3F6F98/white?text=${item.nome.charAt(0)}'">
                    </div>
                    <div class="carrinho-item-info">
                        <div class="carrinho-item-nome">${item.nome}</div>
                        <div class="carrinho-item-preco">${item.preco} Kz</div>
                        <div class="carrinho-item-bancada">${item.bancada}</div>
                        <div class="carrinho-item-acoes">
                            <button class="btn-qtd" onclick="alterarQuantidade(${item.id}, 'diminuir')">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="item-qtd">${item.quantidade}</span>
                            <button class="btn-qtd" onclick="alterarQuantidade(${item.id}, 'aumentar')">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="btn-remover" onclick="removerDoCarrinho(${item.id})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    if (totalElement) {
        totalElement.textContent = `${calcularTotal()} Kz`;
    }
}

// ===========================================
// NOTIFICAÇÕES (VERDE COM LETRAS BRANCAS)
// ===========================================
function mostrarNotificacao(mensagem, tipo = 'success') {
    // Remove notificação anterior
    const notificacaoAnterior = document.querySelector('.notificacao-personalizada');
    if (notificacaoAnterior) notificacaoAnterior.remove();
    
    // Cria nova notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao-personalizada notificacao-${tipo}`;
    
    let icone = '✅';
    if (tipo === 'warning') icone = '⚠️';
    if (tipo === 'info') icone = 'ℹ️';
    if (tipo === 'error') icone = '❌';
    
    notificacao.innerHTML = `
        <span class="notificacao-icone">${icone}</span>
        <span class="notificacao-mensagem">${mensagem}</span>
    `;
    
    document.body.appendChild(notificacao);
    
    // Anima entrada
    setTimeout(() => notificacao.classList.add('show'), 10);
    
    // Remove após 2 segundos
    setTimeout(() => {
        notificacao.classList.remove('show');
        setTimeout(() => notificacao.remove(), 300);
    }, 2000);
}

// ===========================================
// ANIMAÇÕES
// ===========================================
function animarBotaoAdicionar() {
    const botoes = document.querySelectorAll('.btn-add');
    botoes.forEach(btn => {
        btn.style.transform = 'scale(1.2)';
        btn.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.style.backgroundColor = '';
        }, 200);
    });
}

// ===========================================
// EVENTOS DO CARRINHO
// ===========================================
function configurarEventos() {
    // Abrir carrinho
    const iconesCarrinho = document.querySelectorAll('#carrinho-icone');
    const overlay = document.getElementById('carrinho-overlay');
    
    iconesCarrinho.forEach(icone => {
        icone.addEventListener('click', () => {
            if (overlay) {
                overlay.classList.add('active');
                atualizarCarrinhoUI();
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fechar carrinho
    const fecharBtn = document.getElementById('fechar-carrinho');
    if (fecharBtn) {
        fecharBtn.addEventListener('click', fecharCarrinho);
    }
    
    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                fecharCarrinho();
            }
        });
    }
    
    // Finalizar pedido
    const finalizarBtn = document.getElementById('finalizar-pedido');
    if (finalizarBtn) {
        finalizarBtn.addEventListener('click', function() {
            const nome = document.getElementById('cliente-nome')?.value.trim();
            const local = document.getElementById('cliente-local')?.value.trim();
            
            if (!nome || !local) {
                mostrarNotificacao('Preencha nome e local!', 'warning');
                return;
            }
            
            if (carrinho.length === 0) {
                mostrarNotificacao('Carrinho vazio!', 'warning');
                return;
            }
            
            if (typeof window.enviarPedidoWhatsApp === 'function') {
                window.enviarPedidoWhatsApp(carrinho, calcularTotal(), nome, local);
                fecharCarrinho();
            }
        });
    }
    
    // Limpar carrinho
    const limparBtn = document.getElementById('limpar-carrinho');
    if (limparBtn) {
        limparBtn.addEventListener('click', window.limparCarrinho);
    }
}

function fecharCarrinho() {
    const overlay = document.getElementById('carrinho-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===========================================
// EXPORTAÇÃO
// ===========================================
window.carrinho = carrinho;
window.calcularTotal = calcularTotal;