using ConcertBackend.Context;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Repositories.Classes
{
    public class ConcertRepository : IConcertRepository
    {
        private readonly ConcertsDbContext _context;
        public ConcertRepository(ConcertsDbContext context)
        {
                _context = context;
        }
        public async Task<List<Classic>> GetClassics()
        {
            return await _context.Classics.ToListAsync();
        }

        public async Task<Concert> GetConcertById(int id)
        {
           Concert? concert = await _context.Concerts.FindAsync(id);
            return concert;
        }

        public async Task<List<Concert>> GetConcerts()
        {
            return await _context.Concerts.ToListAsync();   
        }

        public async Task<List<OpenAir>> GetOpenAirs()
        {
            return await _context.OpenAirs.ToListAsync();
        }

        public async Task<List<Party>> GetParties()
        {
            return await _context.Parties.ToListAsync();
        }
    }
}
