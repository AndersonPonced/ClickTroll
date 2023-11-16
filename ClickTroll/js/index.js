function playSound(soundId, volume = 0.5) {
    const audio = document.getElementById(soundId);
    if (audio) {
        audio.currentTime = 0; // Reinicia el sonido si ya está en reproducción
        audio.volume = volume; // Establece el volumen
        audio.play();
    }
}

// Agrega eventos de mouseover a los botones del menú y del juego
const menuButtons = document.querySelectorAll('#menu button, button');
menuButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
        playSound('hoverSound', 0.5); // Ajusta el volumen según sea necesario
    });

    button.addEventListener('click', () => {
        playSound('clickSound', 0.5); // Ajusta el volumen según sea necesario
    });
});
