const arraySlot = Array.from(document.querySelectorAll('.slot'));
const greendiv = document.querySelector('#greenScore');
let currentGreenScore = Number(greendiv.textContent);
const reddiv = document.querySelector('#redScore');
let currentredScore = Number(reddiv.textContent);
const rematch = document.querySelector('#rematch');
const form = document.querySelector('form');
const easy = document.querySelector('#easy');
const hard = document.querySelector('#hard');

rematch.addEventListener('click', clear);
form.addEventListener('input', clear);
function clear(e) {
  arraySlot.forEach(div => {
    div.dataset.round = false;
    div.dataset.cross = false;
    div.addEventListener('click', handleClick);
    winner = undefined;
  });
}

arraySlot.forEach(slot => {
  slot.addEventListener('click', handleClick);
});

function handleClick(e) {
  if (
    e.currentTarget.dataset.round == 'false' &&
    e.currentTarget.dataset.cross == 'false'
  ) {
    e.currentTarget.dataset.round = 'true';
  } else {
    console.log('its taken');
    return;
  }
  if (winner == 'green') {
    return;
  }
  arraySlot.forEach(slot => {
    slot.removeEventListener('click', handleClick);
  });
  let position;
  if (hard.checked) {
    position = unbeatableAI();
    console.log('hard');
  }
  if (easy.checked) {
    position = mediumAI();
    console.log('easy');
  }

  renderCross(position);
}
function renderCross(number) {
  if (number) {
    arraySlot.forEach(slot => {
      if (Number(slot.dataset.position) == number) {
        slot.dataset.cross = 'true';
      }
    });
  }
}
let roundedCoOrdinates;
let crossedCoOrdinates;
function mediumAI() {
  const roundedArray = Array.from(
    document.querySelectorAll('div[data-round="true"]')
  );
  roundedCoOrdinates = roundedArray.map(div => {
    return Number(div.dataset.position);
  });

  const crossArray = Array.from(
    document.querySelectorAll('div[data-cross="true"]')
  );
  crossedCoOrdinates = crossArray.map(div => {
    return Number(div.dataset.position);
  });

  if (crossedCoOrdinates.length == 0) {
    if (!roundedCoOrdinates.includes(5)) {
      GameOver(roundedCoOrdinates, crossedCoOrdinates, 5);

      return 5;
    } else {
      GameOver(roundedCoOrdinates, crossedCoOrdinates, 1);
      return 1;
    }
  }
  let gameAns;

  if (crossedCoOrdinates.length > 1) {
    gameAns = undefined;
    dataArray.forEach(arr => {
      const matchedArr = arr.filter(number => {
        return crossedCoOrdinates.indexOf(number) != -1;
      });

      if (matchedArr.length == 2) {
        let fillIt = arr.filter(number => {
          return matchedArr.indexOf(number) == -1;
        });
        if (!roundedCoOrdinates.includes(fillIt[0])) {
          gameAns = fillIt[0];
        }

        fillIt = [];
      }
    });
  }

  if (typeof gameAns == 'number') {
    const main1 = GameOver(roundedCoOrdinates, crossedCoOrdinates, gameAns);

    if (winner != 'green') {
      return gameAns;
    }
  }

  let intAns;
  if (roundedCoOrdinates.length > 1) {
    // console.log('running');
    // dataArray.forEach(arr => {
    //   console.log(arr);
    //   console.log(roundedCoOrdinates);
    // });
    intAns = undefined;
    dataArray.forEach(arr => {
      const matchedArr = arr.filter(number => {
        return roundedCoOrdinates.indexOf(number) != -1;
      });

      if (matchedArr.length == 2) {
        let fillIt = arr.filter(number => {
          return matchedArr.indexOf(number) == -1;
        });
        if (!crossedCoOrdinates.includes(fillIt[0])) {
          intAns = fillIt[0];
        }

        fillIt = [];
      }
    });
  }

  if (typeof intAns == 'number') {
    const main = GameOver(roundedCoOrdinates, crossedCoOrdinates, intAns);
    if (winner != 'green') {
      return intAns;
    }
  }
  /*unbeatable*/
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(5) &&
  //   roundedCoOrdinates.includes(9)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 3);
  //   return 3;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(1) &&
  //   !roundedCoOrdinates.includes(9)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 9);
  //   return 9;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(3) &&
  //   !roundedCoOrdinates.includes(7)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 7);
  //   return 7;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(7) &&
  //   !roundedCoOrdinates.includes(3)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 3);
  //   return 3;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(9) &&
  //   !roundedCoOrdinates.includes(1)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 1);
  //   return 1;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(9) &&
  //   roundedCoOrdinates.includes(1)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 2);
  //   return 2;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(3) &&
  //   roundedCoOrdinates.includes(7)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 8);
  //   return 8;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(2) &&
  //   roundedCoOrdinates.includes(8)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 7);
  //   return 7;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(4) &&
  //   roundedCoOrdinates.includes(6)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 7);
  //   return 7;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(4) &&
  //   roundedCoOrdinates.includes(8)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 1);
  //   return 1;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(2) &&
  //   roundedCoOrdinates.includes(4)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 1);
  //   return 1;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(2) &&
  //   roundedCoOrdinates.includes(6)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 3);
  //   return 3;
  // }
  // if (
  //   roundedCoOrdinates.length == 2 &&
  //   roundedCoOrdinates.includes(8) &&
  //   roundedCoOrdinates.includes(6)
  // ) {
  //   GameOver(roundedCoOrdinates, crossedCoOrdinates, 9);
  //   return 9;
  // }

  /*finished unbeatable*/

  let baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  roundedCoOrdinates.forEach(number => {
    const index = baseArray.indexOf(number);
    baseArray.splice(index, 1);
  });
  crossedCoOrdinates.forEach(number => {
    const index = baseArray.indexOf(number);
    baseArray.splice(index, 1);
  });

  const random = Math.floor(Math.random() * baseArray.length);

  // if (winner != 'green') {
  //   crossedCoOrdinates.push(baseArray[random]);
  // }

  if (winner != 'green') {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, baseArray[random]);

    return baseArray[random];
  }
}

