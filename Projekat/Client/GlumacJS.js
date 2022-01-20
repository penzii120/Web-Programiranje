import { Glumac } from "./Glumac.js";
import { PodaciOGlumcu } from "./PodaciOGlumcu.js";
import { PodaciOKlijentu } from "./PodaciOKlijentu.js";
import { PodaciOTerminu } from "./PodaciOTerminu.js";
import { PodaciOPredstavi } from "./PodaciOPredstavi.js";

export class GlumacJS{
    constructor(listaGlumaca){
        this.listaGlumaca = listaGlumaca;
        this.container = null;
    }
    crtaj(host){
        this.container = document.createElement("div");
        this.container.className = "glavniDiv";
        host.appendChild(this.container);


        let containerForma = document.createElement("div");
        containerForma.className = "Forma";
        this.container.appendChild(containerForma);

        this.crtajFormu(containerForma);
    }
    crtajFormu(host){
        let l = document.createElement("label");
        l.innerHTML = "Glumci";
        host.appendChild(l);

        localStorage.removeItem("Value");

        let se = document.createElement("select");
        se.id = "select";
        host.appendChild(se);
        
        let op;
        this.listaGlumaca.forEach(element => {
            op = document.createElement("option");
            op.innerHTML = element.naziv + " " + element.prezime;
            op.value = element.id;
            se.appendChild(op);
        });

        let btn = document.createElement("button");
        btn.innerHTML = "Pretrazi";
        btn.id = "Pretrazi";
        btn.onclick=(ev)=>this.pretrazi();
        host.appendChild(btn);


        let btn3 = document.createElement("button");
        btn3.id = "Obrisi"
        btn3.innerHTML = "Obrisi";
        btn3.onclick=(ev)=>this.ObrisiGlumca();
        host.appendChild(btn3);


        let btn5 = document.createElement("button");
        btn5.id = "Upisi"
        btn5.innerHTML = "Upisi";
        btn5.onclick=(ev)=>this.UpisiGlumca(host);
        host.appendChild(btn5);

    }
    crtajPrikazGlumac(host){ 
        let containerPrikaz = document.createElement("div");
        containerPrikaz.id = "PrikazGlumac"
        host.appendChild(containerPrikaz);

        var tabela = document.createElement("table");
        tabela.className = "tabelaGlumac";
        containerPrikaz.appendChild(tabela);

        var thead = document.createElement("thead");
        tabela.appendChild(thead);

        var tr = document.createElement("tr");
        thead.appendChild(tr);

        var tbody = document.createElement("tbody");
        tbody.className = "tbodyGlumac";
        tabela.appendChild(tbody);

        let th;
        let niz = ["", "Broj", "Ime", "Prezime", "Godine", "Broj Dece", "Broj Predstave"];
        niz.forEach(el => {
            th = document.createElement("th");
            th.innerHTML = el;
            tr.appendChild(th);
        })

    }
    crtajPrikazKlijent(host){
        let containerPrikaz = document.createElement("div");
        containerPrikaz.id = "PrikazKlijent"
        host.appendChild(containerPrikaz);

        // let h1 = document.createElement("h3");
        // h1.id = "h3Klijent"
        // h1.innerHTML = "Klijent";
        // containerPrikaz.appendChild(h1);

        var tabela = document.createElement("table");
        tabela.className = "tabelaKlijent";
        containerPrikaz.appendChild(tabela);

        var thead = document.createElement("thead");
        tabela.appendChild(thead);

        var tr = document.createElement("tr");
        thead.appendChild(tr);

        var tbody = document.createElement("tbody");
        tbody.className = "tbodyKlijent";
        tabela.appendChild(tbody);

        let th;
        let niz = ["Broj", "Ime", "Prezime", "Email"];
        th = document.createElement("th");
        let img = document.createElement("img");
        img.className = "slicica";
        img.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F30-307809_plus-sign-clip-art-free-vector-in-open.png&f=1&nofb=1";
        img.onclick=(ev)=>this.addKlijent();
        th.appendChild(img);
        tr.appendChild(th);
        niz.forEach(el => {
            th = document.createElement("th");
            th.innerHTML = el;
            tr.appendChild(th);
        })
    }
    crtajPrikazTermin(host){
        let containerPrikaz = document.createElement("div");
        containerPrikaz.id = "PrikazTermin"
        host.appendChild(containerPrikaz);


        // let h1 = document.createElement("h3");
        // h1.id = "h3Termin"
        // h1.innerHTML = "Termin";
        // containerPrikaz.appendChild(h1);

        var tabela = document.createElement("table");
        tabela.className = "tabelaTermin";
        containerPrikaz.appendChild(tabela);

        var thead = document.createElement("thead");
        tabela.appendChild(thead);

        var tr = document.createElement("tr");
        thead.appendChild(tr);

        var tbody = document.createElement("tbody");
        tbody.className = "tbodyTermin";
        tabela.appendChild(tbody);

        let th;
        let niz = ["Broj", "Naziv Termina", "Vreme"];
        th = document.createElement("th");
        let img = document.createElement("img");
        img.className = "slicica";
        img.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F30-307809_plus-sign-clip-art-free-vector-in-open.png&f=1&nofb=1";
        img.setAttribute("onclick", "location.href = `DodajT.html`")
       
        th.appendChild(img);
        tr.appendChild(th);
        niz.forEach(el => {
            th = document.createElement("th");
            th.innerHTML = el;
            tr.appendChild(th);
        })
    }
    crtajPrikazPredstava(host){
        let containerPrikaz = document.createElement("div");
        containerPrikaz.id = "PrikazPredstava";
        host.appendChild(containerPrikaz);

        // let h3 = document.createElement("h3");
        // h3.id = "h3Predstava";
        // h3.innerHTML = "Predstava";
        // containerPrikaz.appendChild(h3);

        let tabela = document.createElement("table");
        tabela.className = "tabelaPredstava";
        containerPrikaz.appendChild(tabela);

        let thead = document.createElement("thead");
        tabela.appendChild(thead);

        let tr = document.createElement("tr");
        thead.appendChild(tr);

        let tbody = document.createElement("tbody");
        tbody.className = "tbodyPredstava";
        tabela.appendChild(tbody);

        let th;
        let niz = ["Broj", "Naziv Predstave"];
        th = document.createElement("th");
        let img = document.createElement("img");
        img.className = "slicica";
        img.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.clipartkey.com%2Fmpngs%2Fm%2F30-307809_plus-sign-clip-art-free-vector-in-open.png&f=1&nofb=1";
        img.setAttribute("onclick", "location.href = `DodajP.html`");
        th.appendChild(img);
        tr.appendChild(th);
        niz.forEach(el => {
            th = document.createElement("th");
            th.innerHTML = el;
            tr.appendChild(th);
        })
        let divImg = document.createElement("div");
        divImg.id = "divIMG";
        this.container.appendChild(divImg)
    }
    restart(){
        let btn = document.getElementById("Pretrazi");
        //btn.disabled = false;
        console.log(document.getElementById("PrikazGlumac"));
        let doc = document.getElementById("PrikazGlumac");
        if(doc != null)
            this.container.removeChild(doc);
        let doc2 = document.getElementById("PrikazKlijent");
        if(doc2 != null)
            this.container.removeChild(doc2);
        let doc3 = document.getElementById("PrikazTermin");
        if(doc3 != null){
            this.container.removeChild(doc3);
        }
        let doc4 = document.getElementById("PrikazPredstava");
        if(doc4 != null){
            this.container.removeChild(doc4);
        }
        let doc5 = document.getElementById("divIMG");
        if(doc5 != null){
            this.container.removeChild(doc5);
        }  
        //let btn2 = document.getElementById("Restart");
        //btn2.disabled = true;


        var iframee = document.getElementById("iframe");
        var roditelj;
        if(iframee != null)
            roditelj = iframee.parentNode;
        if(roditelj != null){
            roditelj.removeChild(iframee);
            let cont = document.querySelector(".Forma");
            cont.removeChild(document.getElementById("Otkazi"));
        }
        // this.container.removeChild(document.getElementById("table3"));
        // //this.crtajTabeluGlumac();
    }
    removeTable(){
        let btn = document.getElementById("Pretrazi");
        //btn.disabled = false;
        console.log(document.getElementById("PrikazGlumac"));
        let doc = document.getElementById("PrikazGlumac");
        if(doc != null)
            this.container.removeChild(doc);
        let doc2 = document.getElementById("PrikazKlijent");
        if(doc2 != null)
            this.container.removeChild(doc2);
        let doc3 = document.getElementById("PrikazTermin");
        if(doc3 != null){
            this.container.removeChild(doc3);
        }
        let doc4 = document.getElementById("PrikazPredstava");
        if(doc4 != null){
            this.container.removeChild(doc4);
        }
        let doc5 = document.getElementById("divIMG");
        if(doc5 != null){
            this.container.removeChild(doc5);
        }  
    }
    removeFrame(){
        var iframee = document.getElementById("iframe");
        var roditelj;
        if(iframee != null)
            roditelj = iframee.parentNode;
        if(roditelj != null){
            roditelj.removeChild(iframee);
            let cont = document.querySelector(".Forma");
            cont.removeChild(document.getElementById("Otkazi"));
        }
    }
    pretrazi(){ 
        this.removeTable();

        this.crtajPrikazGlumac(this.container);
        this.crtajPrikazKlijent(this.container);
        this.crtajPrikazTermin(this.container);
        this.crtajPrikazPredstava(this.container);

        let optionEl = this.container.querySelector("select");
        let glumacNumber = optionEl.options[optionEl.selectedIndex];
        let value = glumacNumber.value;

        let div = document.getElementById("divIMG");
        let img = document.createElement("img");
        img.id = "slika"

        console.log("Broj Glumca je: " + glumacNumber.value);
        this.ucitajGlumca(glumacNumber.value);

        let btn = document.getElementById("Pretrazi");
        let btn2 = document.getElementById("Restart");
    }
    ucitajGlumca(glumacNumber){
        
        let arr = [glumacNumber];
        fetch("https://localhost:5001/Glumac/PreuzmiGlumca/"+ glumacNumber,
        {
            method:"GET"
        }).then(p => {
            if(p.ok){
                p.json().then(data => {
                    let teloTabele = document.querySelector(".tbodyGlumac");
                    data.forEach(s => {
                        var Glumac = new PodaciOGlumcu(s.broj, s.ime, s.prezime, 
                            s.godine, s.brojDece, s.brojPredstave);
                        Glumac.crtaj(teloTabele);
                    })
                })
            }
            else{
                console.log("Losi podaci");
            }
        })
        if(1){
            fetch("https://localhost:5001/Glumac/getKlijenteGlumca/"+ glumacNumber,{
                method:"GET"
            }).then(p => {
                if(p.ok){
                    p.json().then(data => {
                        let teloTabele = document.querySelector(".tbodyKlijent");
                        data.forEach(k => {
                            console.log(k.ime);
                            console.log(k.prezime);
                            var Klijent = new PodaciOKlijentu(k.broj, k.ime,   k.prezime, k.email);
                            Klijent.crtaj(teloTabele);
                        })
                    })
                }
                else{
                    console.log("Losi podaci");
                }
            });
        }
        fetch("https://localhost:5001/Glumac/PreuzmiTerminaGlumca/"+ glumacNumber,{
            method:"GET"
        }).then(p => {
            if(p.ok)
                p.json().then(data => {
                    let teloTabele = document.querySelector(".tbodyTermin");
                    data.forEach(t => {
                        console.log("Podaci Termina" + t);
                        var Termin = new PodaciOTerminu(t.broj, t.nazivTermina, t.vreme);
                        Termin.crtaj(teloTabele);
                    })
                })
        })
        fetch("https://localhost:5001/Glumac/PreuzmiPredstaveGlumca/" + glumacNumber,{
            method:"GET"
        }).then(p => {
            if(p.ok){
                p.json().then(data => {
                    let teloTabele = document.querySelector(".tbodyPredstava");
                    data.forEach(p => {
                        console.log(p);
                        var Predstava = new PodaciOPredstavi(p.broj, p.naziv);
                        Predstava.crtaj(teloTabele);
                    })
                })
            }
        })
    }
    UpisiGlumca(host){
        this.removeTable();
        this.removeFrame();
        let iframe = document.createElement("iframe");
        iframe.id = "iframe";
        iframe.setAttribute("src", "Glumac.html");
        iframe.style.width = "100%";
        iframe.style.height = "230px";
        host.appendChild(iframe);
        let btn = document.createElement("button");
        btn.innerHTML = "Otkazi Dodavanje";
        btn.id = "Otkazi";
        host.appendChild(btn);
        let ev;
        btn.onclick=(ev)=function(){
            let roditelj = iframe.parentNode;
            roditelj.removeChild(iframe);
            host.removeChild(btn);
        }


    }
    ObrisiGlumca(){

        
        let optionEl = this.container.querySelector("select");
        let glumacNumber = optionEl.options[optionEl.selectedIndex];
        let value = glumacNumber.value;

        console.log("VALUE" + glumacNumber.value);

        fetch("https://localhost:5001/Glumac/PreuzmiPredstaveGlumca/" + value,{
            method:"GET"
        }).then(p => {
            if(p.ok){
                p.json().then(data => {
                    data.forEach(p => {
                        fetch("https://localhost:5001/Glumac/ObrisiPredstavu/" + p.broj,{
                            method:"DELETE"
                        }).then(q => {
                            console.log("Obrisali smo uspesno predstavu");
                        })
                    })
                })
            }
        })
        fetch("https://localhost:5001/Glumac/getKlijenteGlumca/"+ value,{
            method:"GET"
        }).then(p => {
            if(p.ok){
                p.json().then(data => {
                    data.forEach(k => {
                        fetch("https://localhost:5001/Glumac/ObrisiKlijenta/" + k.broj,{
                            method:"DELETE"
                        }).then(q => {
                            console.log("Obrisali smo uspesno klijenta");
                        })
                    })
                })
            }
            else{
                console.log("Losi podaci");
            }
        });
        fetch("https://localhost:5001/Glumac/PreuzmiTerminaGlumca/"+ value,{
            method:"GET"
        }).then(p => {
            if(p.ok)
                p.json().then(data => {
                    data.forEach(t => {
                        console.log("Ovo je t " + t);
                        fetch("https://localhost:5001/Glumac/ObrisiTermin/" + t.broj,{
                            method:"DELETE"
                        }).then(q => {
                            console.log("Uspesno smo obrisali klijenta");
                        })
                    })
                })
        })
        fetch("https://localhost:5001/Glumac/PreuzmiGlumca/"+ value,
        {
            method:"GET"
        }).then(p => {
            if(p.ok){
                p.json().then(data => {
                    data.forEach(s => {
                        fetch("https://localhost:5001/Glumac/ObrisiGlumca/" + s.broj,{
                            method:"DELETE"
                        }).then(q =>{
                            console.log("Uspesno smo obrisali glumca");
                        })

                    })
                })
            }
            else{
                console.log("Losi podaci");
            }
        })
        this.restart();
        let se = document.getElementById("select");
        se.remove(se.selectedIndex);

    }
    addKlijent(){
        location.href = "DodajK.html";
    }
}