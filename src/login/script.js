
const baseUrl = "http://localhost:8080";
const email=document.getElementById("email");
const password=document.getElementById("password");

const button=document.getElementById("lod");

signupButton.addEventListener('click', () =>{
    
        makeLoginRequest(baseUrl + "/api/auth/login/", getRequestJson(), (response) =>{
            console.log(response);
        }
    }
})

async function makeLoginRequest(url, requestJson, callback) {
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
            "login": "string@string.ru",
            "password": "string"
    };
    json.login = email.value;
    json.password = password.value;
    return json
}