function unbeatableAI() {
  const roundedArray = Array.from(
    document.querySelectorAll('div[data-round="true"]')
  );
  roundedCoOrdinates = roundedArray.map(div => {
    return Number(div.dataset.position);
  });

  const crossArray = Array.from(
    document.querySelectorAll('div[data-cross="true"]')
  );
  crossedCoOrdinates = crossArray.map(div => {
    return Number(div.dataset.position);
  });

  if (crossedCoOrdinates.length == 0) {
    if (!roundedCoOrdinates.includes(5)) {
      GameOver(roundedCoOrdinates, crossedCoOrdinates, 5);

      return 5;
    } else {
      GameOver(roundedCoOrdinates, crossedCoOrdinates, 1);
      return 1;
    }
  }
  let gameAns;

  if (crossedCoOrdinates.length > 1) {
    gameAns = undefined;
    dataArray.forEach(arr => {
      const matchedArr = arr.filter(number => {
        return crossedCoOrdinates.indexOf(number) != -1;
      });

      if (matchedArr.length == 2) {
        let fillIt = arr.filter(number => {
          return matchedArr.indexOf(number) == -1;
        });
        if (!roundedCoOrdinates.includes(fillIt[0])) {
          gameAns = fillIt[0];
        }

        fillIt = [];
      }
    });
  }

  if (typeof gameAns == 'number') {
    const main1 = GameOver(roundedCoOrdinates, crossedCoOrdinates, gameAns);

    if (winner != 'green') {
      return gameAns;
    }
  }

  let intAns;
  if (roundedCoOrdinates.length > 1) {
    // console.log('running');
    // dataArray.forEach(arr => {
    //   console.log(arr);
    //   console.log(roundedCoOrdinates);
    // });
    intAns = undefined;
    dataArray.forEach(arr => {
      const matchedArr = arr.filter(number => {
        return roundedCoOrdinates.indexOf(number) != -1;
      });

      if (matchedArr.length == 2) {
        let fillIt = arr.filter(number => {
          return matchedArr.indexOf(number) == -1;
        });
        if (!crossedCoOrdinates.includes(fillIt[0])) {
          intAns = fillIt[0];
        }

        fillIt = [];
      }
    });
  }

  if (typeof intAns == 'number') {
    const main = GameOver(roundedCoOrdinates, crossedCoOrdinates, intAns);
    if (winner != 'green') {
      return intAns;
    }
  }
  /*unbeatable*/
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(5) &&
    roundedCoOrdinates.includes(9)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 3);
    return 3;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(1) &&
    !roundedCoOrdinates.includes(9)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 9);
    return 9;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(3) &&
    !roundedCoOrdinates.includes(7)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 7);
    return 7;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(7) &&
    !roundedCoOrdinates.includes(3)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 3);
    return 3;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(9) &&
    !roundedCoOrdinates.includes(1)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 1);
    return 1;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(9) &&
    roundedCoOrdinates.includes(1)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 2);
    return 2;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(3) &&
    roundedCoOrdinates.includes(7)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 8);
    return 8;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(2) &&
    roundedCoOrdinates.includes(8)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 7);
    return 7;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(4) &&
    roundedCoOrdinates.includes(6)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 7);
    return 7;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(4) &&
    roundedCoOrdinates.includes(8)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 1);
    return 1;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(2) &&
    roundedCoOrdinates.includes(4)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 1);
    return 1;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(2) &&
    roundedCoOrdinates.includes(6)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 3);
    return 3;
  }
  if (
    roundedCoOrdinates.length == 2 &&
    roundedCoOrdinates.includes(8) &&
    roundedCoOrdinates.includes(6)
  ) {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, 9);
    return 9;
  }

  /*finished unbeatable*/

  let baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  roundedCoOrdinates.forEach(number => {
    const index = baseArray.indexOf(number);
    baseArray.splice(index, 1);
  });
  crossedCoOrdinates.forEach(number => {
    const index = baseArray.indexOf(number);
    baseArray.splice(index, 1);
  });

  const random = Math.floor(Math.random() * baseArray.length);

  // if (winner != 'green') {
  //   crossedCoOrdinates.push(baseArray[random]);
  // }

  if (winner != 'green') {
    GameOver(roundedCoOrdinates, crossedCoOrdinates, baseArray[random]);

    return baseArray[random];
  }
}

