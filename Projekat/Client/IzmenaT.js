var div = document.createElement("div");
div.id = "glavniDIV";

var div3 = document.createElement("div");
div3.id = "divTermin";

document.body.appendChild(div);
div.appendChild(div3);

    let divRed;
    var nizTermin = ["NazivTermina", "Vreme"];
    var textbox = document.createElement("input");
    nizTermin.forEach(el =>{
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
        div3.appendChild(divRed);
    })

    var divButton = document.createElement("div");
divButton.id = "divButton";
document.body.appendChild(divButton);

////////////////////////////////////////
let value = localStorage.getItem("Value");
console.log("Value iz termina je" + value);


var buttonIzmeni = document.createElement("button");
buttonIzmeni.id = "buttonIzmeni";
buttonIzmeni.innerHTML = "Izmeni";
buttonIzmeni.onclick=(ev)=>this.izmeniTermin(value);
divButton.appendChild(buttonIzmeni);

var buttonOtkazi = document.createElement("button");
buttonOtkazi.id = "buttonOtkazi";
buttonOtkazi.innerHTML = "Otkazi";
divButton.appendChild(buttonOtkazi);
buttonOtkazi.onclick=(ev)=function(){
    localStorage.removeItem("Value");
    location.href = "index.html";
}

fetch("https://localhost:5001/Glumac/PreuzmiTermin/"+ value,
{
    method:"GET"
}).then(p => {
    var Naziv;
    var Vreme;
    if(p.ok){
        p.json().then(data => {
            data.forEach(s => {
                console.log(s);
                console.log("Termin: " + value + " " + s.name + " " + s.time);


                Naziv = document.getElementById("NazivTermina");
                Naziv.value = s.name;

                Vreme = document.getElementById("Vreme");
                Vreme.value = s.time;
            })
        })
    }
    else{
        console.log("Losi podaci");
    }
})
function izmeniTermin(value){
    var Naziv = document.getElementById("NazivTermina");
    var Vreme = document.getElementById("Vreme");
    console.log("Broj je " + value);
    fetch("https://localhost:5001/Glumac/IzmeniTermin/" + value + "/" + Naziv.value + "/" + Vreme.value,{
        method:"PUT"
    }).then(p => {
        console.log(value + " " + Naziv.value + " " + Vreme.value);
        if(p.ok){
            console.log("Uspesno izmenjem termin");
            alert("Termin je uspesno izmenjen!");
        }
        else{
            console.log("Podaci su losi");
        }
    })
    localStorage.removeItem("Value");
}