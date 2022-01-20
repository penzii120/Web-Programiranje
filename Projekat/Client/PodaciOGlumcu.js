export class PodaciOGlumcu{
    constructor(broj, ime, prezime, godine, brojdece, 
        brojpredstava){
            this.Broj = broj;
            this.Ime = ime;
            this.Prezime = prezime;
            this.BrojGodina = godine;
            this.BrojDece = brojdece;
            this.BrojPredstava = brojpredstava;
        }
        crtaj(host){
        var tr = document.createElement("tr");
        host.appendChild(tr);

        el = document.createElement("td");

        let img = document.createElement("img");
        img.className = "slicica";
        img.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/292/pencil_270f-fe0f.png"

        tr.id = "blank"
        img.onclick=(ev)=>this.funkcijaMoja(this.Broj);

        el.appendChild(img);
        tr.appendChild(el);

        var el = document.createElement("td");
        el.innerHTML = this.Broj;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.Ime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.Prezime;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.BrojGodina;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.BrojDece;
        tr.appendChild(el);

        el = document.createElement("td");
        el.innerHTML = this.BrojPredstava;
        tr.appendChild(el);



    }
    funkcijaMoja(broj){
        console.log("Citamo Broj" + broj);
        localStorage.setItem("Value", broj);
        window.location.href = 'Izmena.html';
    }
}