using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IConcertRepository<TEntity> where TEntity : Concert
    {

        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<TEntity?> GetByIdAsync(int id);
        Task<IEnumerable<TEntity>> GetByCriteriaAsync(string? criteria);
        Task AddAsync(TEntity concert);
        Task DeleteAsync(TEntity concert);
    }
}
