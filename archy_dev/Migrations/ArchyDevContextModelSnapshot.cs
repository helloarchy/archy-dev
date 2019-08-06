﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Portfolio.Models;

namespace Portfolio.Migrations
{
    [DbContext(typeof(ArchyDevContext))]
    partial class ArchyDevContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Portfolio.Models.ProjectItem", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Controller");

                    b.Property<bool>("IsVisible");

                    b.Property<string>("KeyWords");

                    b.Property<string>("Name");

                    b.Property<string>("NameNormalised");

                    b.Property<string>("ProgrammingLanguages");

                    b.Property<string>("Repository");

                    b.Property<string>("ShortDescription");

                    b.Property<string>("ThumbnailImage");

                    b.HasKey("ID");

                    b.ToTable("ProjectItem");
                });
#pragma warning restore 612, 618
        }
    }
}