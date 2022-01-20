using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GlumacController : ControllerBase
    {
        public GlumacContext Context { get; set; }
        public GlumacController(GlumacContext context){
            Context = context;
        }

        [Route("PreuzmiImenaGlumaca")]
        [HttpGet]
        public async Task<ActionResult> getImenaGlumaca(){
            return Ok(await Context.Glumci.Select(p => new{
                Broj = p.Number,
                Ime = p.Name,
                Prezime = p.LastName
            }).ToListAsync());
        }

        [Route("PreuzmiGlumca/{number}")]
        [HttpGet]
        public async Task<ActionResult> getGlumca(int number){
            var glumci = Context.Glumci
                .Include(p => p.ListaPredstave)
                .Include(p => p.ListaKlijenta)
                .Include(p => p.ListaTermina);

            var glumac = await glumci.ToListAsync();

            return Ok(glumac.Where(m => m.Number == number).Select(p => new {
                Broj = p.Number,
                Ime = p.Name,
                Prezime = p.LastName,
                Godine = p.Age,
                BrojDece = p.Children,
                BrojPredstave = p.NumberOfShows,
                Predstave = p.ListaPredstave.Select(q => new{
                    ImePredstave = q.ShowName,
                    BrojPredstave = q.ShowNumber
                }),
                Klijenti = p.ListaKlijenta.Select(q => new{
                    ImeKlijenta = q.Name,
                    PrezimeKlijenta = q.LastName,
                    EmailKlijenta = q.Email,
                    BrojKlijenta = q.Number
                }),
                Termini = p.ListaTermina.Select(q => new{
                    ImeTermina = q.Name,
                    VremeTermina = q.Time,
                    BrojTermina = q.Number
                })
            }));
        }
        
        
        [Route("PreuzmiTerminaGlumca/{idGlumca}")]
        [HttpGet]

        public async Task<ActionResult> getTermineGlumca(int idGlumca){
            return Ok(await Context.Termini.Where(p => p.Glumac.Number == idGlumca).Select(p => new{
                Broj = p.Number,
                NazivTermina = p.Name,
                Vreme = p.Time
            }).ToListAsync());
        }
        

        [Route("PreuzmiPredstavu/{number}")]
        [HttpGet]
        public async Task<ActionResult> PreuzmiPredstavu(int number){
            return Ok(await Context.Predstave.Where(p => p.ShowNumber == number).Select(p => new{
                Naziv = p.ShowName
            }).ToListAsync());
        }
       
       
        [Route("PreuzmiPredstaveGlumca/{idGlumca}")]
        [HttpGet]
        public async Task<ActionResult> getPredstaveGlumca(int idGlumca){
            return Ok(await Context.Predstave.Where(p => p.Glumac.Number == idGlumca).Select(p => new{
                Broj = p.ShowNumber,
                Naziv = p.ShowName
            }).ToListAsync());
        }
        
    
        [Route("getKlijenta/{number}")]
        [HttpGet]
        public async Task<ActionResult> getKlijenta(int number){
            return Ok(await Context.Klijenti.Where(p => p.Number == number).Select(p => new{
                Broj = p.Number,
                Ime = p.Name,
                Prezime = p.LastName,
                Email = p.Email
            }).ToListAsync());
        }


        [Route("getKlijenteGlumca/{idGlumca}")]
        [HttpGet]

        public async Task<ActionResult> getKlijenteGlumca(int idGlumca){
            var glumci = Context.Glumci;
            var glumac = await glumci.ToListAsync();

            var klijenti = Context.Klijenti;
            var klijent = await klijenti.ToListAsync();
            return Ok(klijent.Where(p => p.Glumac.Number == idGlumca).Select(p => new{
                    Broj = p.Number,
                    Ime = p.Name,
                    Prezime = p.LastName,
                    Email = p.Email
            }));
        }
        
        [Route("DodajGlumca/{broj}/{ime}/{prezime}/{godine}/{brojdece}/{brojpredstava}")]
        [HttpPost]

        public async Task<ActionResult> DodajGlumca(int broj, string ime, string prezime, int godine, int brojdece, int brojpredstava){
            
            var postojeciGlumac = await Context.Glumci.Where(p => p.Number == broj).FirstOrDefaultAsync();
            if(postojeciGlumac != null)
                return BadRequest("Glumac s tim brojem vec postoji");
            try{
                Glumacc g = new Glumacc();
                g.Number = broj;
                g.Name = ime;
                g.LastName = prezime;
                g.Age = godine;
                g.Children = brojdece;
                g.NumberOfShows = brojpredstava;

                Context.Glumci.Add(g);
                await Context.SaveChangesAsync();
                return Ok("Glumac je uspesno dodat!");
            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
        
        
        [Route("DodajPredstavu/{numberGlumca}/{number}/{name}")]
        [HttpPost]

        public async Task<ActionResult> addPredstava(int numberGlumca, int number, string name){
            var predstava = await Context.Predstave.Where(p => p.ShowNumber == number).FirstOrDefaultAsync();
            if(predstava != null)
                return BadRequest("Vec postoji predstava s tim brojem");
            try{
                var glumac = await Context.Glumci.Where(p => p.Number == numberGlumca).FirstOrDefaultAsync();
                if(glumac != null){
                    Predstava p = new Predstava();
                    p.Glumac = glumac;
                    p.ShowName = name;
                    p.ShowNumber = number;
                    Context.Predstave.Add(p);
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno upisana predstava! {p.ShowNumber}");
                }
                else
                    return BadRequest("Nije pronadjen glumac");

            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
        [Route("DodajKlijenta/{numberGlumca}/{number}/{name}/{lastname}/{email}")]
        [HttpPost]

        public async Task<ActionResult> addKlijenta(int numberGlumca, int number, string name, string lastname, string email){
            var glumac = await Context.Glumci.Where(p => p.Number == numberGlumca).FirstOrDefaultAsync();
            if(glumac == null)
                return BadRequest("Glumac ne postoji");
            var klijent = await Context.Klijenti.Where(p => p.Number == number).FirstOrDefaultAsync();
            if(klijent != null)
                return BadRequest("Klijent s tim brojem vec postoji");
            try{
                Klijent k = new Klijent();
                k.Number = number;
                k.Name = name;
                k.LastName = lastname;
                k.Email = email;
                k.Glumac = glumac;
                Context.Klijenti.Add(k);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno upisan klijent! {k.Number}");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        [Route("DodajTermin/{numberGlumca}/{number}/{name}/{time}")]
        [HttpPost]
        public async Task<ActionResult> addTermin(int numberGlumca, int number, string name, string time){
            var glumac = await Context.Glumci.Where(p => p.Number == numberGlumca).FirstOrDefaultAsync();
            if(glumac == null)
                return BadRequest("Glumac ne postoji");
            else{
                var termin = await Context.Termini.Where(p => p.Number == number).FirstOrDefaultAsync();
                if(termin != null)
                    return BadRequest("Termin s tim brojem vec postoji");
                try{
                    Termin t = new Termin();
                    t.Glumac = glumac;
                    t.Number = number;
                    t.Name = name;
                    t.Time = time;
                    Context.Termini.Add(t);
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno dodat termin! {glumac.Number}");
                }
                catch(Exception ex){
                    return BadRequest(ex.Message);
                }
            }

        }
    

        [Route("IzmeniGlumca/{numberGlumca}/{age}/{children}/{numbofshows}")]
        [HttpPut]
        public async Task<ActionResult> changeGlumca(int numberGlumca, int age, int children, int numbofshows){
            var postojeciGlumac = await Context.Glumci.Where(p => p.Number == numberGlumca).FirstOrDefaultAsync();

            if(postojeciGlumac == null){
                return BadRequest("Glumac ne postoji :(");
            }
            try{
                postojeciGlumac.Number = numberGlumca;
                // if(postojeciGlumac.Age != age && postojeciGlumac.Age < age)
                   postojeciGlumac.Age = age;
                // if(postojeciGlumac.Children != children)
                  postojeciGlumac.Children = children;
                // if(postojeciGlumac.NumberOfShows != numbofshows)
                     postojeciGlumac.NumberOfShows = numbofshows;

                Context.Glumci.Update(postojeciGlumac);
                await Context.SaveChangesAsync();
                return Ok("Glumac je uspesno izmenjen");
                //return getJednogGlumca(postojeciGlumac.ID);

            }catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        [Route("IzmeniTermin/{number}/{name}/{time}")]
        [HttpPut]
        public async Task<ActionResult> changeTermin(/*int idGlumca*/int number, string name, string time){

            //var glumac = await Context.Glumci.FindAsync(idGlumca);
            // if(glumac == null)
            //     return BadRequest("Nije pronadjen glumac");
            var termin = await Context.Termini.Where(p => p.Number == number).FirstOrDefaultAsync();
            if(termin == null)
                return BadRequest("Nije pronadjen termin");
            try{
                termin.Name = name;
                termin.Number = number;
                termin.Time = time;

                Context.Termini.Update(termin);
                await Context.SaveChangesAsync();
                return Ok("Termin je uspesno izmenjen!");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }    
        }

        [Route("IzmeniPredstavu/{number}/{name}")]
        [HttpPut]
        public async Task<ActionResult> changePredstava(int number, string name){
            var postojecaPredstava = await Context.Predstave.Where(p => p.ShowNumber == number).FirstOrDefaultAsync();
            if(postojecaPredstava == null)
                return BadRequest("Predstava ne postoji:(");
            try{
                postojecaPredstava.ShowName = name;
                //postojecaPredstava.ShowNumber = Convert.ToInt32(number);
                Context.Predstave.Update(postojecaPredstava);
                await Context.SaveChangesAsync();
                return Ok("Predstava je uspesno izmenjena!");
            }
            catch(Exception ex){
                return BadRequest("Neuspesna izmena predstave. :(");
            }

        }
    
        [Route("PromeniKlijenta/{number}/{name}/{lastname}/{email}")]
        [HttpPut]

        public async Task<ActionResult> changeKlijenta(int number, string name, string lastname, string email){
            var klijent = await Context.Klijenti.Where(p => p.Number == number).FirstOrDefaultAsync();
            if(klijent == null)
                return BadRequest("Klijent ne postoji.");
            try{
                klijent.Number = Convert.ToInt32(number);
                klijent.Name = name;
                klijent.LastName = lastname;
                klijent.Email = email;
                
                Context.Klijenti.Update(klijent);
                await Context.SaveChangesAsync();
                return Ok("Klijent je uspesno izmenjen");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
        [Route("ObrisiGlumca/{numberGlumca}")]
        [HttpDelete]

        public async Task<ActionResult> deleteGlumca(int numberGlumca){
            var postojeciGlumac = await Context.Glumci.Where(p => p.Number == numberGlumca).FirstOrDefaultAsync();
            if(postojeciGlumac == null)
                return BadRequest("Glumac ne postoji");
            try{
                int number = postojeciGlumac.Number;
                Context.Glumci.Remove(postojeciGlumac);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno smo obrisali glumca sa brojem {number}");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        [Route("ObrisiTermin/{numberTermin}")]
        [HttpDelete]

        public async Task<ActionResult> deleteTermin(int numberTermin){
            var termin = await Context.Termini.Where(p => p.Number == numberTermin).FirstOrDefaultAsync();
            if(termin == null)
                return BadRequest("Termin ne postoji");
            try{
                Context.Termini.Remove(termin);
                await Context.SaveChangesAsync();
                return Ok("Termin poslat u pakao :3");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        [Route("ObrisiPredstavu/{numberPredstava}")]
        [HttpDelete]

        public async Task<ActionResult> deletePredstava(int numberPredstava){
            var predstava = await Context.Predstave.Where(p => p.ShowNumber == numberPredstava).FirstOrDefaultAsync();
            if(predstava == null)
                return BadRequest("Termin ne postoji");
            try{
                int number = predstava.ShowNumber;
                Context.Predstave.Remove(predstava);
                await Context.SaveChangesAsync();
                return Ok($"Predstava s brojem {number} obrisan uspesno!");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
        [Route("ObrisiKlijenta/{numberTermin}")]
        [HttpDelete]

        public async Task<ActionResult> deleteKlijenta(int numberTermin){
            var klijent = await Context.Klijenti.Where(p => p.Number == numberTermin).FirstOrDefaultAsync();
            if(klijent == null)
                return BadRequest("Termin ne postoji");
            try{
                int number = klijent.Number;
                Context.Klijenti.Remove(klijent);
                await Context.SaveChangesAsync();
                return Ok($"Predstava s brojem {number} obrisan uspesno!");
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }
    }
}   
