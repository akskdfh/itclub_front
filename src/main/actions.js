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

let team;
let users;

const baseUrl = "http://localhost:8080";

function createTeammateCard(cardInfo, position) {
    console.log(cardInfo)
    let div = document.createElement("div");
    div.classList.add("person");

    let pInfo = document.createElement("p");
    pInfo.classList.add("info");
    let img = document.createElement("img");
    img.classList.add("photo");
    img.src = "../../resources/1640528610_2-abrakadabra-fun-p-serii-chelovek-na-avu-2.jpg";
    img.alt = "аватарка"
    img.align = "left";
    pInfo.appendChild(img);

    let h2 = document.createElement("h2");
    let info = document.createTextNode(cardInfo.name)
    h2.appendChild(info);
    

    let pPos = document.createElement("p");
    pPos.classList.add("position");
    let pos = document.createTextNode(position)
    pPos.appendChild(pos);

    let pDesc = document.createElement("p");
    pDesc.classList.add("description");
    let desc = document.createTextNode(cardInfo.description)
    pDesc.appendChild(desc);

    div.appendChild(pInfo);
    div.appendChild(h2);
    div.appendChild(pPos);
    div.appendChild(pDesc);

    document.getElementById("team").appendChild(div);
}

function createUserCard(cardInfo) {
    console.log(cardInfo)
    let div = document.createElement("div");
    div.classList.add("user");

    let pInfo = document.createElement("p");
    pInfo.classList.add("info");
    let img = document.createElement("img");
    img.classList.add("photo");
    img.src = "../../resources/1640528610_2-abrakadabra-fun-p-serii-chelovek-na-avu-2.jpg";
    img.alt = "аватарка"
    img.align = "left";
    pInfo.appendChild(img);

    let h2 = document.createElement("h2");
    let info = document.createTextNode(cardInfo.name)
    h2.appendChild(info);

    let pDesc = document.createElement("p");
    pDesc.classList.add("description");
    let desc = document.createTextNode(cardInfo.description)
    pDesc.appendChild(desc);

    div.appendChild(pInfo);
    div.appendChild(h2);
    div.appendChild(pDesc);

    document.getElementById("users").appendChild(div);
}

async function makeTeamRequest() {
    let token = localStorage.getItem("TokenType") + localStorage.getItem("Token");
    return fetch(baseUrl + "/api/team/user/", 
      {
        method: "get",
        headers: {
            Authorization: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            mode: 'cors',
            'Access-Control-Allow-Origin': '*'
        },
      })
    .then(response => { return response.json() } )
    .catch(reasone => console.log("Error: " + reasone.message));
}

async function makeGetAllUsersRequest() {
    let token = localStorage.getItem("TokenType") + localStorage.getItem("Token");
    return fetch(baseUrl + "/api/user/", 
      {
        method: 'get',
        headers: {
            Authorization: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            mode: 'cors',
            'Access-Control-Allow-Origin': '*'
        },
      })
    .then(response => { return response.json() } )
    .catch(reasone => console.log("Error: " + reasone.message));
}

async function getData() {
    team = await makeTeamRequest();
    users = await makeGetAllUsersRequest();
}

async function initMain() {
    await getData();
    console.log(team);
    console.log(users);
    for(let j = 0; j<users.length; j++) {
        let flag = false;
        for(let i = 0; i<team[0].members.length; i++) {   
            if(team[0].members[i].username === users[j].username) {
                let position = "";
                if(team[0].members[i].positions.length > 0) position = team[0].members[i].positions[0];
                createTeammateCard(users[j], position);
                flag = true;
            }
        }
        if(flag === false) {
            let position = "";
            createUserCard(users[j]);
        }
        console.log(flag);
        
    }
}

initMain();