import { Glumac } from "./Glumac.js";
import { GlumacJS } from "./GlumacJS.js";

var listaGlumaca = [];
fetch("https://localhost:5001/Glumac/PreuzmiImenaGlumaca")
.then(p => {
    p.json().then(q => {
        q.forEach(glumac => {
            var g = new Glumac(glumac.broj, glumac.ime, glumac.prezime);
            listaGlumaca.push(g);
        });
        console.log(listaGlumaca);
        var g = new GlumacJS(listaGlumaca);
        g.crtaj(document.body);
    })
});





