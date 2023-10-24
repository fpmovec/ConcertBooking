using ConcertBackend.Context;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace ConcertBackend.Repositories.Realizations.Concerts
{
    public abstract class ConcertRepository<TEntity> : IConcertRepository<TEntity> where TEntity : Concert
    {
        protected readonly ConcertsDbContext _context;
        protected abstract DbSet<TEntity> _db { get; }
        public ConcertRepository(ConcertsDbContext context)
        {
                _context = context;
        }

        public async Task AddAsync(TEntity concert)
        {
           _db.Add(concert);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(TEntity concert)
        {
            _db.Remove(concert);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            var concerts = await _db
                .Include(c => c.Coordinates)
                .ToListAsync();
            return concerts;

        }

        public async Task<IEnumerable<TEntity>> GetByCriteriaAsync(string? criteria)
        {
            if (criteria.IsNullOrEmpty())
                return await _db.ToListAsync();

            var searchedConcerts = await _db
                  .Where(c => c.Performer.ToLower().Contains(criteria!))
                  .Include(c => c.Coordinates)
                  .ToListAsync();
            return searchedConcerts;
        }

        public async Task<TEntity?> GetByIdAsync(int id)
        {
            var concert = await _db
                .Where(c => c.Id == id)
                .FirstOrDefaultAsync();

            return concert;
        }
    }
}
