

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
    if(cardInfo.username == "vanyavvorobev") {
        img.src = "../../resources/kitty.jpg"
        cardInfo.description = "Люблю майнкрафт, обажаю террарию!!!\nРодился 14 апреля 2004 года в 4 часа ночи(Сыграем в игру? Какое мое любимое число?) по Иркутскому времени в городе Черемхово Иркутской области, после переехал в Республику Бурятия и прожил там в селе Хоринск всю свою жизнь до поступления на HITS. По национальности я Русский. Ходил в детский садик \"Березка\". Учился в Школе номер 2."
    }
    else if(cardInfo.username == "ElenaKarelina") {
        img.src = "../../resources/Lena.jpg"
    }
    else if(cardInfo.username == "e1_boitsov") {
        img.src = "../../resources/Vanya.jpg"
    }
    else if(cardInfo.username == "allieeN") {
        img.src = "../../resources/Alyona.jpg"
    }
    else {
        img.src = "https://sun9-east.userapi.com/sun9-24/s/v1/ig2/O7wIKyyo_kvoYDYYl6HijvQ1Kq1OmKjh89e3aOQ3e9j8C185KaDmuV85hhRqRzLT9C986ERxBVZw7W_a86q1BbtN.jpg?size=1280x906&quality=96&type=album";
    }
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
    if(cardInfo.username == "vanyavvorobev") {
        img.src = "../../resources/kitty.jpg"
    }
    else if(cardInfo.username == "ElenaKarelina") {
        img.src = "../../resources/Lena.jpg"
    }
    else if(cardInfo.username == "") {

    }
    else if(cardInfo.username == "") {

    }
    else {
        img.src = "https://sun9-east.userapi.com/sun9-24/s/v1/ig2/O7wIKyyo_kvoYDYYl6HijvQ1Kq1OmKjh89e3aOQ3e9j8C185KaDmuV85hhRqRzLT9C986ERxBVZw7W_a86q1BbtN.jpg?size=1280x906&quality=96&type=album";
    }
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

