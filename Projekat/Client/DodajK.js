var div = document.createElement("div");
div.id = "glavniDIV";

var div2 = document.createElement("div");
div2.id = "divKlijent";

document.body.appendChild(div);
div.appendChild(div2);

        var nizKlijent = ["BrojGlumca", "BrojKlijenta", "ImeKlijenta", "PrezimeKlijenta", "Email"];
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
        
        var buttonPotvrdi = document.createElement("button");
        buttonPotvrdi.id = "buttonPotvrdi";
        buttonPotvrdi.innerHTML = "Potvrdi";
        divButton.appendChild(buttonPotvrdi);

        var buttonOtkazi = document.createElement("button");
        buttonOtkazi.id = "buttonOtkazi";
        buttonOtkazi.innerHTML = "Otkazi";
        divButton.appendChild(buttonOtkazi);
        buttonOtkazi.setAttribute("onclick", "location.href = `index.html`");
        buttonPotvrdi.onclick=(ev)=function(){
            let BrojG = document.getElementById("BrojGlumca").value;
            let BrojK = document.getElementById("BrojKlijenta").value;
            let ImeK = document.getElementById("ImeKlijenta").value;
            let PrezimeK = document.getElementById("PrezimeKlijenta").value;
            let Email = document.getElementById("Email").value;

            if(BrojG === "" || BrojK === ""  || ImeK === "" || PrezimeK === "" 
            || Email === ""
            /*|| BrojK === ""  || ImeK === "" || PrezimeK === "" || Email === ""
            || NazivT === "" || Vreme === ""
            || BrojP === ""  || NazivP === ""*/){
                alert("Morate popuniti sve podatke");
                return;
            }
            //{numberGlumca}/{number}/{name}/{lastname}/{email}
            fetch("https://localhost:5001/Glumac/DodajKlijenta/" +BrojG+"/"+BrojK+"/"
            +ImeK+"/"+PrezimeK+"/"+Email,{
                method:"POST"
            }).then(p => {
                if(p.ok){
                    alert("Klijent je uspesno dodat!");
                }
                else{
                    console.log("Lose su uneti podaci");
                    alert("Lose uneti podac0i ili klijent s tim brojem vec postoji:(");
                }
            })
        }


        