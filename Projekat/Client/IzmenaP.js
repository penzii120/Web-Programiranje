var div = document.createElement("div");
div.id = "glavniDIV";

var div2 = document.createElement("div");
div2.id = "divPredstava";

document.body.appendChild(div);
div.appendChild(div2);

let label;
let divRed;
let ev;

var nizPredstava = ["NazivPredstave"];
var textbox = document.createElement("input");
nizPredstava.forEach(el =>{
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
console.log("Value iz predstave je " + value);

var buttonIzmeni = document.createElement("button");
buttonIzmeni.id = "buttonIzmeni";
buttonIzmeni.innerHTML = "Izmeni";
buttonIzmeni.onclick=(ev)=>this.izmeniPredstavu(value);
divButton.appendChild(buttonIzmeni);

var buttonOtkazi = document.createElement("button");
buttonOtkazi.id = "buttonOtkazi";
buttonOtkazi.innerHTML = "Otkazi";
divButton.appendChild(buttonOtkazi);
buttonOtkazi.onclick=(ev)=function(){
location.href = "index.html";
}

fetch("https://localhost:5001/Glumac/PreuzmiPredstavu/" + value,{
    method:"GET"
}).then(p => {
    var Naziv;
    if(p.ok){
        p.json().then(data => {
            data.forEach(k => {
                console.log("Klijent " + value + " " + k.naziv);
                Naziv = document.getElementById("NazivPredstave");
                Naziv.value = k.naziv;
            })
        })
    }
    else{
        console.log("Losi podaci");
    }
})

function izmeniPredstavu(value){
    var Naziv = document.getElementById("NazivPredstave");
    console.log("value je " + value);
    console.log("Nazivj e" + Naziv.value);
    fetch("https://localhost:5001/Glumac/IzmeniPredstavu/" + value + "/" + Naziv.value,{
        method:"PUT"
    }).then(p => {
        if(p.ok){
            console.log("Uspesno izmenjena predstava!");
            alert("Klijent je uspesno izmenjen!!");
        }
        else{
            console.log("Losi podaci");
        }
    })
    localStorage.removeItem("ValueK");
}