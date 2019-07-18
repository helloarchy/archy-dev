using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Portfolio.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProjectItem",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    NameNormalised = table.Column<string>(nullable: true),
                    ShortDescription = table.Column<string>(nullable: true),
                    ProgrammingLanguages = table.Column<string>(nullable: true),
                    KeyWords = table.Column<string>(nullable: true),
                    ThumbnailImage = table.Column<string>(nullable: true),
                    IsVisible = table.Column<bool>(nullable: false),
                    Repository = table.Column<string>(nullable: true),
                    Controller = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectItem", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProjectItem");
        }
    }
}
