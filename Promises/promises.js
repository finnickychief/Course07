//   Promises
//   A way to ensure code happens in the order you intend it to.
//   A promise has 3 states:
//     Pending
//     Resolved
//     Rejected

//     A promise is considered 'pending' until it resolves or is rejected
//     When it resolves, that is considered the 'good' case
//     When it rejects, that is considered bad.

//     let a = 4;
//     let promise = new Promise((resolve, reject) => {
//       // Do our stuff
//       setTimeout(() => {
//       if(a === 4){
//         resolve('a is 4!');
//       }else{
//         reject('a is not 4');
//       }
//       }, 1000)

//     })

//     promise.then(result => {
//       console.log(result)
//       console.log(promise)
//     })
//     .catch(err => {
//       console.log(err)
//       console.log(promise)
//     })

//     console.log(promise);

// let promise2 = new Promise((resolve, reject) => {

// const xhr = new XMLHttpRequest();
// const callback = (response)=>console.log(response);
// xhr.onload = () => {
//   if(xhr.status === 200){
//     setTimeout(()=> resolve(xhr.responseText), 2000)
//   }else{
//     reject(xhr.status)
//   }
// }
// xhr.open('GET','https://jsonplaceholder.typicode.com/todos/', true);
// xhr.send()
// }
// )

// promise2.then(response => {
// console.log('hi in then')
// // console.log(response);
// return JSON.parse(response)
// })
// .then(jsonResponse => {
// console.log('hi in second then')
// // console.log(jsonResponse);
// let firstUserTodos = jsonResponse.filter(item => item.userId === 1 && item.completed === false)
// console.log(firstUserTodos);

// })
// .catch(err => console.log(err));

// // Create a findIndex function for an array that takes advantage of promises by outputting the index if it's successful, and outputs 'Item does not exist' by using reject.
// If you find the item, handle it using resolve
// If you can't find the item, handle it using reject

// let arr =[1,2,3,4,5,6];
// function findIndex(arr, item){
// let promise = new Promise((resolve, reject) => {
//   for(let i = 0; i < arr.length; i++){
//     console.log(`${i}`) // Code continues to run, but only one of EITHER the resolve or reject will be accepted
//     if(item === arr[i]){
//       resolve(i);
//     }
//   }
//   reject('Item does not exist');
// });

// promise.then(index => console.log(index))
// .catch(err => console.log(err))
// }

// function findIndex(arr, item){
// return new Promise((resolve, reject) => {
//   for(let i = 0; i < arr.length; i++){
//     if(item === arr[i]){
//       resolve(i);
//     }
//   }
//   reject('Item does not exist');
// });
// }

// function findIndex(arr, item){
// return new Promise((resolve, reject) => {
//   let index = arr.indexOf(item);
//   if(index !== -1){
//     resolve(index);
//   }else{
//     reject('Item does not exist');
//   }
// });
// }

// findIndex(arr, 4).then(index => console.log(index))
// .catch(err => console.log(err))

// Fetch API

// */
