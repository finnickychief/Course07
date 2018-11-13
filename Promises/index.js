let main = document.querySelector('#main');

// Find unsorted pairs in an array
function promiseIsSorted(arr) {
  let promise = new Promise((resolve, reject) => {
    let unsortedPairs = [];

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        unsortedPairs.push([arr[i], arr[i + 1]]);
      }
    }
    if (unsortedPairs.length === 0) {
      // Its sorted
      resolve(arr);
    } else {
      // Not sorted
      reject(unsortedPairs);
    }
  });

  promise
    .then(arr => {
      // Print the entire array, 5 items per line
      main.innerHTML = 'Array is sorted!\n';
      let paragraph = document.createElement('p');
      paragraph.innerHTML = arr[0];
      for (let i = 1; i < arr.length; i++) {
        if (i % 5 === 0) {
          main.appendChild(paragraph);
          paragraph = document.createElement('p');
          paragraph.innerHTML = arr[i];
          i++;
        }
        paragraph.innerHTML += `, ${arr[i]}`;
      }

      main.appendChild(paragraph);
    })
    .catch(unsortedPairs => {
      // Print the array, 3 PAIRS per line
      main.innerHTML = 'Array is not sorted, here are the unsorted pairs!\n';
      let paragraph = document.createElement('p');
      paragraph.innerHTML = `[${unsortedPairs[0][0]}, ${unsortedPairs[0][1]}]`;
      for (let i = 1; i < unsortedPairs.length; i++) {
        if (i % 3 === 0) {
          main.appendChild(paragraph);
          paragraph = document.createElement('p');
          paragraph.innerHTML = `[${unsortedPairs[i][0]}, ${
            unsortedPairs[i][1]
          }]`;
          i++;
        }
        paragraph.innerHTML += `, [${unsortedPairs[i][0]}, ${
          unsortedPairs[i][1]
        }]`;
      }

      main.appendChild(paragraph);
    });
}

// promiseIsSorted([2, 1, 3, 7, 6, 4, 3, 2, 1]);
// promiseIsSorted([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

function processOne() {
  let input = JSON.parse(
    `[${document.querySelector('#exerciseOneInput').value}]`
  );

  promiseIsSorted(input);
}

function containsNumber(string, callback1, callback2) {
  let containsNum = false;
  let firstIndex = 0;

  let num = string.match(/\d+/g);

  if (num) {
    containsNum = true;
    firstIndex = string.indexOf(num);
  }

  // Check for a number within ‘string’
  // for (let i = 0; i < string.length; i++) {
  //   // if (Number(string[i]) !== NaN) {
  //   if (!isNaN(string[i])) {
  //     // Not NOT a number
  //     containsNum = true;
  //     firstIndex = i;
  //     break;
  //   }
  // }

  if (containsNum) {
    callback1(string, firstIndex);
  } else {
    callback2(string);
  }
}
function containedNumber(str, index) {
  console.log(`${str} contained a number at index ${index}!`);
}
function noNumber(str) {
  console.log(`${str} does not contain a number.`);
}

function containsNumberPromise(string) {
  let promise = new Promise((resolve, reject) => {
    let containsNum = false;
    let firstIndex = 0;

    let num = string.match(/\d+/g);

    if (num) {
      containsNum = true;
      firstIndex = string.indexOf(num);
    }
    // Built an answer/response object to pass more than one piece of information as a single parameter
    let answer = {
      str: string,
      index: firstIndex
    };

    if (containsNum) {
      resolve(answer);
    } else {
      reject(string);
    }
  });

  promise
    .then(result => {
      console.log(`${result.str} contained a number at index ${result.index}!`);
    })
    .catch(str => {
      console.log(`${str} does not contain a number.`);
    });
}

function processTwoCallback() {
  let input = document.querySelector('#exerciseTwoInput').value;
  containsNumber(input, containedNumber, noNumber);
}
function processTwoPromise() {
  let input = document.querySelector('#exerciseTwoInput').value;
  containsNumberPromise(input);
}
