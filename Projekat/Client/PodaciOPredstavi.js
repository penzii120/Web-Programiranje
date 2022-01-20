export class PodaciOPredstavi{
    constructor(broj, naziv){
        this.Broj = broj;
        this.Naziv = naziv;
    }
    crtaj(host){
        let tr = document.createElement("tr");
        host.appendChild(tr);

        var td = document.createElement("td");

        let img = document.createElement("img");
        img.className = "slicica";
        img.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/292/pencil_270f-fe0f.png"
        
        img.onclick=(ev)=>this.funkcijaMoja(this.Broj);

        td.appendChild(img);
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = this.Broj;
        tr.appendChild(td);

        td = document.createElement("td");
        td.innerHTML = this.Naziv;
        tr.appendChild(td);
    }
    funkcijaMoja(broj){
        console.log("Citamo Broj" + broj);
        localStorage.setItem("Value", broj);
        window.location.href = 'IzmenaP.html';
    }
}