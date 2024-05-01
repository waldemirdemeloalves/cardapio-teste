const backgrounds = [
    'url("../assets/BG/1.png")',
    'url("./assets/BG/2.png")',
    'url("./assets/BG/3.png")',
    // Adicione mais URLs conforme necessário
];

let currentBackgroundIndex = 0;
const header = document.querySelector('header');

function updateBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
    header.style.backgroundImage = backgrounds[currentBackgroundIndex];
}

// Inicia a atualização do fundo e define o intervalo
updateBackground();
setInterval(updateBackground, 5000);