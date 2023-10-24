using ConcertBackend.Context;
using ConcertBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Repositories.Realizations.Concerts
{
    public class ClassicRepository : ConcertRepository<Classic>
    {
        public ClassicRepository(ConcertsDbContext context): base(context) { }

        protected override DbSet<Classic> _db => _context.Classics;
    }
}
