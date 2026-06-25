// Gabarito oficial do sistema
const gabarito = {
    1: 'F', // IA não possui sentimentos/empatia nativos.
    2: 'V'  // Human-in-the-loop defende controle humano final.
};

// Armazena as interações feitas pelo usuário
let respostasUsuario = {};

/**
 * Avalia a resposta enviada pelo usuário, estiliza botões e exibe o feedback detalhado.
 */
function verificarResposta(numeroQuestao, escolha) {
    respostasUsuario[numeroQuestao] = escolha;

    const feedbackElement = document.getElementById(`feedback-${numeroQuestao}`);
    const cardQuestao = feedbackElement.closest('.quiz-item');
    const botoes = cardQuestao.querySelectorAll('.btn');
    
    // Reseta o estado visual anterior dos botões da respectiva questão
    botoes.forEach(btn => {
        btn.classList.remove('btn-selecionado-certo', 'btn-selecionado-errado');
    });

    // Identifica o elemento do botão clicado
    const botaoClicado = escolha === 'V' ? cardQuestao.querySelector('.btn-true') : cardQuestao.querySelector('.btn-false');

    // Validação lógica contra o gabarito
    if (escolha === gabarito[numeroQuestao]) {
        feedbackElement.textContent = "✓ Resposta Correta! " + (numeroQuestao === 1 
            ? "A IA opera estritamente através de correlações matemáticas. Ela simula padrões inteligentes, mas não desenvolve senciência, sentimentos ou empatia real." 
            : "Excelente! Manter humanos na tomada de decisões finais (Human-in-the-loop) mitiga falhas graves causadas por 'alucinações' estatísticas dos computadores.");
        feedbackElement.className = "feedback feedback-certo";
        botaoClicado.classList.add('btn-selecionado-certo');
    } else {
        feedbackElement.textContent = "× Resposta Incorreta. " + (numeroQuestao === 1 
            ? "Lembre-se: por mais avançado que um modelo de linguagem ou robô seja, ele não possui sentimentos ou autoconsciência." 
            : "Atenção: sem o controle humano, sistemas autônomos tomariam decisões críticas sem nenhum tipo de discernimento moral ou ético.");
        feedbackElement.className = "feedback feedback-errado";
        botaoClicado.classList.add('btn-selecionado-errado');
    }

    // Processa a contagem e renderização do placar final
    atualizarPlacar();
}

/**
 * Verifica se o quiz foi concluído e calcula a nota total do usuário
 */
function atualizarPlacar() {
    const totalPerguntas = Object.keys(gabarito).length;
    const respondidas = Object.keys(respostasUsuario).length;
    
    if (respondidas === totalPerguntas) {
        let acertos = 0;
        for (let i in gabarito) {
            if (respostasUsuario[i] === gabarito[i]) {
                acertos++;
            }
        }
        
        const placarContainer = document.getElementById('placar-final');
        const placarTexto = document.getElementById('placar-texto');
        
        placarTexto.textContent = `Você acertou ${acertos} de ${totalPerguntas} afirmações baseadas no texto!`;
        placarContainer.className = "placar-visivel";
    }
}

/**
 * Reseta os dados e a interface visual para reiniciar o jogo
 */
function reiniciarQuiz() {
    respostasUsuario = {};
    document.getElementById('placar-final').className = "placar-oculto";
    
    for (let i in gabarito) {
        const feedback = document.getElementById(`feedback-${i}`);
        feedback.textContent = "";
        feedback.className = "feedback";
        
        const cardQuestao = feedback.closest('.quiz-item');
        const botoes = cardQuestao.querySelectorAll('.btn');
        botoes.forEach(btn => {
            btn.classList.remove('btn-selecionado-certo', 'btn-selecionado-errado');
        });
    }
}
