const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const message = document.getElementById('message');
const timeLeftDisplay = document.getElementById('time-left');
let score = 0;
let timer = 10;
let countdown; // Variable para el temporizador
const btn = document.getElementById('welcomeButton')
// Obtener todos los botones de compra
const buyButtons = document.querySelectorAll('.buy-button');
const  coinDisplayy = document.getElementById('coins');



 





// Manejar la compra cuando se hace clic en un botón
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseInt(button.getAttribute('data-price'));
        const itemIndex = button.getAttribute('data-name');


        if (coins >= price) {
            // El usuario tiene suficientes monedas para comprar el objeto
            coins -= price;
            coinDisplayy.textContent = coins;

            // Realizar las acciones necesarias al comprar el objeto
            // Por ejemplo, aquí puedes aplicar efectos o funcionalidad adicional al objeto comprado.
            alert(`¡Has comprado el objeto ${itemIndex}!`);

            // Puedes agregar más lógica aquí, como aplicar cambios al objeto comprado.
        } else {
            // El usuario no tiene suficientes monedas
            alert('No tienes suficientes monedas para comprar este objeto.');
        }
    });
});



// Inicializar el contador de monedas y el nivel
let coins = 1000;
let level = 1;
const coinDisplay = document.getElementById('coins'); // Elemento para mostrar las monedas

let fakeTarget = document.createElement('div'); // Elemento para el objetivo falso
fakeTarget.id = 'fake-target';
document.getElementById('game-container').appendChild(fakeTarget);

let fakeTargett = document.createElement('div'); // Elemento para el objetivo falso
fakeTargett.id = 'fake-targett';
document.getElementById('game-container').appendChild(fakeTargett);

target.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    if (score % 15 === 0) {
        level++;
        levelDisplay.textContent = level;
        increaseDifficulty();
        resetTimer();
        gainCoins(); // Llamar a la función para ganar monedas al subir de nivel
    }
    
    if (level >= 3 ) {
        // Mostrar el objetivo falso cuando se llega al nivel 3
        fakeTarget.style.display = 'block';
        moveFakeTarget();
       
    }

    if(level >= 5){
        fakeTargett.style.display = 'block';
        moveFakeTargett();
     }

    
    moveTarget();
});


fakeTarget.addEventListener('click', () => {
    // El jugador hace clic en el objetivo falso (pierde)
    message.textContent = '¡Perdiste!';
    setTimeout(() => {
        message.textContent = '';
        score = 0;
        scoreDisplay.textContent = score;
        timer = 10;
        timeLeftDisplay.textContent = timer;
        level = 1; // Reiniciar el nivel a 1
        levelDisplay.textContent = level;
        coins = 0; // Reiniciar las monedas
        coinDisplay.textContent = coins;
        moveTarget();
        fakeTarget.style.display = 'none'; // Ocultar el objetivo falso
        resetTimer();
    }, 2000);
});

fakeTargett.addEventListener('click', () => {
    // El jugador hace clic en el objetivo falso (pierde)
    message.textContent = '¡Perdiste!';
    setTimeout(() => {
        message.textContent = '';
        score = 0;
        scoreDisplay.textContent = score;
        timer = 10;
        timeLeftDisplay.textContent = timer;
        level = 1; // Reiniciar el nivel a 1
        levelDisplay.textContent = level;
        coins = 0; // Reiniciar las monedas
        coinDisplay.textContent = coins;
        moveTarget();
        fakeTargett.style.display = 'none'; // Ocultar el objetivo falso
        resetTimer();
    }, 2000);
});


function moveTarget() {
    const maxX = document.getElementById('game-container').offsetWidth - target.offsetWidth;
    const maxY = document.getElementById('game-container').offsetHeight - target.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    target.style.left = newX + 'px';
    target.style.top = newY + 'px';
}

function moveFakeTarget() {
    const maxX = document.getElementById('game-container').offsetWidth - fakeTarget.offsetWidth;
    const maxY = document.getElementById('game-container').offsetHeight - fakeTarget.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    fakeTarget.style.left = newX + 'px';
    fakeTarget.style.top = newY + 'px';
}

