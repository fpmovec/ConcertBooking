using ConcertBackend.Context;
using ConcertBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Repositories.Realizations.Concerts
{
    public class CommonRepository : ConcertRepository<Concert>
    {
        public CommonRepository(ConcertsDbContext context) : base(context) { }

        protected override DbSet<Concert> _db => _context.Concerts;
    }
}
