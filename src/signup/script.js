
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
    .then(response => {return response.json()})
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
        }
    }
}
async function makeUserProfileRequest(method) {
    let body;
    if(method == 'PUT') body = JSON.stringify(getProfileInfo()); else body = null; 
    let token = localStorage.getItem("TokenType") + localStorage.getItem("Token");
    console.log(token);
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


function getTeamInfo() {
    return {

    }
}


