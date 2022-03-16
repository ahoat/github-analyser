function getUser(user) {
    return fetch(`https://api.github.com/users/${user}`)
         .then((result) => result.json());
      };

getUser("ahoat")
    .then((user) => console.log(user))
    .catch((error) => console.log(error));