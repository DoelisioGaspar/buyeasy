// ===========================================
// ARQUIVO: whatsapp.js
// INTEGRAÇÃO COM WHATSAPP
// ===========================================

/* ===========================================
   COMENTÁRIOS PARA PROGRAMADORES:
   
   Este arquivo gerencia o envio de pedidos
   para o WhatsApp da TI12BD.
   
   NÚMERO PRINCIPAL: 938080177
   
   FUNÇÕES:
   - enviarPedidoWhatsApp: envia pedido formatado
   - abrirWhatsAppVendedor: para cadastro de novas bancadas
   - formatarMensagem: estrutura padrão do pedido
   =========================================== */

// Número de WhatsApp do grupo (apenas números, sem + ou espaços)
const NUMERO_WHATSAPP = '244938080177';  // Código 244 + 938080177

/* ===========================================
   FUNÇÃO PRINCIPAL: enviarPedidoWhatsApp
   Recebe os dados do carrinho e envia para o WhatsApp
   Uso: enviarPedidoWhatsApp(carrinho, total, nomeCliente, localEntrega)
   =========================================== */
function enviarPedidoWhatsApp(carrinho, total, nomeCliente, localEntrega) {
    
    // ===========================================
    // PASSO 1: Validar dados obrigatórios
    // ===========================================
    if (!carrinho || carrinho.length === 0) {
        alert('❌ Erro: Carrinho vazio');
        return;
    }
    
    if (!nomeCliente || !localEntrega) {
        alert('❌ Por favor, preencha seu nome e local de entrega');
        return;
    }
    
    // ===========================================
    // PASSO 2: Construir mensagem formatada
    // ===========================================
    
    // Cabeçalho
    let mensagem = `🧾 *COMPRAFÁCIL - PEDIDO* 🧾\n`;
    mensagem += `📅 Feira 13 Março 2026\n`;
    mensagem += `═══════════════════════\n\n`;
    
    // Dados do cliente
    mensagem += `👤 *Cliente:* ${nomeCliente}\n`;
    mensagem += `📍 *Local:* ${localEntrega}\n\n`;
    
    // Itens do pedido
    mensagem += `🛒 *ITENS DO PEDIDO:*\n`;
    mensagem += `────────────────────\n`;
    
    // Agrupa itens por bancada (se houver mais de uma)
    const itensPorBancada = {};
    carrinho.forEach(item => {
        if (!itensPorBancada[item.bancada]) {
            itensPorBancada[item.bancada] = [];
        }
        itensPorBancada[item.bancada].push(item);
    });
    
    // Lista itens organizados por bancada
    for (let bancada in itensPorBancada) {
        mensagem += `\n🏪 *${bancada}:*\n`;
        itensPorBancada[bancada].forEach(item => {
            mensagem += `   ${item.quantidade}x ${item.nome} - ${item.preco * item.quantidade} Kz\n`;
        });
    }
    
    mensagem += `\n────────────────────\n`;
    
    // Total
    mensagem += `💰 *TOTAL:* ${total} Kz\n\n`;
    
    // Rodapé
    mensagem += `═══════════════════════\n`;
    mensagem += `💵 *Pagamento:* No momento da entrega\n`;
    mensagem += `⏱️ *Tempo estimado:* 15-20 min\n`;
    mensagem += `═══════════════════════\n`;
    mensagem += `Obrigado pela preferência! 🎉\n`;
    mensagem += `_TI12BD STARTUP_ 🚀`;
    
    // ===========================================
    // PASSO 3: Codificar mensagem para URL
    // ===========================================
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // ===========================================
    // PASSO 4: Criar link do WhatsApp
    // ===========================================
    const linkWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
    
    // ===========================================
    // PASSO 5: Abrir WhatsApp
    // ===========================================
    window.open(linkWhatsApp, '_blank');
    
    // ===========================================
    // PASSO 6: Feedback visual (opcional)
    // ===========================================
    console.log('✅ Pedido enviado com sucesso!');
    
    // Fecha o carrinho após enviar
    const overlay = document.getElementById('carrinho-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

/* ===========================================
   FUNÇÃO: abrirWhatsAppVendedor
   Para a seção "É vendedor?" - cadastro de bancadas
   =========================================== */
function abrirWhatsAppVendedor() {
    const mensagem = `Olá! Gostaria de cadastrar minha bancada na CompraFácil para a feira do dia 13 de março de 2026. Poderia me passar mais informações sobre as taxas e como funciona?`;
    
    const mensagemCodificada = encodeURIComponent(mensagem);
    const linkWhatsApp = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;
    
    window.open(linkWhatsApp, '_blank');
}

/* ===========================================
   FUNÇÃO: compartilharPedido (opcional)
   Para o cliente compartilhar o pedido com alguém
   =========================================== */
function compartilharPedido(carrinho, total) {
    let mensagem = `Meu pedido na CompraFácil:\n\n`;
    
    carrinho.forEach(item => {
        mensagem += `${item.quantidade}x ${item.nome}\n`;
    });
    
    mensagem += `\nTotal: ${total} Kz`;
    
    if (navigator.share) {
        // Se o navegador suportar Web Share API
        navigator.share({
            title: 'Meu pedido CompraFácil',
            text: mensagem,
        }).catch(console.error);
    } else {
        // Fallback: copiar para área de transferência
        navigator.clipboard.writeText(mensagem).then(() => {
            alert('📋 Pedido copiado para área de transferência!');
        });
    }
}

/* ===========================================
   FUNÇÃO: formatarNumeroWhatsApp
   Garante que o número esteja no formato correto
   =========================================== */
function formatarNumeroWhatsApp(numero) {
    // Remove tudo que não for número
    let numeroLimpo = numero.replace(/\D/g, '');
    
    // Se não tiver código do país (244), adiciona
    if (!numeroLimpo.startsWith('244')) {
        numeroLimpo = '244' + numeroLimpo;
    }
    
    return numeroLimpo;
}

// ===========================================
// EXPORTAÇÃO DAS FUNÇÕES (para uso global)
// ===========================================

// Torna as funções disponíveis globalmente
window.enviarPedidoWhatsApp = enviarPedidoWhatsApp;
window.abrirWhatsAppVendedor = abrirWhatsAppVendedor;
window.compartilharPedido = compartilharPedido;

/* ===========================================
   EXEMPLO DE MENSAGEM FINAL:
   
   🧾 COMPRAFÁCIL - PEDIDO 🧾
   📅 Feira 13 Março 2026
   ═══════════════════════
   
   👤 Cliente: João Silva
   📍 Local: Sala de jogos
   
   🛒 ITENS DO PEDIDO:
   ────────────────────
   
   🏪 TI12BD:
      2x Hambúrguer Artesanal - 1600 Kz
      1x Sumo Natural - 300 Kz
   
   ────────────────────
   💰 TOTAL: 1900 Kz
   
   ═══════════════════════
   💵 Pagamento: No momento da entrega
   ⏱️ Tempo estimado: 10-15 min
   ═══════════════════════
   Obrigado pela preferência! 🎉
   TI12BD STARTUP 🚀
   =========================================== */