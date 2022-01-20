
import { PodaciOGlumcu } from "./PodaciOGlumcu.js";
        
    var div = document.createElement("div");
    div.id = "glavniDIV";
    
    var div1 = document.createElement("div");
    div1.id = "divGlumac";
    
    var div2 = document.createElement("div");
    div2.id = "divKlijent";
    
    var div3 = document.createElement("div");
    div3.id = "divTermin";
    
    var div4 = document.createElement("div");
    div4.id = "divPredstava";
    
    
    document.body.appendChild(div);
    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(div3);
    div.appendChild(div4);
    
        var nizGlumac = ["BrojGlumca", "ImeGlumca", "PrezimeGlumca", "Godine", "BrojDece", "BrojPredstava"];
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
            divRed.appendChild(label);
            divRed.appendChild(textbox);
            div1.appendChild(divRed);
        })
        divRed.id = "divRed";
    
    
    var divButton = document.createElement("div");
    divButton.id = "divButton";
    document.body.appendChild(divButton);
    
    var buttonPrikaz = document.createElement("button");
    buttonPrikaz.id = "buttonPrikaz";
    buttonPrikaz.innerHTML = "Potvrdi";
    divButton.appendChild(buttonPrikaz);
    

    buttonPrikaz.onclick=(ev)=function(){
        let BrojG = document.getElementById("BrojGlumca").value;
        let ImeG = document.getElementById("ImeGlumca").value;
        let PrezimeG = document.getElementById("PrezimeGlumca").value;
        let Godine = document.getElementById("Godine").value;
        let Deca = document.getElementById("BrojDece").value;
        let Predstave = document.getElementById("BrojPredstava").value;
    
        
        if(BrojG === ""  || ImeG === "" || PrezimeG === "" 
        || Godine === "" || Deca === "" || Predstave === ""
        /*|| BrojK === ""  || ImeK === "" || PrezimeK === "" || Email === ""
        || NazivT === "" || Vreme === ""
        || BrojP === ""  || NazivP === ""*/){
            alert("Morate Popuniti podatke");
            return;
        }
        fetch("https://localhost:5001/Glumac/DodajGlumca/"+BrojG+"/"+ImeG+"/"
        +PrezimeG+"/"+Godine+"/"+Deca+"/"+Predstave,
        {
            method:"POST"
        }).then(p => {
            if(p.ok){
                alert("Glumac je uspesno dodat!");
                let BrojG = document.getElementById("BrojGlumca");
                let ImeG = document.getElementById("ImeGlumca");
                let PrezimeG = document.getElementById("PrezimeGlumca");
                let Godine = document.getElementById("Godine");
                let Deca = document.getElementById("BrojDece");
                let Predstave = document.getElementById("BrojPredstava");
            
                BrojG.value = "";
                ImeG.value = "";
                PrezimeG.value = "";
                Godine.value = "";
                Deca.value = "";
                Predstave.value = "";
            }
            else{
                alert("Lose uneti podaci ili glumac s tim brojem vec postoji");
            }
        })
    }


