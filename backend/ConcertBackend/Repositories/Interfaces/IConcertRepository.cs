using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IConcertRepository
    {
        Task<List<Concert>> GetConcertsAsync();
        Task<List<Classic>> GetClassicsAsync();
        Task<List<Party>> GetPartiesAsync();
        Task<List<OpenAir>> GetOpenAirsAsync();
        Task<Concert> GetConcertByIdAsync(int id);
        Task<List<Concert>> GetConcertByCriteriaAsync(string? criteria);
        Task<Coordinates> GetCoordinatesByConcertIdAsync(int id);
        Task AddClassicAsync(Classic classic);
        Task<Coordinates?> AddCoordinatesAsync(Coordinates coordinates);
    }
}
