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

  // variables
  let numCells, checkedOption;

  //  number of bombs and new set 
  const bombs = 16;
  let bombPlacement = new Set(); // shall turn into an array in bombGenerator Function
  // convert set to array
  let bombPlacementArray; // = bombPlacement set into an array


  // Click function to select game difficulty
  choose.addEventListener('click', function () {
    offCanvas.style.width = '400px';
    choose.classList.add('d-none');
  })

  // Click function to start the game once chosen the difficulty
  btn.addEventListener('click', function () {
    offCanvas.style.width = '0px';
    menuBtn.classList.remove('d-none');
    alert.innerHTML = '';

    //Function that verifies which option is checked
    checkedOption = document.querySelector('input[type=radio]:checked');
    if (checkedOption !== null) {
      numCells = checkedOption.value;
      bombGenerator(numCells);
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
    squareContentDim(squareBox);
    // On Click, the square changes it's classes (add bg & text color, etc..)
    squareBox.addEventListener('click', function () {
      squareBox.classList.add('text-black');
      squareBox.classList.remove('text-white');
      console.log(parseInt(this.innerHTML));
      // attributes different bgColor if bomb or safe slot
      if (bombPlacementArray.includes(parseInt(this.innerHTML))) {
        squareBox.classList.add('bg-danger');
      } else {
        squareBox.classList.add('bg-info');
      }

    })

    // function that generates square's width / height + other classes
    function squareContentDim(squareBox) {
      squareBox.style.width = squareBox.style.height = `calc(100% / ${Math.sqrt(numCells)}`;
      squareBox.classList.add('square', 'text-white');
      squareBox.classList.remove('d-none');
      squareBox.innerHTML = index + 1;
    }



    // On click, reset user's input
    menuBtn.addEventListener('click', function () {
      btn.classList.remove('d-none');
      menuBtn.classList.add('d-none');
      squareBox.classList.add('d-none');
      offCanvas.style.width = '400px';
      checkedOption.checked = false;
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


}
