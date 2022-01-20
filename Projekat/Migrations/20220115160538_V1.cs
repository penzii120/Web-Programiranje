using Microsoft.EntityFrameworkCore.Migrations;

namespace Projekat.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Glumac",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Indeks = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Godine = table.Column<int>(type: "int", nullable: false),
                    BrojDece = table.Column<int>(name: "Broj Dece", type: "int", nullable: false),
                    BrojPredstavi = table.Column<int>(name: "Broj Predstavi", type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Glumac", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Klijent",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Indeks = table.Column<int>(type: "int", nullable: false),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    EmailKlijenta = table.Column<string>(name: "Email Klijenta", type: "nvarchar(50)", maxLength: 50, nullable: true),
                    GlumacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klijent", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Klijent_Glumac_GlumacID",
                        column: x => x.GlumacID,
                        principalTable: "Glumac",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Predstava",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojPredstave = table.Column<int>(name: "Broj Predstave", type: "int", nullable: false),
                    ImePredstave = table.Column<string>(name: "Ime Predstave", type: "nvarchar(50)", maxLength: 50, nullable: true),
                    GlumacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Predstava", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Predstava_Glumac_GlumacID",
                        column: x => x.GlumacID,
                        principalTable: "Glumac",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Termin",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrojTermina = table.Column<int>(name: "Broj Termina", type: "int", nullable: false),
                    NazivTermina = table.Column<string>(name: "Naziv Termina", type: "nvarchar(13)", maxLength: 13, nullable: true),
                    Vreme = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    GlumacID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Termin", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Termin_Glumac_GlumacID",
                        column: x => x.GlumacID,
                        principalTable: "Glumac",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Klijent_GlumacID",
                table: "Klijent",
                column: "GlumacID");

            migrationBuilder.CreateIndex(
                name: "IX_Predstava_GlumacID",
                table: "Predstava",
                column: "GlumacID");

            migrationBuilder.CreateIndex(
                name: "IX_Termin_GlumacID",
                table: "Termin",
                column: "GlumacID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Klijent");

            migrationBuilder.DropTable(
                name: "Predstava");

            migrationBuilder.DropTable(
                name: "Termin");

            migrationBuilder.DropTable(
                name: "Glumac");
        }
    }
}
