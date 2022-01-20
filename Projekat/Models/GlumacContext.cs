using Microsoft.EntityFrameworkCore;

namespace Models{
    public class GlumacContext : DbContext{
        public DbSet<Glumacc> Glumci { get; set; }
        
        public DbSet<Klijent> Klijenti { get; set; }

        public DbSet<Termin> Termini { get; set; }

        public DbSet<Predstava> Predstave { get; set; }

        public GlumacContext(DbContextOptions options) : base(options){
            
        }
    }
}