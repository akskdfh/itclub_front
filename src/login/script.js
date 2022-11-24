
const baseUrl = "http://localhost:8080";
const email=document.getElementById("email");
const password=document.getElementById("password");

const button=document.getElementById("log");

button.addEventListener('click', () =>{
    
        makeLoginRequest(baseUrl + "/api/auth/login/", getRequestJson(), (response) =>{
            if(response.token !== null) {
                console.log(response.token)
            }
        })
    }
)

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
    .then(response => callback(response));
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

