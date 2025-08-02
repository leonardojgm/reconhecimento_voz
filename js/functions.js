const engine = {
    "cores": ['blue','green','purple','pink','red','yellow','orange','grey','black'],
    "hexadecimais": {
        "blue": "#0000FF",
        "green": "#02EF00",
        "purple": "#790093",
        "pink": "#FFC0CB",
        "red": "#E90808",
        "yellow": "#E7D703",
        "orange": "#F16529",
        "grey": "#EBEBEB",
        "black": "#141414"
    },
    "moedas": 0
};

const audioMoeda = new Audio('audio/moeda.mp3');
const audioErrou = new Audio('audio/errou.mp3');
const btnGravador = document.getElementById('btn-responder');
const corNaCaixa = document.getElementById('cor-na-caixa');
var transcricaoAudio = '';

function sortearCor() {
    const index = Math.floor(Math.random() * engine.cores.length);
    const nomeCorSorteada = engine.cores[index];

    corNaCaixa.innerText = nomeCorSorteada.toUpperCase();

    return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor) {
    const caixaDasCores = document.getElementById('cor-atual');

    caixaDasCores.style.backgroundColor = nomeDaCor;// '#FFF000';
    caixaDasCores.style.backgroundImage = "url('img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize = "100%";
}

function atualizaPontuacao(valor) {
    const pontuacao = document.getElementById('pontuacao-atual');

    engine.moedas += valor;

    if (valor < 0) {
        audioErrou.play();
    } else {
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

// alert('ola eu sout linkado.');
aplicarCorNaCaixa(sortearCor());

if (window.webkitSpeechRecognition || window.SpeechRecognition) {
    //alert('Seu navegador suporta essa funcionalidade.');
    var speechAPI = window.webkitSpeechRecognition || window.SpeechRecognition;
    var gravador = new speechAPI();
    
    gravador.continuous = false;
    gravador.lang = 'en-US';
    gravador.onstart  = function() {
        btnGravador.innerText = 'Estou Ouvindo';
        btnGravador.style.backgroudColor = '#FFFFFF';
        btnGravador.style.volor = '#000000';
        btnGravador.disabled = true;
    }
    gravador.onend = function() {
        btnGravador.innerText = 'Responder';
        btnGravador.style.backgroudColor = 'transparent';
        btnGravador.style.volor = '#FFFFFF';
        btnGravador.disabled = false;
    }
    gravador.onresult = function(event) {
        // console.log(event);

        transcricaoAudio = event.results[0][0].transcript.toLowerCase();
        respostaCorreta = corNaCaixa.innerText.toLowerCase();

        // console.log(transcricaoAudio);

        if (transcricaoAudio == respostaCorreta) {
            atualizaPontuacao(1);
        } else {
            atualizaPontuacao(-1);''
        }
        
        aplicarCorNaCaixa(sortearCor());
    }
} else {
    alert('Seu navegador não suporta essa funcionalidade.');
}

btnGravador.addEventListener('click', function() {
    gravador.start();
})