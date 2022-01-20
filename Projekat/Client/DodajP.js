var div = document.createElement("div");
div.id = "glavniDIV";

var div2 = document.createElement("div");
div2.id = "divPredstava";

document.body.appendChild(div);
div.appendChild(div2);

        var nizKlijent = ["BrojGlumca", "BrojPredstave", "NazivPredstave"];
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
            let BrojP = document.getElementById("BrojPredstave").value;
            let Naziv = document.getElementById("NazivPredstave").value;

            if(BrojG === "" || BrojP === ""  || Naziv === ""
            /*|| BrojK === ""  || ImeK === "" || PrezimeK === "" || Email === ""
            || NazivT === "" || Vreme === ""
            || BrojP === ""  || NazivP === ""*/){
                alert("Morate popuniti sve podatke");
                return;
            }
            fetch("https://localhost:5001/Glumac/DodajPredstavu/" +BrojG+"/"+BrojP+"/"
            +Naziv,{
                method:"POST"
            }).then(p => {
                if(p.ok){
                    alert("Predstava je uspesno dodata!");
                }
                else{
                    console.log("Lose su uneti podaci");
                    alert("Lose uneti podaci ili predstava s tim brojem vec postoji :(");
                }
            })
        }


        