let dataArray = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [4, 5, 6],
  [7, 8, 9],
];
let winner;
function GameOver(arr1, arr2, number) {
  let result = false;

  dataArray.forEach(arr => {
    if (
      arr1.includes(arr[0]) &&
      arr1.includes(arr[1]) &&
      arr1.includes(arr[2]) &&
      winner != 'green'
    ) {
      // console.log('green wins');

      winner = 'green';

      result = true;
      currentGreenScore++;
      greendiv.textContent = currentGreenScore;
      return;
    }
  });
  if (winner != 'green') {
    arr2.push(number);
    dataArray.forEach(arr => {
      if (
        arr2.includes(arr[0]) &&
        arr2.includes(arr[1]) &&
        arr2.includes(arr[2])
      ) {
        result = true;

        // console.log('red wins');
        currentredScore++;
        reddiv.textContent = currentredScore;
        return;
      }
    });
  }
  // console.log(result);

  if (!result) {
    arraySlot.forEach(slot => {
      slot.addEventListener('click', handleClick);
    });
  }

  return result;
}

// function intAI() {
//   let BaseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//   const roundedArray = Array.from(
//     document.querySelectorAll('div[data-round="true"]')
//   );
//   const roundedCoOrdinates = roundedArray.map(div => {
//     return Number(div.dataset.position);

//   });
//   console.log(roundedCoOrdinates);
//   const crossArray = Array.from(
//     document.querySelectorAll('div[data-cross="true"]')
//   );
//   const crossedCoOrdinates = crossArray.map(div => {
//     return Number(div.dataset.position);
//   });
//   console.log(crossedCoOrdinates);
//   if (roundedCoOrdinates.length == 1) {
//     if (roundedCoOrdinates.includes(5)) {
//       let options = [1, 3, 7, 9];
//       const randomIndex = Math.floor(Math.random() * 4);
//       const position = options[randomIndex];

//       return position;
//     } else {
//       return 5;
//     }
//   } else if (roundedCoOrdinates.length == 2) {
//     console.log(
//       `crossArray ${crossedCoOrdinates} roundArray ${roundedCoOrdinates}`
//     );
//     if (
//       roundedCoOrdinates.includes(1) &&
//       roundedCoOrdinates.includes(2) &&
//       !crossedCoOrdinates.includes(3)
//     ) {
//       return 3;
//     } else if (
//       roundedCoOrdinates.includes(1) &&
//       roundedCoOrdinates.includes(4) &&
//       !crossedCoOrdinates.includes(7)
//     ) {
//       return 7;
//     } else if (
//       roundedCoOrdinates.includes(1) &&
//       roundedCoOrdinates.includes(5) &&
//       !crossedCoOrdinates.includes(9)
//     ) {
//       return 9;
//     } else if (
//       roundedCoOrdinates.includes(2) &&
//       roundedCoOrdinates.includes(5) &&
//       !crossedCoOrdinates.includes(8)
//     ) {
//       return 8;
//     } else if (
//       roundedCoOrdinates.includes(3) &&
//       roundedCoOrdinates.includes(6) &&
//       !crossedCoOrdinates.includes(9)
//     ) {
//       return 9;
//     } else if (
//       roundedCoOrdinates.includes(3) &&
//       roundedCoOrdinates.includes(5) &&
//       !crossedCoOrdinates.includes(7)
//     ) {
//       return 7;
//     }

