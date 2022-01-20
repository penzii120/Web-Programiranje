using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("Termin")]
    public class Termin{
        
        [Key]
        public int ID { get; set; }

        [Column("Broj Termina")]
        [Range(1,3)]
        public int Number { get; set; }

        [Column("Naziv Termina")]
        [MaxLength(13)]
        public string Name { get; set; }

        [Column("Vreme")]
        [MaxLength(10)]
        public string Time { get; set; }

        public Glumacc Glumac { get; set; }
    }
}