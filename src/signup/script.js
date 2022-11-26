
const baseUrl = "http://localhost:8080";
let uuid = "";

const fullNameInputField = document.getElementById("FullNameInputField");
const positionInputField = document.getElementById("positionInputField");
const descriptionInputField = document.getElementById("DescriptionInputField");
const teamNameInputField = document.getElementById("TeamNameInputField");
const usernameInputField = document.getElementById("UsernameInputField");
const loginInputField = document.getElementById("LoginInputField");
const passwordInputField = document.getElementById("PasswordInputField");
const confirmPasswordInputField = document.getElementById("ConfirmPasswordInputField");

const signupButton = document.getElementById("signupButton");



function isDataValid() {
    if(passwordInputField.value !== confirmPasswordInputField.value) {
        return false;
    }
    if(!loginInputField.value.includes("@")) {
        return false;
    }
    return true;
}

signupButton.addEventListener('click', async () => {
    if(isDataValid()) {
        response = await makeRegisterRequest();
        if(response == null) {
            console.log("registration error");
        }else if(response.token != null) {
            localStorage.setItem("Token", response.token);
            localStorage.setItem("TokenType", response.tokenType);
            console.log("registration is success")
            saveUserProfile();
        }else {
            let err = "";
            for(let i = 0; i<response.length; i++) {
                err += response[i].message + "\n";
            }
            alert(err);
            console.log("registration error")
        } 
    }
})
async function makeRegisterRequest() {
    console.log(getReigistrationRequestJson());
    return fetch(baseUrl + "/api/auth/signup/", 
      {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(getReigistrationRequestJson())
      })
    .then(response => {if(response.ok) {return response.json()}})
    .catch(reasone => console.log("Error: " + reasone.message))
}
function getReigistrationRequestJson() {
    return {
        "username": usernameInputField.value,
        "login": loginInputField.value,
        "password": passwordInputField.value 
    };
}


async function saveUserProfile() {
    let response = await makeUserProfileRequest('GET');
    if(response == null) {
        console.log("get user error");
    } else{
        console.log(response);
        if(response.uuid != null) {
            uuid = response.uuid;
            response = await makeUserProfileRequest('PUT');
            if(response != null) {
                saveTeamInfo();
            }
        }
    }
}
async function makeUserProfileRequest(method) {
    let body;
    if(method == 'PUT') body = JSON.stringify(getProfileInfo()); else body = null; 
    let token = localStorage.getItem("TokenType") + localStorage.getItem("Token");
    return fetch(baseUrl + "/api/user/profile", 
      {
        method: method,
        headers: {
            Authorization: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            mode: 'cors',
            'Access-Control-Allow-Origin': '*'
        },
        body: body,
      })
    .then(response => {
        console.log(response);
        if(method == "GET") return response.json(); else return "";},
        reasone => console.log(reasone))
    .catch(reasone => console.log("Error: " + reasone.message));
}
function getProfileInfo() {
    return {
        "uuid": uuid,
        "name": fullNameInputField.value,
        "avatarLink": null,
        "faculty": null,
        "course": null,
        "description": descriptionInputField.value
    };
}



async function saveTeamInfo() {
    let teamName = teamNameInputField.value;
    let teams = await makeGetAllTeamsRequest();
    console.log(teams);
    let team = null;
    if(teams == null) return;
    for(let i = 0; i<teams.length; i++) {
        if(teams[i].name === teamName) {
            team = teams[i];
        }
    }

    let response = null;
    if(team === null) {
        let body = getTeamInfo()
        console.log(body);
        response = await makeTeamRequest("post", "create", body);
        console.log("create");
        setPos();
    } else {
        response = await makeTeamRequest("post", `${team.uuid}/follow`, null)
        console.log("follow " + team.uuid);
        setPos();
    }
}
async function setPos() {
    let teams = await makeGetAllTeamsRequest();
    console.log(teams);
    let team = null;
    if(teams == null) return;
    for(let i = 0; i<teams.length; i++) {
        if(teams[i].name === teamNameInputField.value) {
            team = teams[i];
        }
    }   
    console.log(team);
    if(team !== null) {
        setPosition(team.uuid);
    }
}
async function makeGetAllTeamsRequest() {
    let token = localStorage.getItem("TokenType") + localStorage.getItem("Token");
    return fetch(baseUrl + "/api/team/", 
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
async function makeTeamRequest(method, urlSuffix, body) {
    let token = localStorage.getItem("TokenType") + localStorage.getItem("Token");
    return fetch(baseUrl + "/api/team/" + urlSuffix, 
      {
        method: method,
        headers: {
            Authorization: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            mode: 'cors',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body),
      })
    .then(response => { return response } )
    .catch(reasone => console.log("Error: " + reasone.message));
}
function getTeamInfo() {
    return {
        "name": teamNameInputField.value,
        "description": null
    }
}

async function setPosition(teamUuid) {
    response = await makeSetPosTeamsRequest(teamUuid);
    if(response.ok) {
       window.location.replace("http://127.0.0.1:5500/src/main/index.html")
    }
}
async function makeSetPosTeamsRequest(teamUuid) {
    let token = localStorage.getItem("TokenType") + localStorage.getItem("Token");
    return fetch(baseUrl + `/api/team/${teamUuid}/positions`, 
      {
        method: 'post',
        headers: {
            Authorization: token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            mode: 'cors',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(getPositions())
      })
    .then(response => { return response} )
    .catch(reasone => console.log("Error: " + reasone.message));
}
function getPositions() {
    return [
        positionInputField.value
    ]
}

