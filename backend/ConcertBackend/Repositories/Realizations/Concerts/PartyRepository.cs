using ConcertBackend.Context;
using ConcertBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Repositories.Realizations.Concerts
{
    public class PartyRepository : ConcertRepository<Party>
    {
        public PartyRepository(ConcertsDbContext context) : base(context) { }

        protected override DbSet<Party> _db => _context.Parties;
    }
}
