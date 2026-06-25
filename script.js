// Gabarito oficial do quiz
const gabarito = { 
    1: 'F', // Questão 1 é Falsa
    2: 'V'  // Questão 2 é Verdadeira
};

// Objeto para registrar as respostas escolhidas pelo usuário
let respostas = {};

/**
 * Avalia a alternativa clicada pelo usuário, estiliza os botões e injeta o feedback explicativo.
 * @param {number} perguntaNum - O ID da pergunta correspondente.
 * @param {string} escolha - A opção selecionada ('V' ou 'F').
 */
function checarResposta(perguntaNum, escolha) {
    respostas[perguntaNum] = escolha;
    
    const item = document.getElementById(`q${perguntaNum}`);
    const feedback = document.getElementById(`feed-${perguntaNum}`);
    const botoes = item.querySelectorAll('.btn');
    
    // Reseta o estado visual de ambos os botões da pergunta para evitar conflitos de cores
    botoes.forEach(b => b.classList.remove('btn-selecionado-certo', 'btn-selecionado-errado'));
    
    // Identifica qual botão foi clicado
    const btnSelecionado = escolha === 'V' ? botoes[0] : botoes[1];
    
    // Validação comparativa com o gabarito estruturado
    if (escolha === gabarito[perguntaNum]) {
        feedback.textContent = "✓ Correto! A afirmação condiz perfeitamente com a realidade técnica discutida.";
        feedback.className = "feedback feedback-certo";
        btnSelecionado.classList.add('btn-selecionado-certo');
    } else {
        feedback.textContent = "× Incorreto. Analise os conceitos estruturais apresentados nos textos acima.";
        feedback.className = "feedback feedback-errado";
        btnSelecionado.classList.add('btn-selecionado-errado');
    }
    
    // Dispara o verificador do painel de resultados
    verificarPontuacao();
}

/**
 * Avalia se todas as perguntas foram respondidas e calcula o placar final.
 */
function verificarPontuacao() {
    const totalPerguntas = Object.keys(gabarito).length;
    
    if (Object.keys(respostas).length === totalPerguntas) {
        let totalAcertos = 0;
        if (respostas[1] === gabarito[1]) totalAcertos++;
        if (respostas[2] === gabarito[2]) totalAcertos++;
        
        document.getElementById('placar-texto').textContent = `Você acertou ${totalAcertos} de ${totalPerguntas} questões!`;
        document.getElementById('placar-final').className = "placar-visivel";
    }
}

/**
 * Reseta o estado da memória e os elementos HTML do quiz para uma nova tentativa.
 */
function resetarQuiz() {
    respostas = {};
    document.getElementById('placar-final').className = "placar-oculto";
    
    for (let i = 1; i <= 2; i++) {
        const feedback = document.getElementById(`feed-${i}`);
        feedback.textContent = "";
        feedback.className = "feedback";
        
        const item = document.getElementById(`q${i}`);
        item.querySelectorAll('.btn').forEach(b => b.classList.remove('btn-selecionado-certo', 'btn-selecionado-errado'));
    }
}
