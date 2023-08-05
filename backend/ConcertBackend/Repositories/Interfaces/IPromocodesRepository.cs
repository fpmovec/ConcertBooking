using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IPromocodesRepository
    {
        Task<IEnumerable<Promocode>> GetPromocodesAsync();
        Task<Promocode?> GetPromocodeByIdAsync(int id);
        Task DeletePromocodeAsync(Promocode promocode);
        Task AddPromocodeAsync(Promocode promocode);
    }
}
