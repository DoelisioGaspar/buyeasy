// ===========================================
// ARQUIVO: produtos.js
// DADOS DOS PRODUTOS - ATUALIZADO
// ===========================================

/* COMENTÁRIO PARA PROGRAMADORES:
   ===========================================
   COMO ADICIONAR UMA NOVA BANCADA:
   
   1. Copie um objeto completo dentro do array bancadas
   2. Cole no final (antes do último ])
   3. Altere:
      - nome: "Nome da Bancada" (DEVE ser igual ao usado na URL)
      - produtos: array com todos os produtos
   
   ESTRUTURA DE CADA PRODUTO:
   {
       id: NUMERO_UNICO,           // Use 201, 202, 203...
       nome: "Nome do Produto",
       descricao: "Descrição curta",
       preco: 300,                  // Apenas número (sem Kz)
       imagem: "nome-arquivo.jpg",   // Deve estar em imagens/produtos/
       categoria: "salgado" ou "bebida" ou "promoção",
       tag: "🏷️ TEXTO DESTAQUE"      // Opcional
   }
   ===========================================
*/

const bancadas = [
    {
        nome: "TI12BD",
        produtos: [
            {
                id: 101,
                nome: "Mini Cachorro",
                descricao: "Mini cachorro-quente com salsicha, molho e batata palha",
                preco: 300,
                imagem: "mini-cachorro.jpg",
                categoria: "salgado",
                tag: "🌭 QUENTINHO"
            },
            {
                id: 102,
                nome: "Mini Pizza",
                descricao: "Mini pizza de queijo, calabresa ou frango",
                preco: 300,
                imagem: "mini-pizza.jpg",
                categoria: "salgado",
                tag: "🍕 ITALIANA"
            },
            {
                id: 103,
                nome: "Chamuça",
                descricao: "Chamuça de carne ou frango, crocante e temperada",
                preco: 200,
                imagem: "chamuca.jpg",
                categoria: "salgado",
                tag: "🥟 CROCANTE"
            },
            {
                id: 109,
                nome: "Biscoito",
                descricao: "Chamuça de carne ou frango, crocante e temperada",
                preco: 50,
                imagem: "Biscoito.jpeg",
                categoria: "salgado",
                tag: "🥟 CROCANTE"
            },
            {
                id: 104,
                nome: "Risóis",
                descricao: "Risóis de camarão ou carne, massa fina e crocante",
                preco: 50,
                imagem: "risois.jpg",
                categoria: "salgado",
                tag: "⚡ 50 Kz"
            },
            {
                id: 105,
                nome: "Pastel",
                descricao: "Pastel de carne, queijo ou frango, frito na hora",
                preco: 100,
                imagem: "pastel.jpg",
                categoria: "salgado",
                tag: "🥟 CASEIRO"
            },
            {
                id: 106,
                nome: "Sumo Natural (500ml)",
                descricao: "Sabores: laranja, maracujá, manga ou abacaxi",
                preco: 300,
                imagem: "sumo-500.jpg",
                categoria: "bebida",
                tag: "🧃 NATURAL"
            },
            {
                id: 107,
                nome: "Sumo Natural (300ml)",
                descricao: "Sabores: laranja, maracujá, manga ou abacaxi",
                preco: 200,
                imagem: "sumo-300.jpg",
                categoria: "bebida",
                tag: "🥤 REFRESCANTE"
            },
            {
                id: 108,
                nome: "Combo Promocional",
                descricao: "2 Mini Cachorros + 2 Sumos (300ml)",
                preco: 900,
                imagem: "combo.jpg",
                categoria: "promoção",
                tag: "💰 ECONOMIA 100 Kz"
            }
        ]
    }
    
    // ===========================================
    // EXEMPLO DE NOVA BANCADA (descomente para usar)
    // ===========================================
    /*
    ,
    {
        nome: "Doces & Cia",
        produtos: [
            {
                id: 201,
                nome: "Bolo de Chocolate",
                descricao: "Fatia generosa de bolo com cobertura",
                preco: 500,
                imagem: "bolo.jpg",
                categoria: "doce",
                tag: "🍰 CASEIRO"
            },
            {
                id: 202,
                nome: "Cupcake",
                descricao: "Baunilha com chantilly",
                preco: 300,
                imagem: "cupcake.jpg",
                categoria: "doce",
                tag: "🧁 ESPECIAL"
            }
        ]
    }
    */
];

function buscarProdutosPorBancada(nomeBancada) {
    const bancada = bancadas.find(b => b.nome === nomeBancada);
    return bancada ? bancada.produtos : [];
}

function buscarTodasBancadas() {
    return bancadas.map(b => b.nome);
}

function buscarProdutoPorId(id) {
    for (let bancada of bancadas) {
        const produto = bancada.produtos.find(p => p.id === id);
        if (produto) {
            return {
                ...produto,
                bancada: bancada.nome
            };
        }
    }
    return null;
}