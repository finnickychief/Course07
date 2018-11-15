// Promises

/*
  Promises are a new(with ES6) way to ensure asynchronous code behaves in a reliable format. 

  The format of a promise is that it has 3 states:
    Pending - Still executing or waiting to be executed
    Fulfilled(resolved)
    Rejected(reject)

  When a promise is created, it takes 2 parameters to a function. The first is the resolve, the second is reject. 
  When resolve is called, the value within resolve is passed to the first .then of the promise chain. ONLY ONE value can be passed in this way.
  When reject is called, the value within reject is passed to the first .catch of the chain. Again, only one value can be passed in this way.


  Basic fetch reproduction:

  function ourFetch(url){
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = () => {
        if(xhr.status === 200){
          // resolve(xhr.reponseText); // Needs different parse
          resolve({ // More similar to real fetch
            data: xhr.responseText, 
            json: function(){
              return JSON.parse(this.data);
            }});
        }else{
          reject(xhr.status);
        }
      }
      xhr.send();
    })
  }

  ourFetch('https://jsonplaceholder.typicode.com/todos/1')
  .then( resp=> resp.json())
  .then( data => { 
    console.log(data);
  });



  Characteristics of .then and .catch:
    Happen in order one after another
    When you return a value in a then or catch, it is passed to function in the next .then
    When you return a promise, it passes the resolve to the next .then in the chain

  fetch('https://jsonplaceholder.typicode.com/todos/1') // Fetch here returns a promise
  .then( resp=> resp.json()) // Resp is the result of the 'resolve' in the promise returned by fetch.
  // resp.json() also returns a promise.
  .then( data => {  // data is the result of the 'resolve' in the promise from resp.json()
    console.log(data); // Log out the entire object
    return data.title; // Returning data.title will pass ONLY the string in data.title to the next .then
  })
  .then(info => { // info is now the title of the previous data
    console.log(info); 

  }).then(what => {
    console.log(what); // At this point, 'what' is undefined because it used the implicit return of the previous .then
  });

    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(resp=>resp.json())
    .then(posts => {
      
      
      console.log(posts);
      // Because we are in a .then, we cannot use the original 'reject'. We must use a new promise if we wanted to use reject.
      return new Promise((resolve, reject) => {
        if(posts[0].title.length > 100){ // If the title is greater than 100 characters, it will return a string to the first .catch in the chain.
          reject('Too long for us')
        }else{
          resolve(posts[0].title);
        }
      })
      


    }) 
    .then(title => {
      console.log(title);
      return 'Found a short enough title';
    })
    .catch(err => {
      console.log(err)
      return 'Try again'})
    .then(msg => {
      console.log(msg);
    });


  Sending HTTP messages to an API for methods other than GET

  POST(Add a new post)

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
	  userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => console.log(response))

  // Separated objects

    let obj = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }

    let headerObj = {
      Content-type: 'application/json; charset=UTF-8',
      Authorization: 'Token sometokenthatsrandom'
    }

    let options = {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: headerObj
    }

    fetch('https://jsonplaceholder.typicode.com/posts', options)
    .then(response => response.json())
    .then(json => console.log(json))



*/
