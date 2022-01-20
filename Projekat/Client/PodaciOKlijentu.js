export class PodaciOKlijentu{
    constructor(broj, ime, prezime, email){
        this.Broj = broj;
        this.Ime = ime;
        this.Prezime = prezime;
        this.Email = email;
    }

    crtaj(host){

        var tred = document.createElement("tr");
        host.appendChild(tred);

        let img = document.createElement("img");
        img.className = "slicica";
        img.src = "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/openmoji/292/pencil_270f-fe0f.png"

        img.onclick=(ev)=>this.funkcijaMoja(this.Broj);

        var elem = document.createElement("td");
        elem.appendChild(img);
        tred.appendChild(elem);

        elem = document.createElement("td");
        elem.innerHTML = this.Broj;
        tred.appendChild(elem);

        elem = document.createElement("td");
        elem.innerHTML = this.Ime;
        console.log(elem);
        tred.appendChild(elem);

        elem = document.createElement("td");
        elem.innerHTML = this.Prezime;
        console.log(elem);
        tred.appendChild(elem);
        
        elem = document.createElement("td");
        elem.innerHTML = this.Email;
        tred.appendChild(elem);
    }
    funkcijaMoja(broj){
        console.log("Broj Klijentov" + broj);
        localStorage.setItem("Value", broj);
        window.location.href = 'IzmenaK.html';
    }
}