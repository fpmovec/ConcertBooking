using ConcertBackend.Context;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Repositories.Classes
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ConcertsDbContext _context;
        public BookingRepository(ConcertsDbContext context)
        {
                _context = context;
        }
        public async Task AddBookingAsync(Booking booking)
        {
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Booking>> GetAllBookingsAsync()
        {
            return await _context.Bookings.ToListAsync();
        }

        public async Task<Booking?> GetBookingByIdAsync(int id)
        {
            return await _context.Bookings
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task RemoveBookingAsync(Booking booking)
        {
            _context.Remove(booking);
            await _context.SaveChangesAsync();
        }
    }
}
