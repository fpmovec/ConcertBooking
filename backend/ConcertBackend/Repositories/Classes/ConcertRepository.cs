using ConcertBackend.Context;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ConcertBackend.Repositories.Classes
{
    public class ConcertRepository : IConcertRepository
    {
        private readonly ConcertsDbContext _context;
        public ConcertRepository(ConcertsDbContext context)
        {
                _context = context;
        }

        public async Task AddClassicAsync(Classic classic)
        {
             _context.Classics.Add(classic);
            await _context.SaveChangesAsync();
        }

        public async Task<Coordinates?> AddCoordinatesAsync(Coordinates coordinates)
        {
            var concert = _context.Concerts.Find(coordinates.ConcertId);
            if (concert == null) { return null; }

            _context.Coordinates.Add(coordinates);
            await _context.SaveChangesAsync();
            return coordinates;
        }

        public async Task AddOpenAirAsync(OpenAir openAir)
        {
            _context.OpenAirs.Add(openAir);
            await _context.SaveChangesAsync();
        }

        public async Task AddPartyAsync(Party party)
        {
            _context.Parties.Add(party);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteClassicAsync(Classic classic)
        {
            if (classic != null)
               _context.Remove(classic);

            await _context.SaveChangesAsync();
        }

        public async Task DeleteCoordinatesAsync(Coordinates coordinates)
        {
                _context.Remove(coordinates);
                await _context.SaveChangesAsync();
         
        }

        public async Task DeleteOpenAirAsync(OpenAir openAir)
        {
            if (openAir != null)
                _context.Remove(openAir);

            await _context.SaveChangesAsync();
        }

        public async Task DeletePartyAsync(Party party)
        {
            if (party != null)
                _context.Remove(party);

            await _context.SaveChangesAsync();
        }

        public async Task<Classic?> GetClassicAsync(int id)
        {
            return await _context.Classics
                .Where(c => c.Id == id)
                .Include(c => c.Coordinates)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Classic>> GetClassicsAsync()
        {
            return await _context.Classics
                .Include(c => c.Coordinates)
                .ToListAsync();
        }

        public async Task<List<Concert>> GetConcertByCriteriaAsync(string? criteria)
        {
            if (criteria.IsNullOrEmpty())
                return await _context.Concerts.ToListAsync();

           var searchedConcerts = await _context.Concerts
                .Where(c => c.Performer.ToLower().IndexOf(criteria!.Trim().ToLower()) > -1)
                .ToListAsync();
            return searchedConcerts;
        }

        public async Task<Concert> GetConcertByIdAsync(int id)
        {
           Concert? concert = await _context.Concerts.FindAsync(id);

            return concert;
        }

        public async Task<List<Concert>> GetConcertsAsync()
        {
            return await _context.Concerts
                .Include(c => c.Coordinates)
                .ToListAsync();   
        }

        public async Task<Coordinates> GetCoordinatesByConcertIdAsync(int id)
        {
            Coordinates? coordinates = await _context.Coordinates.Where(c => c.ConcertId == id).FirstOrDefaultAsync();
            return coordinates;
        }

        public async Task<OpenAir?> GetOpenAirAsync(int id)
        {
            return await _context.OpenAirs
                 .Where(c => c.Id == id)
                 .Include(co => co.Coordinates)
                 .FirstOrDefaultAsync();
        }

        public async Task<List<OpenAir>> GetOpenAirsAsync()
        {
            return await _context.OpenAirs.ToListAsync();
        }

        public async Task<List<Party>> GetPartiesAsync()
        {
            return await _context.Parties.ToListAsync();
        }

        public async Task<Party?> GetPartyAsync(int id)
        {
            return await _context.Parties
                .Where(c => c.Id == id)
                .Include(co => co.Coordinates)
                .FirstOrDefaultAsync();
        }
    }


}
