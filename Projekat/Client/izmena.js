var div = document.createElement("div");
div.id = "glavniDIV";

var div1 = document.createElement("div");
div1.id = "divGlumac";


document.body.appendChild(div);
div.appendChild(div1);

    var nizGlumac = ["Godine", "BrojDece", "BrojPredstava"];
    var textbox = document.createElement("input");
    let label;
    let divRed;
    let ev;
    nizGlumac.forEach(el =>{
        textbox = document.createElement("input");
        label = document.createElement("label");
        divRed = document.createElement("div");
        textbox.setAttribute("autocomplete", "off");
        label.innerHTML = el;
        textbox.id = el;
        let ev;
        textbox.onclick=(ev)=function() {
            onClick= this.select();
        }

        divRed.appendChild(label);
        divRed.appendChild(textbox);
        div1.appendChild(divRed);
    })
    divRed.id = "divRed";


var divButton = document.createElement("div");
divButton.id = "divButton";
document.body.appendChild(divButton);

//////////////////////////////////////////////
let value = localStorage.getItem("Value");
console.log("Value iz glumca je" + value);

var buttonIzmeni = document.createElement("button");
buttonIzmeni.id = "buttonIzmeni";
buttonIzmeni.innerHTML = "Izmeni";
buttonIzmeni.onclick=(ev)=>this.izmeniGlumca(value);
divButton.appendChild(buttonIzmeni);

var buttonOtkazi = document.createElement("button");
buttonOtkazi.id = "buttonOtkazi";
buttonOtkazi.innerHTML = "Otkazi";
divButton.appendChild(buttonOtkazi);
buttonOtkazi.onclick=(ev)=function(){
    localStorage.removeItem("Value");
    location.href = "index.html";
}


fetch("https://localhost:5001/Glumac/PreuzmiGlumca/"+ value,
{
    method:"GET"
}).then(p => {
    var Godine;
    var Deca;
    var Predstave;
    if(p.ok){
        p.json().then(data => {
            data.forEach(s => {
                console.log("Ovo je s" + value + s.godine);

                Godine = document.getElementById("Godine");
                Godine.value = s.godine;

                Deca = document.getElementById("BrojDece");
                Deca.value = s.brojDece;

                Predstave = document.getElementById("BrojPredstava");
                Predstave.value = s.brojPredstave;
            })
        })
    }
    else{
        console.log("Losi podaci");
    }
})


function izmeniGlumca(value){
    var Godine = document.getElementById("Godine");
    var Deca = document.getElementById("BrojDece");
    var Predstave = document.getElementById("BrojPredstava");

    fetch("https://localhost:5001/Glumac/IzmeniGlumca/" + value + "/" + Godine.value + "/" + Deca.value + "/" + Predstave.value,{
        method:"PUT"
    }).then(p => {
        console.log(value + Godine + Deca + Predstave);
        if(p.ok){
            console.log("Uspesno izmenjem glumac");
            alert("Glumac je uspesno izmenjen!");
        }
        else{
            console.log("Podaci su losi");
        }
    })
    localStorage.removeItem("Value");
    
}