using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllBookingsAsync();
        Task AddBookingAsync(Booking booking);
        Task RemoveBookingAsync(Booking booking);
        Task<Booking?> GetBookingByIdAsync(int id);
    }
}
