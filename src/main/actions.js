// function scrollTo(element) {
//     window.scroll({
//       left: 0, 
//       top: element.offsetTop, 
//       behavior: 'smooth'
//     })
// }

// var button = document.querySelector('a');
// var footer = document.querySelector('#team');
  
// button.addEventListener('click', () => {
//     scrollTo(footer);
// })

async function makeRequestWithoutToken(url, callback) {
  fetch(url, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
            "login": "vanyavvorobev",
            "password": "string"
        }
      )
  })
  .then(response => response.json())
  .then(response => callback(JSON.stringify(response)))
}

makeRequestWithoutToken("http://localhost:8080/api/auth/login/", (response) => {console.log(response)});
