var div = document.createElement("div");
div.id = "glavniDIV";

var div2 = document.createElement("div");
div2.id = "divKlijent";

document.body.appendChild(div);
div.appendChild(div2);

let label;
let divRed;
let ev;

    var nizKlijent = ["ImeKlijenta", "PrezimeKlijenta", "Email"];
    var textbox = document.createElement("input");
    nizKlijent.forEach(el =>{
        label = document.createElement("label");
        textbox = document.createElement("input");
        divRed = document.createElement("div");
        label.innerHTML = el;
        textbox.id = el;
        textbox.onclick=(ev)=function() {
            onClick= this.select();
        }
        divRed.appendChild(label);
        divRed.appendChild(textbox);
        div2.appendChild(divRed);
    })


    var divButton = document.createElement("div");
divButton.id = "divButton";
document.body.appendChild(divButton);

//////////////////////////////////////////
let value = localStorage.getItem("Value");
console.log("Value iz klijenta je " + value);

var buttonIzmeni = document.createElement("button");
buttonIzmeni.id = "buttonIzmeni";
buttonIzmeni.innerHTML = "Izmeni";
buttonIzmeni.onclick=(ev)=>this.izmeniKlijenta(value);
divButton.appendChild(buttonIzmeni);

var buttonOtkazi = document.createElement("button");
buttonOtkazi.id = "buttonOtkazi";
buttonOtkazi.innerHTML = "Otkazi";
divButton.appendChild(buttonOtkazi);
buttonOtkazi.onclick=(ev)=function(){
    location.href = "index.html";
}



fetch("https://localhost:5001/Glumac/getKlijenta/" + value,{
    method:"GET"
}).then(p => {
    var Ime;
    var Prezime;
    var Email;
    if(p.ok){
        p.json().then(data => {
            data.forEach(k => {
                console.log("Klijent " + value + " " + k.ime);

                Ime = document.getElementById("ImeKlijenta");
                Ime.value = k.ime;

                Prezime = document.getElementById("PrezimeKlijenta");
                Prezime.value = k.prezime;

                Email = document.getElementById("Email");
                Email.value = k.email
            })
        })
    }
    else{
        console.log("Losi podaci");
    }
})
function izmeniKlijenta(value){
    var Ime = document.getElementById("ImeKlijenta");
    var Prezime = document.getElementById("PrezimeKlijenta");
    var Email = document.getElementById("Email");
    console.log(value + Ime.value + Prezime.value + Email.value);
    fetch("https://localhost:5001/Glumac/PromeniKlijenta/" + value + "/" + Ime.value + "/" + Prezime.value + "/" + Email.value,{
        method:"PUT"
    }).then(p => {
        if(p.ok){
            console.log("Uspesno izmenjen glumac!");
            alert("Klijent je uspesno izmenjen!!");
        }
        else{
            console.log("Losi podaci");
        }
    })
    localStorage.removeItem("ValueK");
}