function createUser() {
  // This function will grab all of the inputs for the user and send it to the JSON placeholder api via fetch.
  const name = document.querySelector('#name').value;
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const phone = document.querySelector('#phone').value;
  //

  user = {
    name,
    username,
    email,
    phone
  };

  fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
    .then(resp => resp.json())
    .then(data => {
      document.querySelector(
        '#messageBox'
      ).innerHTML = `User created successfully! Id for new user is ${data.id}`;
    })
    .catch(
      err =>
        (document.querySelector('#messageBox').innerHTML =
          'No good, something went wrong.')
    );

  // Send the name, username, email, and phone at a minimum
  // https://jsonplaceholder.typicode.com/users as POST
  //
  // After the completion of the fetch, output a success/failure message to the user
}
