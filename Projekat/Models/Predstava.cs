using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    
    [Table("Predstava")]
    public class Predstava{

        [Key]        
        public int ID { get; set; }

        [Column("Broj Predstave")]
        public int ShowNumber { get; set; }

        [Column("Ime Predstave")]
        [MaxLength(50)]
        public string ShowName { get; set; }

        public Glumacc Glumac { get; set; }
        
    }
}