using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Glumac")]
    public class Glumacc{

        [Key]
        [Column("ID")]
        public int ID { get; set; }


        [Column("Indeks")]
        public int Number { get; set; }

        [Column("Ime")]
        [MaxLength(50)]
        public string Name { get; set; }

        [Column("Prezime")]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Column("Godine")]
        public int Age { get; set; }

        [Column("Broj Dece")]
        public int Children { get; set; }

        [Column("Broj Predstavi")]
        public int NumberOfShows { get; set; }

        [JsonIgnore]
        public List<Predstava> ListaPredstave { get; set; }
        
        [JsonIgnore]
        public List<Klijent> ListaKlijenta { get; set; }

        [JsonIgnore]
        public List<Termin> ListaTermina { get; set; }
        

    }
}