function moveFakeTargett() {
    const maxX = document.getElementById('game-container').offsetWidth - fakeTargett.offsetWidth;
    const maxY = document.getElementById('game-container').offsetHeight - fakeTargett.offsetHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    fakeTargett.style.left = newX + 'px';
    fakeTargett.style.top = newY + 'px';
}

function increaseDifficulty() {
    // Aumentar la dificultad como prefieras
    timer -= 2; // Reducir el tiempo en 2 segundos
}

function resetTimer() {
    clearInterval(countdown);
    timer = 20;
    timeLeftDisplay.textContent = timer;
    countdown = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timer--;
    timeLeftDisplay.textContent = timer;
    if (timer <= 0) {
        message.textContent = '¡Perdiste!';
        setTimeout(() => {
            message.textContent = '';
            score = 0;
            scoreDisplay.textContent = score;
            timer = 10;
            timeLeftDisplay.textContent = timer;
            level = 1; // Reiniciar el nivel a 1
            levelDisplay.textContent = level;
           
            moveTarget();
            fakeTarget.style.display = 'none'; // Ocultar el objetivo falso
            resetTimer();
        }, 2000);
    }
}

function gainCoins() {
    coins += 2; // Ganar 2 monedas al subir de nivel
    coinDisplay.textContent = coins;
}

resetTimer(); // Iniciar el temporizador al principio
moveTarget();

const specialItems = [
    { name: 'Objeto 1', price: 10, effect: 'Efecto 1' },
    { name: 'Objeto 2', price: 20, effect: 'Efecto 2' },
    { name: 'Objeto 3', price: 30, effect: 'Efecto 3' },

    // Agrega más objetos especiales según desees
];

