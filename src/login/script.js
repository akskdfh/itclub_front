
const baseUrl = "http://localhost:8080";

const email=document.getElementById("email");
const password=document.getElementById("password");

const button=document.getElementById("log");

button.addEventListener('click', () =>{
    
        makeLoginRequest(baseUrl + "/api/auth/login/", getRequestJson(), (response) =>{
            if(response.token !== null) {
                localStorage.setItem("Token", response.token);
                localStorage.setItem("TokenType", response.tokenType);
                window.location.replace("http://127.0.0.1:5500/src/main/index.html")
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
    .then(response => callback(response))
    .catch(() => alert("Your login or password is incorrect!"));
} 

function getRequestJson() {
    return {
            "login": email.value,
            "password": password.value
    };
}

