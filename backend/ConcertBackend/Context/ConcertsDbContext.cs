using ConcertBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Context
{
    public class ConcertsDbContext : DbContext
    {
        private readonly IConfiguration _configuration;
        public ConcertsDbContext(DbContextOptions<ConcertsDbContext> options, IConfiguration config) : base(options) { 
        _configuration = config;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Concert>()
                .HasMany(c => c.Bookings)
                .WithOne()
                .HasForeignKey(c => c.ConcertId);

            modelBuilder.Entity<Concert>()
                .HasMany(c => c.Orders)
                .WithOne()
                .HasForeignKey(c => c.ConcertId);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Concert> Concerts { get; set; }
        public DbSet<Classic> Classics { get; set; }
        public DbSet<Party> Parties { get; set; }
        public DbSet<OpenAir> OpenAirs { get; set; }    
        //public DbSet<Coordinates> Coordinates { get; set; }
        public DbSet<Promocode> Promocodes { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
