// ===========================================
// ARQUIVO: main.js
// ANIMAÇÕES E EFEITOS GLOBAIS
// ===========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================================
    // ANIMAÇÃO DE SCROLL (REVELAR ELEMENTOS)
    // ===========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elementos para animar
    document.querySelectorAll('.bancada-card, .produto-card, .step-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Classe para revelar
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .reveal {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // ===========================================
    // EFEITO DE HOVER NO CARD
    // ===========================================
    document.querySelectorAll('.bancada-card, .produto-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===========================================
    // ANIMAÇÃO DO CARRINHO QUANDO ADICIONA
    // ===========================================
    const carrinhoIcone = document.getElementById('carrinho-icone');
    if (carrinhoIcone) {
        // Observer para quando o contador mudar
        const contador = document.getElementById('contador-carrinho');
        if (contador) {
            const observerContador = new MutationObserver(() => {
                carrinhoIcone.classList.add('pulse');
                setTimeout(() => {
                    carrinhoIcone.classList.remove('pulse');
                }, 300);
            });
            
            observerContador.observe(contador, { 
                childList: true, 
                characterData: true,
                subtree: true 
            });
        }
    }

    // ===========================================
    // ANIMAÇÃO DO BOTÃO VOLTAR
    // ===========================================
    const voltarLink = document.querySelector('.voltar-link');
    if (voltarLink) {
        voltarLink.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'translateX(-5px)';
        });
        
        voltarLink.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'translateX(0)';
        });
    }

    // ===========================================
    // LOADING SIMULADO (OPCIONAL)
    // ===========================================
    window.addEventListener('load', function() {
        document.body.classList.add('carregado');
    });

    // ===========================================
    // EFEITO DE DIGITAÇÃO NO HERO (OPCIONAL)
    // ===========================================
    const heroTitle = document.querySelector('.hero-content h2 .highlight');
    if (heroTitle) {
        heroTitle.style.position = 'relative';
        heroTitle.style.display = 'inline-block';
        
        // Adiciona cursor piscante
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.color = 'var(--verde-principal)';
        cursor.style.animation = 'piscar 1s infinite';
        heroTitle.appendChild(cursor);
        
        // Animação do cursor
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                @keyframes piscar {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
            </style>
        `);
    }

    // ===========================================
    // BOTÃO VOLTAR AO TOPO (APÓS SCROLL)
    // ===========================================
    const criarBotaoTopo = () => {
        const btn = document.createElement('button');
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        btn.className = 'btn-topo';
        btn.setAttribute('aria-label', 'Voltar ao topo');
        
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--verde-principal);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: var(--sombra-verde);
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s;
            z-index: 99;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(btn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            } else {
                btn.style.opacity = '0';
                btn.style.transform = 'translateY(20px)';
            }
        });
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-5px)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0)';
        });
    };
    
    // Ativar apenas em telas maiores
    if (window.innerWidth > 768) {
        criarBotaoTopo();
    }

    // ===========================================
    // PREVENIR CLIQUE EM LINKS VAZIOS
    // ===========================================
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // ===========================================
    // ADICIONAR CLASSE ATIVA NO MENU POR SCROLL
    // ===========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ===========================================
// ANIMAÇÃO PARA O BOTÃO WHATSAPP
// ===========================================
document.querySelectorAll('.btn-whatsapp, .btn-whatsapp-grande').forEach(btn => {
    if (btn) {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

// ===========================================
// CORREÇÃO: Verificar se está na página da bancada
// ===========================================
if (window.location.pathname.includes('bancada.html')) {
    // A lógica de carregamento da bancada já está no HTML
    // Este é apenas um marcador
    console.log('📍 Página de bancada carregada');
}