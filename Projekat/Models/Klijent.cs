using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("Klijent")]
    public class Klijent{

        [Key]
        public int ID { get; set; }

        [Column("Indeks")]
        public int Number { get; set; }

        [Column("Ime")]
        [MaxLength(50)]
        public string Name { get; set; }

        [Column("Prezime")]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Column("Email Klijenta")]
        [MaxLength(50)]
        public string Email { get; set; }

        public Glumacc Glumac { get; set; }
    }
}