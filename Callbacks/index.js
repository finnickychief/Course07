/*
  Review Callbacks
    Primarily a way to give structure to asynchronous code
    Or as a way to provide instructions other methods

    setTimeout(function(){
      console.log('Written after 2 seconds');
    }, 2000)

    let callback = () => console.log('Written from inside setTimeout');
    let time = 3000;
    setInterval(callback, time) ;


    let comparator = (a,b) => b-a;
    let ary = [5,1,3,7,2,4];
    ary.sort(comparator);

    // Asynchronous example:
    setInterval(() => console.log('Still printing'), 1500);
    while(true){console.log('hi')} // This is blocking code so our interval stops running during the execution

    setInterval(() => console.log('Still printing'), 1500);
    let i = 0;
    while(true) { i++; if(i > 100000000) break;}

    setInterval(() => console.log('hi'), 1) // While this is running you can still do whatever you want and it will wait its turn until there is time for it to run


    const xhr = new XMLHttpRequest();
    const callback = (response)=>console.log(response);
    xhr.onload = (response) => {
      console.log(response);
    }

    xhr.open('GET','https://jsonplaceholder.typicode.com/todos/1', true);
    xhr.send()


    function runFirst(callback, callback2, time){
      console.log('In runFirst')
      setTimeout(callback.bind(this, callback2, time), time);
    }
  
    function runSecond(callback, time){
      console.log('In runSecond')
      setTimeout(callback.bind(this, time*2), time * 2)
    }

    function runThird(time){
      console.log('In runThird')
      setTimeout(() => console.log(time), 1000)
    }
    runFirst(runSecond, runThird, 2000);

    Call the first function, after 'time' call the second
    When the second is called, it will call the third after 'time' * 2 seconds
    When the third is run, it will print the current value of time after 1 second


    Callbacks as instructions:
      Arrays methods: forEach, map, filter, reduce

      For each of these, the callback will be the first parameter to the function.
      The callback takes in 3-4 parameters no matter what, and it's up to the user whether or not they use them.

 = defaultStart
      forEach: Call a function on every item within an array
      Console log all the items:
      let callback = item => console.log(item);
      array.forEach(callback);

      Recreating:
        Array.prototype.forEach = function(callback){
          for(let i = 0; i < this.length; i++){
            callback(this[i], i, this);
          }
        } 

        Array.prototype.map = function(callback){
          let newArray = [];
          for(let i = 0; i < this.length; i++){
            newArray.push(callback(this[i], i, this))
          }
          return newArray;
        }

        Array.prototype.filter = function(callback){
          let newArray = [];
          for(let i = 0; i < this.length; i++){
            if(callback(this[i], i, this)){
              newArray.push(this[i]);
            }
          }
          return newArray;
        }

        Array.prototype.reduce = function(callback, defaultStart){
          let accumulator = defaultStart;
          let i = 0;
          if(defaultStart === undefined){
            accumulator = this[0];
            i = 1;
          }
          for(i; i < this.length; i++){
            accumulator = callback(accumulator, this[i], i, this);
          }
          return accumulator;
        }




  Promises
      A way to ensure code happens in the order you intend it to.
      A promise has 3 states:
        Pending
        Resolved
        Rejected

        A promise is considered 'pending' until it resolves or is rejected
        When it resolves, that is considered the 'good' case
        When it rejects, that is considered bad.

        let a = 4;
        let promise = new Promise((resolve, reject) => {
          // Do our stuff
          setTimeout(() => {
          if(a === 4){
            resolve('a is 4!');
          }else{
            reject('a is not 4');
          }
          }, 1000)
 
        })

        promise.then(result => {
          console.log(result)
          console.log(promise)
        })
        .catch(err => {
          console.log(err)
          console.log(promise)
        })

        console.log(promise);



    
    let promise2 = new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();
    const callback = (response)=>console.log(response);
    xhr.onload = () => {
      if(xhr.status === 200){
        setTimeout(()=> resolve(xhr.responseText), 2000)
      }else{
        reject(xhr.status)
      }
    }
    xhr.open('GET','https://jsonplaceholder.typicode.com/todos/', true);
    xhr.send()
    }
  )

  promise2.then(response => {
    console.log('hi in then')
    // console.log(response);
    return JSON.parse(response)
  })
  .then(jsonResponse => {
    console.log('hi in second then')
    // console.log(jsonResponse);
    let firstUserTodos = jsonResponse.filter(item => item.userId === 1 && item.completed === false)
    console.log(firstUserTodos);

  })
  .catch(err => console.log(err));



  // Create a findIndex function for an array that takes advantage of promises by outputting the index if it's successful, and outputs 'Item does not exist' by using reject.
  If you find the item, handle it using resolve
  If you can't find the item, handle it using reject

  let arr =[1,2,3,4,5,6];
  function findIndex(arr, item){
    let promise = new Promise((resolve, reject) => {
      for(let i = 0; i < arr.length; i++){
        console.log(`${i}`) // Code continues to run, but only one of EITHER the resolve or reject will be accepted
        if(item === arr[i]){
          resolve(i);
        }
      }
      reject('Item does not exist');
    });

    promise.then(index => console.log(index))
    .catch(err => console.log(err))
  }

  function findIndex(arr, item){
    return new Promise((resolve, reject) => {
      for(let i = 0; i < arr.length; i++){
        if(item === arr[i]){
          resolve(i);
        }
      }
      reject('Item does not exist');
    });
  }


    function findIndex(arr, item){
    return new Promise((resolve, reject) => {
      let index = arr.indexOf(item);
      if(index !== -1){
        resolve(index);
      }else{
        reject('Item does not exist');
      }
    });
  }

    findIndex(arr, 4).then(index => console.log(index))
  .catch(err => console.log(err))




  Fetch API

*/
