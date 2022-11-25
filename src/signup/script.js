
const baseUrl = "http://localhost:8080";


const fullNameInputField = document.getElementById("FullNameInputField");
const positionInputField = document.getElementById("positionInputField");
const descriptionInputField = document.getElementById("DescriptionInputField");
const teamNameInputField = document.getElementById("TeamNameInputField");
const usernameInputField = document.getElementById("UsernameInputField");
const loginInputField = document.getElementById("LoginInputField");
const passwordInputField = document.getElementById("PasswordInputField");
const confirmPasswordInputField = document.getElementById("ConfirmPasswordInputField");

const signupButton = document.getElementById("signupButton");

signupButton.addEventListener('click', () => {
    if(passwordInputField.value === confirmPasswordInputField.value) {
        makeRegisterRequest(baseUrl + "/api/auth/signup/", getRequestJson(), (response) =>{
            
        })
    }
})

async function makeRegisterRequest(url, requestJson, callback) {
    fetch(url, 
      {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestJson)
      })
    .then(response => response.json())
    .then(response => callback(JSON.stringify(response)))
} 

function getRequestJson() {
    let json;
    json = 
    {
        "username": "string",
        "login": "string",
        "password": "string" 
    };
    json.username = usernameInputField.value;
    json.login = loginInputField.value;
    json.password = passwordInputField.value;
    return json
}

function saveToken(token) {
    
}