using ConcertBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Context
{
    public class ConcertsDbContext : DbContext
    {
        public ConcertsDbContext(DbContextOptions<ConcertsDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Concert>()
                .HasOne(c => c.Coordinates)
                .WithOne(e => e.Concert)
                .HasForeignKey<Coordinates>(co => co.ConcertId)
                .IsRequired();
        }

        public DbSet<Concert> Concerts { get; set; }
        public DbSet<Classic> Classics { get; set; }
        public DbSet<Party> Parties { get; set; }
        public DbSet<OpenAir> OpenAirs { get; set; }    
        public DbSet<Coordinates> Coordinates { get; set; }
        public DbSet<Promocode> Promocodes { get; set; }
    }
}
