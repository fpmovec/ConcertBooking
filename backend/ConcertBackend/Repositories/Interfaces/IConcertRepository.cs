using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IConcertRepository
    {
        Task<IEnumerable<Concert>?> GetConcertsAsync();
        Task<Concert?> GetConcertByIdAsync(int id);
        Task<IEnumerable<Concert>> GetConcertByCriteriaAsync(string? criteria);
        Task<IEnumerable<T>?> GetConcertsWithTypeAsync<T>() where T : Concert;
        Task<T?> GetConcertByIdWithTypeAsync<T>(int id) where T : Concert;
        Task AddConcertAsync(Concert concert);
        Task DeleteConcertAsync(Concert concert);
       
    }
}
