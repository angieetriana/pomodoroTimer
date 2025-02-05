const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Imagem da nuvem
const cloudImage = new Image();
cloudImage.src = "nuvem.png";

// Elementos do DOM
const startElement = document.getElementById("start");
const stopElement = document.getElementById("stop");
const restartElement = document.getElementById("restart");
const timerElement = document.getElementById("timer");

// Variáveis globais
let interval;
let timeLeft = 1500; // Tempo inicial em segundos

// ==================================================
// Seção 1: Timer
// ==================================================

/**
 * Atualiza a exibição do timer no formato MM:SS.
 */
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    timerElement.innerHTML = formattedTime;
}

/**
 * Inicia o timer.
 */
function startTimer() {
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft === 0) {
            clearInterval(interval);
            alert("Time's up!");
            timeLeft = 1500; // Reinicia o tempo
            updateTimer();
        }
    }, 1000);
}

/**
 * Para o timer.
 */
function stopTimer() {
    clearInterval(interval);
}

/**
 * Reinicia o timer.
 */
function restartTimer() {
    clearInterval(interval);
    timeLeft = 1500; // Reinicia o tempo
    updateTimer();
}

// Event listeners para os botões de controle do timer
startElement.addEventListener("click", startTimer);
stopElement.addEventListener("click", stopTimer);
restartElement.addEventListener("click", restartTimer);

// ==================================================
// Seção 2: Animação de Nuvens
// ==================================================

/**
 * Classe que representa uma nuvem.
 */
class Cloud {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.width = 300; // Largura da nuvem
        this.height = 200; // Altura da nuvem
    }

    /**
     * Atualiza a posição da nuvem.
     */
    update() {
        this.x -= this.speed;
        // Reinicia a posição da nuvem quando ela sai da tela
        if (this.x + this.width < 0) {
            this.x = canvas.width;
            this.y = Math.random() * canvas.height * 0.5; // Posição vertical aleatória
        }
    }

    /**
     * Desenha a nuvem no canvas.
     */
    draw() {
        ctx.drawImage(cloudImage, this.x, this.y, this.width, this.height);
    }
}

// Array para armazenar as nuvens
const clouds = [];
for (let i = 0; i < 5; i++) {
    clouds.push(new Cloud(
        Math.random() * canvas.width, // Posição horizontal aleatória
        Math.random() * canvas.height * 0.5, // Posição vertical aleatória
        1 + Math.random() // Velocidade aleatória
    ));
}

/**
 * Função principal de animação.
 */
function animate() {
    // Limpa o canvas com uma cor de fundo
    ctx.fillStyle = "#e8feff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Atualiza e desenha cada nuvem
    clouds.forEach(cloud => {
        cloud.update();
        cloud.draw();
    });

    // Repete a animação
    requestAnimationFrame(animate);
}

// Inicia a animação quando a imagem da nuvem é carregada
cloudImage.onload = () => {
    animate();
};

// Redimensiona o canvas quando a janela é redimensionada
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});