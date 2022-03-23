const form = document.querySelector("form");
const searchBtn = document.querySelector("#search-btn");
const userInput = document.querySelector(".search-box");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = userInput.value;
    getUser(username)
     .then((username) => console.log(username))
     .catch((error) => console.log(error));
    console.log(username);
    getrepos(username)
    .then((username) => console.log(username))
    .catch((error) => console.log(error))

});

function getUser(user) {
    return fetch(`https://api.github.com/users/${user}`)
         .then((result) => result.json());
      };

function getrepos(user) {
    return fetch(`https://api.github.com/users/${user}/repos`)
        .then((result) => result.json());
          };        