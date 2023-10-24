using ConcertBackend.Context;
using ConcertBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Repositories.Realizations.Concerts
{
    public class OpenAirRepository : ConcertRepository<OpenAir>
    {
        public OpenAirRepository(ConcertsDbContext context) : base(context) { }

        protected override DbSet<OpenAir> _db => _context.OpenAirs;
    }
}
