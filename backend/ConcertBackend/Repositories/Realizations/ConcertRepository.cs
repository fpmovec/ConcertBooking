using ConcertBackend.Context;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ConcertBackend.Repositories.Classes
{
    public class ConcertRepository 
    {
        private readonly ConcertsDbContext _context;
        public ConcertRepository(ConcertsDbContext context)
        {
                _context = context;
        }

        public async Task AddConcertAsync(Concert concert)
        {
           _context.Set<Concert>().Add(concert);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteConcertAsync(Concert concert)
        {
            _context.Remove(concert);
            await _context.SaveChangesAsync();
        }


        public async Task<IEnumerable<Concert>> GetConcertByCriteriaAsync(string? criteria)
        {
            if (criteria.IsNullOrEmpty())
                return await _context.Concerts.ToListAsync();
          
          var searchedConcerts = await _context.Concerts
                .Where(c => c.Performer.ToLower().Contains(criteria!))
                .Include(c => c.Coordinates)
                .ToListAsync();
                return searchedConcerts;
        
           
        }

        public async Task<Concert?> GetConcertByIdAsync(int id)
        {
           Concert? concert = await _context.Concerts
                .Where(c => c.Id == id)
                .Include(c => c.Coordinates)
                .FirstOrDefaultAsync();

            return concert;
        }

        public async Task<T?> GetConcertByIdWithTypeAsync<T>(int id) where T : Concert
        {
            return await _context.Set<T>()
                .Where(c => c.Id == id)
                .Include(c => c.Coordinates)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>?> GetConcertsWithTypeAsync<T>() where T : Concert
        {
            return await _context.Set<T>()
                .Include(c => c.Coordinates)
                .ToListAsync();      
        } 
        
        public async Task<IEnumerable<Concert>?> GetConcertsAsync()
        {
            return await _context.Concerts
                .Include(c => c.Coordinates)
                .ToListAsync();   
        }
    }
}
