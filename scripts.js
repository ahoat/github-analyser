const searchBtn = document.querySelector("#search-btn");
const userInput = document.querySelector(".search-box");
let user = userInput.Value;

function getUser(user) {
    return fetch(`https://api.github.com/users/${user}`)
         .then((result) => result.json());
      };

getUser(user)
    .then((user) => console.log(user))
    .catch((error) => console.log(error));

function getrepos(user) {
    return fetch(`https://api.github.com/users/${user}/repos`)
        .then((result) => result.json());
          };

getrepos(user)
    .then((user) => console.log(user))
    .catch((error) => console.log(error));
    