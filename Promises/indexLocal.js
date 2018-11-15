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

function processThree() {
  let input = Number(document.querySelector('#exerciseThreeInput').value);
  console.log(input);
  usersLongestPost(input);
}

function usersLongestPost(id) {
  let url = `https://jsonplaceholder.typicode.com/posts/`;

  // let promise = new Promise((resolve, reject) => {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open('GET', url, true);
  //   xhr.onload = () => {
  //     if (xhr.status === 200) {
  //       let data = JSON.parse(xhr.responseText);
  //       resolve(data);
  //     } else if (xhr.status > 400) {
  //       reject(data);
  //     }
  //   };
  //   xhr.send();
  // });

  // promise // Used for xhr
  fetch(url)
    .then(resp => resp.json())
    .then(posts => {
      posts = posts.filter(({ userId }) => userId === id);
      console.log(posts);

      let longestIndex = 0;

      for (let i = 1; i < posts.length; i++) {
        if (posts[i].body.length > posts[longestIndex].body.length) {
          longestIndex = i;
        }
      }

      console.log(posts[longestIndex]);
    })
    .catch(err => console.log(err));
}

// Exercise 4
// Get user GitHub information and followers

function githubInfo(username) {
  let url = username ? `https://api.github.com/users/${username}` : 'user.json';

  fetch(url, {
    headers: {
      Authorization: `Token ${githubKey}`
    }
  })
    .then(resp => resp.json())
    .then(({ created_at, followers, email, followers_url }) => {
      // Begin step 2
      let output = `User was created on: ${created_at} and has ${followers} followers.`;

      // if(data.email){
      //   output += ` Their email is ${data.email}.`;
      // }

      output += email
        ? ` Their email is ${email}.`
        : ` They have no public email.`;

      console.log(output);
      // End step 2

      // Begin step 3
      if (followers > 0) {
        return fetch(followers_url, {
          headers: { Authorization: `Token ${githubKey}` }
        });
      }
      //return undefined;
    })
    .then(resp => resp.json())
    .then(followers => {
      let logins = followers.map(({ login }) => login);
      console.log(logins);
    })
    .catch(err => console.log(err));
}

function processFour() {
  let input = document.querySelector('#exerciseFourInput').value;
  console.log(input);
  githubInfo(input);
}

// Exercise 5

function githubRepoInfo(username) {
  let url = username ? `https://api.github.com/users/${username}` : 'user.json';
  console.log(`Token ${githubKey}`);
  fetch(url, {
    headers: { Authorization: `Token ${githubKey}` }
  })
    .then(resp => resp.json()) // Convert response's json to a real object or array
    .then(user => {
      // user is an object
      console.log(user);
      return fetch(user.repos_url, {
        headers: { Authorization: `Token ${githubKey}` }
      });
    })
    .then(resp => resp.json())
    .then(repos => {
      // repos is an array
      console.log(repos);

      // Find the repo with the largest size
      let largeSizeIndex = 0;

      for (let i = 1; i < repos.length; i++) {
        // If we've found a new largest one
        if (repos[i].size > repos[largeSizeIndex].size) {
          largeSizeIndex = i;
          console.log(`New largest size is at ${largeSizeIndex}`);
        }
      }

      // This gets the repo with the largest size
      let { html_url, created_at, updated_at, stargazers_count } = repos.reduce(
        (acc, repo) => {
          acc = acc.size < repo.size ? acc : repo;
          return acc;
        }
      );

      //  let repo = repos[largeSizeIndex];
      // html_url, created_at, updated_at, and stargazers_count(
      let output = `URL: ${html_url} was created on ${created_at}, last updated on ${updated_at} and has ${stargazers_count} stars`;
      console.log(output);
    });
}
function processFive() {
  let input = document.querySelector('#exerciseFiveInput').value;
  console.log(input);
  githubRepoInfo(input);
}
