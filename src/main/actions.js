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

function createCard() {
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
    let info = document.createTextNode("Ivan Ivanov")
    h2.appendChild(info);
    

    let pPos = document.createElement("p");
    pPos.classList.add("position");
    let pos = document.createTextNode("frontend")
    pPos.appendChild(pos);

    let pDesc = document.createElement("p");
    pDesc.classList.add("description");
    let desc = document.createTextNode("bla bla bla o sebe hbbj ggggygy ytytyt ttyt t ttyty ")
    pDesc.appendChild(desc);

    div.appendChild(pInfo);
    div.appendChild(h2);
    div.appendChild(pPos);
    div.appendChild(pDesc);

    document.getElementById("team").appendChild(div);
}

// <div class="person">
//                 <p class="info"> 

//                 <p class="position">frontend</p>
//                 <p class="description">bla bla bla o sebe hbbj ggggygy ytytyt ttyt t ttyty </p>
//             </div>