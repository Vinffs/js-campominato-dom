
mineSweeper();
function mineSweeper() {

  //buttons
  const btn = document.getElementById('startGame');
  const choose = document.getElementById('chooseDif');
  const menuBtn = document.getElementById('backMenu');

  // containers
  const playground = document.querySelector('.playground');
  const offCanvas = document.getElementById("offCanvas");
  const alert = document.querySelector('.alert');
  const points = document.getElementById('counter');
  const result = document.getElementById('message');

  // variables
  let numCells, checkedOption, maxScore, squareContainer;

  //  number of bombs and new set 
  const bombs = 16;
  let bombPlacement = new Set(); // shall turn into an array in bombGenerator Function
  // convert set to array
  let bombPlacementArray; // = bombPlacement set into an array

  let counter = 0;
  let gameOver;



  // Click function to select game difficulty
  choose.addEventListener('click', function () {
    offCanvas.style.width = '400px';
    choose.classList.add('d-none');
  })

  // Click function to start the game once chosen the difficulty
  btn.addEventListener('click', function () {
    gameOver = false;
    offCanvas.style.width = '0px';
    menuBtn.classList.remove('d-none');
    alert.innerHTML = '';

    //Function that verifies which option is checked
    checkedOption = document.querySelector('input[type=radio]:checked');
    if (checkedOption !== null) {
      numCells = checkedOption.value;
      maxScore = numCells - bombs;
      console.log(maxScore);
      bombGenerator(numCells);
      // points(numCells, bombs);
    }
    else {
      alert.innerHTML = `You must choose a difficulty.`;
      offCanvas.style.width = '400px';
      menuBtn.classList.add('d-none');
    }
    // Loop that goes through the mode value and gives the number of squares + text
    for (let i = 0; i < numCells; i++) {
      let squareNum = squareGenerator(i);
      playground.append(squareNum);
    }
  })

  // Function that creates the squares (from loop above)
  function squareGenerator(index) {
    const squareBox = document.createElement('div');
    squareContentDimension(squareBox);
    // On Click, the square changes it's classes (add bg & text color, etc..)
    squareBox.addEventListener('click', function clickBox() {
      // attributes different bgColor if bomb or safe slot
      if (!gameOver) {
        if (bombPlacementArray.includes(parseInt(this.innerHTML))) {
          squareBox.classList.add('bg-danger');
          squareBox.classList.add('text-black');
          squareBox.classList.remove('text-white');
          squareBox.innerHTML = `<i class="fa-solid fa-bomb fa-beat"></i>`;
          document.querySelector('audio').play();
          gameOver = true;
          gameStatus(squareBox);

        } else {
          squareBox.classList.add('bg-info');
          counter++;
          points.classList.remove('d-none');
          points.innerHTML = `<h4>Punteggio: ${counter}</h4>`;
          squareBox.classList.add('text-black');
          squareBox.classList.remove('text-white');
          squareBox.removeEventListener('click', clickBox);
          console.log(parseInt(this.innerHTML));
          if (maxScore === counter) {
            gameStatus(squareBox);
          }
        }
      } else {
        squareBox.removeEventListener('click', clickBox);
      }

    })

    // function that generates square's width / height + other classes
    function squareContentDimension(squareBox) {
      squareBox.style.width = squareBox.style.height = `calc(100% / ${Math.sqrt(numCells)}`;
      squareBox.classList.add('square', 'text-white');
      squareBox.classList.remove('d-none');
      squareBox.innerHTML = index + 1;
    }



    // On click, reset user's input
    menuBtn.addEventListener('click', function () {
      btn.classList.remove('d-none');
      menuBtn.classList.add('d-none');
      result.classList.add('d-none');
      points.classList.add('d-none');
      offCanvas.style.width = '400px';
      checkedOption.checked = false;
      bombPlacement = new Set();
      counter = 0;

      while (playground.firstChild) {
        playground.removeChild(playground.firstChild);
      }
    })


    return squareBox;
  }

  // function that generates an array of random 16 numbers a.k.a. bombs
  function bombGenerator(numCells) {
    while (bombPlacement.size < bombs) {
      const randomNum = getRndInteger(1, numCells);
      bombPlacement.add(randomNum);
    }
    bombPlacementArray = Array.from(bombPlacement);
    console.log(bombPlacementArray);
  }

  // function that defines max score
  function gameStatus(squareBox) {
    squareContainer = playground.childNodes;
    console.log(squareContainer);
    for (let i = 0; i < squareContainer.length; i++) {
      if (bombPlacementArray.includes(i + 1)) {
        squareContainer[i].classList.add('bg-danger');
        squareContainer[i].classList.add('text-black');
        squareContainer[i].classList.remove('text-white');
        squareContainer[i].innerHTML = `<i class="fa-solid fa-bomb fa-beat"></i>`;
      }
    }
    if (gameOver && counter < maxScore) {
      squareBox.classList.add('bg-danger');
      squareBox.classList.add('text-black');
      squareBox.classList.remove('text-white');
      squareBox.innerHTML = `<i class="fa-solid fa-bomb fa-beat"></i>`;
      result.classList.remove('d-none');
      result.innerHTML = `<h3>Hai perso!</h3>`;
    } else {
      result.classList.remove('d-none');
      result.innerHTML = `<h3>Hai Vinto!</h3>`;
    }
  }

}