//     // if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(1) &&
//     //   roundedCoOrdinates.includes(2)
//     // ) {
//     //   return 8;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(1) &&
//     //   roundedCoOrdinates.includes(3)
//     // ) {
//     //   return 7;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(1) &&
//     //   roundedCoOrdinates.includes(4)
//     // ) {
//     //   return 6;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(1) &&
//     //   roundedCoOrdinates.includes(6)
//     // ) {
//     //   return 4;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(1) &&
//     //   roundedCoOrdinates.includes(7)
//     // ) {
//     //   return 3;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(1) &&
//     //   roundedCoOrdinates.includes(8)
//     // ) {
//     //   return 2;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(1) &&
//     //   roundedCoOrdinates.includes(9)
//     // ) {
//     //   return 3;
//     // } /*new series*/ else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(3) &&
//     //   roundedCoOrdinates.includes(1)
//     // ) {
//     //   return 2;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(3) &&
//     //   roundedCoOrdinates.includes(2)
//     // ) {
//     //   return 8;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(3) &&
//     //   roundedCoOrdinates.includes(4)
//     // ) {
//     //   return 6;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(3) &&
//     //   roundedCoOrdinates.includes(6)
//     // ) {
//     //   return 4;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(3) &&
//     //   roundedCoOrdinates.includes(7)
//     // ) {
//     //   return 9;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(3) &&
//     //   roundedCoOrdinates.includes(8)
//     // ) {
//     //   return 2;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(3) &&
//     //   roundedCoOrdinates.includes(9)
//     // ) {
//     //   return 1;
//     // } /*new */ else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(7) &&
//     //   roundedCoOrdinates.includes(1)
//     // ) {
//     //   return 9;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(7) &&
//     //   roundedCoOrdinates.includes(2)
//     // ) {
//     //   return 8;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(7) &&
//     //   roundedCoOrdinates.includes(3)
//     // ) {
//     //   return 9;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(7) &&
//     //   roundedCoOrdinates.includes(4)
//     // ) {
//     //   return 6;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(7) &&
//     //   roundedCoOrdinates.includes(6)
//     // ) {
//     //   return 4;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(7) &&
//     //   roundedCoOrdinates.includes(8)
//     // ) {
//     //   return 2;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   crossedCoOrdinates.includes(7) &&
//     //   roundedCoOrdinates.includes(9)
//     // ) {
//     //   return 1;
//     // }

//     // if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   roundedCoOrdinates.includes(1) &&
//     //   crossedCoOrdinates.includes(9)
//     // ) {
//     //   let options = [3, 7];
//     //   const randomIndex = Math.floor(Math.random() * 2);
//     //   const position = options[randomIndex];
//     //   return options;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   roundedCoOrdinates.includes(1) &&
//     //   crossedCoOrdinates.includes(3)
//     // ) {
//     //   return 9;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   roundedCoOrdinates.includes(1) &&
//     //   crossedCoOrdinates.includes(7)
//     // ) {
//     //   return 9;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   roundedCoOrdinates.includes(2) &&
//     //   crossedCoOrdinates.includes(1)
//     // ) {
//     //   return 8;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   roundedCoOrdinates.includes(3) &&
//     //   crossedCoOrdinates.includes(1)
//     // ) {
//     //   return 7;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   roundedCoOrdinates.includes(4) &&
//     //   crossedCoOrdinates.includes(1)
//     // ) {
//     //   return 6;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   roundedCoOrdinates.includes(6) &&
//     //   crossedCoOrdinates.includes(1)
//     // ) {
//     //   return 4;
//     // } else if (
//     //   roundedCoOrdinates.includes(5) &&
//     //   roundedCoOrdinates.includes(2) &&
//     //   crossedCoOrdinates.includes(3)
//     // ) {
//     //   return 7;
//     // }
//   }
// }
