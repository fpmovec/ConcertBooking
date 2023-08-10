using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllBookingsByEmailAsync(string email);
        Task AddBookingAsync(Booking booking);
        Task RemoveBookingAsync(Booking booking);
        Task<Booking?> GetBookingByIdAsync(int id);
    }
}
