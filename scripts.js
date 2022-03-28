//----------------- grab HTML elements -------------------------

const form = document.querySelector("form");
const searchBtn = document.querySelector("#search-btn");
const userInput = document.querySelector(".search-box");
const headlineData = document.querySelector(".headline-data");
const starredList = document.querySelector(".starred-list");


//------------------form/button event listener----------------
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = userInput.value;
    const userURL = `https://api.github.com/users/${username}`;
    headlines(userURL);
    getrepos(userURL);
    getStarred(userURL);
    getEvent(userURL);
    form.reset();
      
});

//--------------get user data HTTP request-------------------
async function fetchData(user) {
        const response = await fetch(user);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`User not found: ${response.status} ${data.message}`);
        } else {
        return data;
         }
    }

// ----------reusable function to create p elements-----------------
function createPElement(){
    let p = document.createElement("p");
    p.classList.add("userInfo")
    return p;
}

// ----------------------Create headline data items -----------------
async function headlines (user) {
    headlineData.textContent ="";
    const userData = await fetchData(`${user}`);
    console.log(userData);
    let avatar = document.createElement("img");
    avatar.classList.add("avatarImg");
    avatar.src = userData.avatar_url
    let userName = createPElement();
    userName.appendChild(document.createTextNode(`Username : ${userData.login}`))
    let location = createPElement();
    location.appendChild(document.createTextNode(`Location : ${userData.location}`));
    let followersNum = createPElement();
    followersNum.appendChild(document.createTextNode(`Followers : ${userData.followers}`));
    let followingNum = createPElement();
    followingNum.appendChild(document.createTextNode(`Following : ${userData.following}`));
    headlineData.appendChild(avatar);
    headlineData.appendChild(userName);
    headlineData.appendChild(location);
    headlineData.appendChild(followersNum);
    headlineData.appendChild(followingNum);
}

async function getrepos(user) {
    const repos = await fetchData(`${user}/repos`);
    console.log(repos);
       
          };

//-----------------Create list of starred repos--------------------------          

async function getStarred(user) {
    starredList.textContent = "";
    const starredData = await fetchData(`${user}/starred`);
    starredList.appendChild(document.createTextNode(`⭐ : ${starredData.length}`));
    for (let i = 0; i < starredData.length; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        let link = document.createTextNode(`${starredData[i].html_url}`);
        a.appendChild(link);
        a.href = `${starredData[i].html_url}`
        li.appendChild(a);
        starredList.appendChild(li);
    }
    };

    //----------------- Events--------------------------          



async function getEvent(user) {
    const events = await fetchData(`${user}/events`);
    let eventArr= [];
    const eventObj = {};

    for (let i =0; i < events.length; i++) {
        eventArr.push(events[i].type);  
    }

    for(let i = 0; i < eventArr.length; ++i) {
        if(!eventObj[eventArr[i]])
            eventObj[eventArr[i]] = 0;
        ++eventObj[eventArr[i]];
    }
    console.log(Object.keys(eventObj));
    barChart(eventObj);
    };


// --------Create charts----------

function barChart (obj) {

    const labels = Object.keys(obj)

    const data = {
    labels: labels,
    datasets: [{
        label: 'Recent Activity',
        backgroundColor: ['rgb(55, 99, 132)', 'rgb(155, 99, 132)', 'rgb(332, 231, 23)'
        , 'rgb(88, 29, 353)', 'rgb(255, 99, 132)', 'rgb(222, 192, 100)','rgb(73, 112, 10)'],
        borderColor: 'rgb(255, 99, 132)',
        data: Object.values(obj),
    }]
    };

      const config = {
        type: 'bar',
        data: data,
        options: {
            indexAxis: 'y',
        }
      };

    const myChart = new Chart(
        document.getElementById('chart1').getContext("2d"),
        config
      );

}