function updateSpecialItems() {
    const specialItemsList = document.getElementById('special-items');
    specialItemsList.innerHTML = ''; // Limpiar la lista antes de volver a mostrar los objetos

    specialItems.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - Precio: ${item.price} monedas`;
        listItem.setAttribute('data-index', index);
        listItem.addEventListener('click', buySpecialItem);
        specialItemsList.appendChild(listItem);
    });
}

function buySpecialItem(event) {
    const itemIndex = event.target.getAttribute('data-index');
    const item = specialItems[itemIndex];

    if (coins >= item.price) {
        // El jugador tiene suficientes monedas para comprar el objeto
        coins -= item.price; // Restar el precio del objeto al total de monedas
        coinDisplay.textContent = coins; // Actualizar la visualización de monedas
        // Aplicar el efecto especial aquí (puedes definir tu propia lógica)
        console.log(`¡Compraste ${item.name} y obtuviste el efecto especial: ${item.effect}`);
    }
}


// Variable para realizar un seguimiento de los objetos comprados
const ownedItems = [];

// Manejar la compra cuando se hace clic en un botón
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseInt(button.getAttribute('data-price'));
        const itemIndex = parseInt(button.getAttribute('data-index'));

        if (coins >= price) {
            // El usuario tiene suficientes monedas para comprar el objeto
            coins -= price;
            coinDisplay.textContent = coins;

            // Realizar las acciones necesarias al comprar el objeto
            // Por ejemplo, aquí puedes aplicar efectos o funcionalidad adicional al objeto comprado.
            

            // Agregar el objeto comprado a la lista de objetos comprados
            ownedItems.push(itemIndex);
            updateOwnedItemsList(); // Actualizar la lista de objetos comprados
        } else {
            // El usuario no tiene suficientes monedas
            alert('No tienes suficientes monedas para comprar este objeto.');
        }
    });
});


function updateOwnedItemsList() {
    const ownedItemsList = document.getElementById('owned-items-list');
    ownedItemsList.innerHTML = '';

    ownedItems.forEach(itemIndex => {
        const listItem = document.createElement('li');
        listItem.textContent = `Objeto ${itemIndex + 1}`;
        ownedItemsList.appendChild(listItem);
    });
}


function updateOwnedItemsList() {
    const ownedItemsList = document.getElementById('owned-items-list');
    ownedItemsList.innerHTML = ''; // Limpiar la lista de objetos comprados

    ownedItems.forEach((itemIndex) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('owned-item');
        const itemIcon = document.createElement('div');
        itemIcon.classList.add('item-icon', `item-${itemIndex + 1}`, 'owned');
        itemDiv.appendChild(itemIcon);
        ownedItemsList.appendChild(itemDiv);
    });
}


 
 

// Agrega un evento de clic a la target actual
target.addEventListener('click', () => {
    // Mostrar una lista de objetos comprados disponibles
    displayOwnedItems();

    // Cuando el jugador selecciona un objeto, reemplazar la apariencia de la target
    ownedItemsList.addEventListener('click', (event) => {
        const selectedObject = event.target;
        if (selectedObject.classList.contains('item-icon')) {
            // Cambia la apariencia de la target por la del objeto seleccionado
            target.className = selectedObject.className + ' owned';
        }
        // Oculta la lista de objetos comprados
        ownedItemsList.style.display = 'none';
    });
});

function displayOwnedItems() {
    // Muestra la lista de objetos comprados disponibles
    ownedItemsList.style.display = 'block';
}


// Agrega un evento de clic a la target actual
// Agrega un evento de clic a la target actual
 
 

    // Cuando el jugador selecciona un objeto, cambia el color de fondo de la target
   
const ownedItemsList = document.getElementById('owned-items-list');

// Agrega un evento de clic a la target actual
target.addEventListener('click', () => {
    // Mostrar una lista de objetos comprados disponibles
    displayOwnedItems();

    // Cuando el jugador selecciona un objeto, cambia el color de fondo de la target
    ownedItemsList.addEventListener('click', (event) => {
        const selectedObject = event.target;
        if (selectedObject.classList.contains('item-icon')) {
            // Obtén el color del objeto seleccionado
            const selectedColor = window.getComputedStyle(selectedObject).backgroundColor;

            // Cambia el color de fondo de la target
            target.style.backgroundColor = selectedColor;
        }
        // Oculta la lista de objetos comprados
        ownedItemsList.style.display = 'none';
    });
});

function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0; // Reinicia el sonido si ya está en reproducción
        sound.play();
    }
}

target.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    playSound('targetClickSound'); // Reproduce el sonido al hacer clic en el objetivo
    // Resto de tu lógica del juego
});

function playSound(soundId) {
    const audio = document.getElementById(soundId);
    if (audio) {
        audio.currentTime = 0; // Reinicia el sonido si ya está en reproducción
        audio.play();
    }
}
const backgroundMusic = document.getElementById('backgroundMusic');
const welcomeButton = document.getElementById('welcomeButton');

// Mostrar la alerta de bienvenida
 
 
 
// Mostrar un mensaje de bienvenida con SweetAlert2
Swal.fire({
    title: '¡Bienvenido!',
    text: 'Presiona OK para comenzar el juego.',
    icon: 'info',
    confirmButtonText: 'OK'
}).then((result) => {
    if (result.isConfirmed) {
        // Reproducir música de fondo después de hacer clic en OK
        backgroundMusic.play();
    }
});

// // Resto de tu código...

function increaseDifficulty() {
    // Aumentar la dificultad como prefieras
    timer -= 2; // Reducir el tiempo en 2 segundos

    // Reproducir un sonido de felicitaciones
    playSound('levelUpSound');

    // Mostrar mensaje de felicitaciones al subir de nivel
    Swal.fire({
        title: '¡Felicidades!',
        text: `Has subido al nivel ${level} 🚀`,
        icon: 'success',
        confirmButtonText: 'OK'
    });
}

 
function handleLoss(isTimeOut) {
    playSound('loseSound'); // Reproduce el sonido de perder

    let lossMessage;
    if (isTimeOut) {
        lossMessage = '¡Se acabó el tiempo!';
    } else {
        lossMessage = '¡Tocaste el objetivo falso!';
    }

    // Muestra un mensaje con SweetAlert2
    Swal.fire({
        title: lossMessage,
        html: isTimeOut
            ? `Llegaste al nivel ${level}, ganaste ${coins} monedas.<br>¡Sigue intentándolo!`
            : `Perdiste todas tus monedas en el nivel ${level}.<br>¡Inténtalo de nuevo!`,
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false, // Evita que el usuario cierre el mensaje haciendo clic fuera de él
    });

    // Resto del código para reiniciar el juego
    message.textContent = '';
    score = 0;
    scoreDisplay.textContent = score;
    timer = 10;
    timeLeftDisplay.textContent = timer;
    level = 1; // Reiniciar el nivel a 1
    levelDisplay.textContent = level;
    coins = 0; // Reiniciar las monedas
    coinDisplay.textContent = coins;
    moveTarget();
    fakeTarget.style.display = 'none'; // Ocultar el objetivo falso
    resetTimer();
}

// En la función updateTimer, cuando se agota el tiempo, llama a handleLoss con isTimeOut=true
function updateTimer() {
    timer--;
    timeLeftDisplay.textContent = timer;
    if (timer <= 0) {
        handleLoss(true); // Llamar a la función para manejar la pérdida por tiempo
    }
}
// ...

fakeTarget.addEventListener('click', () => {
    // El jugador hace clic en el objetivo falso (pierde)
    handleLoss(false); // Llamar a la función para manejar la pérdida por tocar el objetivo falso
});

// ...

document.addEventListener('DOMContentLoaded', () => {
    // ... (código existente)
  
    // Función para comprar objetos especiales
    function buySpecialItem(event) {
      const itemIndex = event.target.getAttribute('data-index');
      const item = specialItems[itemIndex];
  
      if (coins >= item.price) {
        coins -= item.price;
        coinDisplay.textContent = coins;
        console.log(`¡Compraste ${item.name} y obtuviste el efecto especial: ${item.effect}`);
        playSound('purchaseSound');
      } else {
        alert('No tienes suficientes monedas para comprar este objeto.');
      }
    }
  
    // Asignar evento de clic a los botones de compra
    buyButtons.forEach(button => {
      button.addEventListener('click', buySpecialItem);
    });
  
    // Resto del código...
  });
  document.addEventListener('DOMContentLoaded', () => {
    // ... (código existente)

    const pauseButton = document.getElementById('pauseButton');
    let isPaused = false;

    pauseButton.addEventListener('click', () => {
        if (isPaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    });

    function pauseGame() {
        isPaused = true;
        clearInterval(countdown);
        adjustVolume(backgroundMusic, 0.1); // Ajusta el volumen al 20%
        playSound('pauseSound');
        Swal.fire({
            title: 'Juego en pausa',
            icon: 'info',
            confirmButtonText: 'Continuar'
        });
    }

    function resumeGame() {
        isPaused = false;
        resetTimer();
        adjustVolume(backgroundMusic, 1.0); // Restaura el volumen al 100%
        playSound('resumeSound');
    }

    function adjustVolume(audioElement, volumeLevel) {
        audioElement.volume = volumeLevel;
    }

    // ... (código existente)

    // ... (resto del código)
});
function handleLoss(isTimeOut) {
    playSound('loseSound'); // Reproduce el sonido de perder

    let lossMessage;
    if (isTimeOut) {
        lossMessage = `Se acabó el tiempo. Ganaste ${coins} monedas en el nivel ${level}. ¡Sigue intentándolo!`;
    } else {
        lossMessage = `Tocaste el objetivo falso. Ganaste ${coins} monedas en el nivel ${level}. ¡Inténtalo de nuevo!`;
    }

    // Muestra un mensaje con SweetAlert2
    Swal.fire({
        title: lossMessage,
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false, // Evita que el usuario cierre el mensaje haciendo clic fuera de él
    });

    // Resto del código para reiniciar el juego
    message.textContent = '';
    score = 0;
    scoreDisplay.textContent = score;
    timer = 10;
    timeLeftDisplay.textContent = timer;
    level = 1; // Reiniciar el nivel a 1
    levelDisplay.textContent = level;
    moveTarget();
    fakeTarget.style.display = 'none'; // Ocultar el objetivo falso
    resetTimer();
}
function resetTimer() {
    clearInterval(countdown);
    timer = 20;
    timeLeftDisplay.textContent = timer;
    countdown = setInterval(updateTimer, 1000);
}

