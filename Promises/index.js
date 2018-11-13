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
