using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IConcertRepository
    {
        Task<List<Concert>> GetConcerts();
        Task<List<Classic>> GetClassics();
        Task<List<Party>> GetParties();
        Task<List<OpenAir>> GetOpenAirs();
        Task<Concert> GetConcertById(int id);
    }
}
