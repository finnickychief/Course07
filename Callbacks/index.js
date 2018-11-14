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


