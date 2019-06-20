using Microsoft.EntityFrameworkCore;

namespace Portfolio.Models
{
    public class ArchyDevContext : DbContext
    {
        public ArchyDevContext(DbContextOptions<ArchyDevContext> options)
            : base(options)
        {
            //
        }

        public DbSet<ProjectItem> ProjectItem { get; set; }
    }
}