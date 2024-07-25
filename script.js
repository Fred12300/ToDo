let taskName = document.querySelector("#taskName").value;
let taskIn = document.querySelector("#taskIn").value;
let okBtn = document.querySelector("#subBtn");
let suppr = document.querySelectorAll(".del");
let dateAff = document.querySelector("#date");
let dateBut = document.querySelector("#dateButIn").value;

let ref = 3;
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();
let now = `${year}-${month}-${day}`


let data = [];

function refresh() {
    console.log("---Refresh---");
    console.log(data);
    document.querySelectorAll(".task").forEach(x => x.remove());

    dateAff.textContent =  `${now}`

    data.map((ele) => {
        let task = document.createElement("div");
        zone.appendChild(task);
        task.style.width = "400px";
        ele.state === 0 ? task.style.backgroundColor = "rgb(239, 241, 90)" : task.style.backgroundColor = "rgb(95, 241, 90)";
        task.className = `${data.indexOf(ele)} task`;
        task.innerHTML = `
        <div class="top">
        <div class="col_main">
        <div class="line">
            <h3>Nom : </h3><p class="${data.indexOf(ele)} mod name">${ele.name}<p>
        </div>
        <div class="line">
            <h3>Description : </h3> <p class="${data.indexOf(ele)} mod content">${ele.content}</p>
        </div>
        </div>
        <div class="col_dates">
        <div class="line"><p>Date de création : </p><p class="${data.indexOf(ele)} mod date dateCreat">${ele.date}</p></div>
        <div class="line"><p>Date butoire : </p><p class="${data.indexOf(ele)} mod dateBut date">${ele.dateBut}</p></div>
        </div>
        </div>
        <hr>
        <div class="btns" id="b${data.indexOf(ele)}">
            <button id="${data.indexOf(ele)}" class="del btn" >Supprimer</button>
            <button class="${data.indexOf(ele)} check btn">Fait</button>
            <button class="${data.indexOf(ele)} change btn">Modifier</button>
        </div>`;
    })
    suppr = document.querySelectorAll(".del");
        suppr.forEach(x => x.addEventListener("click", () => {
            console.log("suppr");
   
            deleteT(x.id)
        }))
    check = document.querySelectorAll(".check");
    check.forEach(x => x.addEventListener("click", () => {
        console.log("ckeck");
        console.log(x.className[0])
        data[x.className[0]].state === 0 ? data[x.className[0]].state = 1 : data[x.className[0]].state = 0;
        refresh()
    }))
    change = document.querySelectorAll(".change");
    change.forEach(x => x.addEventListener("click", () => {
        console.log("change");
        changeIt(x.className[0]);
    }))
    localStorage.setItem("DataFred", data);
    document.querySelector("#taskName").value = "";
    document.querySelector("#taskIn").value = "";
    document.querySelector("#dateButIn").value = "";
}

refresh();

function addTask() {
    console.log("---AddTask---");
    taskName = document.querySelector("#taskName").value;
    taskIn = document.querySelector("#taskIn").value;
    dateBut = document.querySelector("#dateButIn").value;
    if(taskName === "" || taskIn === "") {
        alert("Veuillez saisir un Nom ET une Description")
    } else {
        let newT = {}
        newT.name = taskName;
        newT.content = taskIn;
        newT.ref = ref;
        newT.state = 0;
        newT.date = now;
        newT.dateBut = dateBut;
        data.push(newT);
        ref++;
        refresh()
    }
}

function deleteT(nb) {
    data.splice(nb, 1);
    refresh();
}

function changeIt(wich) {
    let mod = document.getElementsByClassName(`${wich} mod`);
    console.log(mod);
    Array.from(mod).map((x) => {
        console.log(x)
        console.log(x.classList)
        let inp = document.createElement("input");
        inp.classList = `${x.classList}`
        let nam = x.classList[2];
        inp.placeholder = data[x.className[0]][`${nam}`];
        if(x.classList.contains("date")){
            inp.type = "date";
            inp.value = data[x.className[0]][`${nam}`];
        }
        x.parentNode.appendChild(inp);
        x.remove()
    }
    );
    console.log(wich)
    let btnZone = document.getElementById(`b${wich}`);
    let btns = document.getElementsByClassName("btn");
    Array.from(btns).forEach(x => x.remove());
    let modBtnOk = document.createElement("button");
    modBtnOk.textContent = "Sauver";
    modBtnOk.id = "save";
    
    let modBtnCancel = document.createElement("button");
    modBtnCancel.textContent = "Annuler";
    modBtnCancel.id = "cancel";
    

    btnZone.appendChild(modBtnOk)
    btnZone.appendChild(modBtnCancel)

    let saveIt = document.getElementById("save");
    let cancelIt = document.getElementById("cancel");

    saveIt.addEventListener("click", () => {
        console.log("---Save---");
        Array.from(mod).map((x) => {
        console.log(x.value)
        if(x.value != "") {
            let nam = x.classList[2];
            console.log("SAVE " + x.value)
            data[wich][`${nam}`] = x.value;
            refresh()
        }
        });
    });
    cancelIt.addEventListener("click", () =>  {refresh()});
}


// let deleteT = (nb) => {

// }

okBtn.addEventListener("click", () => {
    console.log("clic")
    addTask()
})
console.log("DATA" + localStorage.getItem("DataFred", data)) 









