using ConcertBackend.Context;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Repositories.Classes
{
    public class PromocodesRepository : IPromocodesRepository
    {
        private readonly ConcertsDbContext _context;
        public PromocodesRepository(ConcertsDbContext context) 
        {
            _context = context;
        }
        public async Task AddPromocodeAsync(Promocode promocode)
        {
            _context.Promocodes.Add(promocode);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePromocodeAsync(Promocode promocode)
        {
            _context.Promocodes.Remove(promocode);
            await _context.SaveChangesAsync();
        }

        public async Task<Promocode?> GetPromocodeByIdAsync(int id)
        {
            return await _context.Promocodes
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Promocode>> GetPromocodesAsync()
        {
            return await _context.Promocodes.ToListAsync();
        }
    }
}
