﻿using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IConcertRepository
    {
        Task<List<Concert>> GetConcertsAsync();
        Task<List<Classic>> GetClassicsAsync();
        Task<List<Party>> GetPartiesAsync();
        Task<List<OpenAir>> GetOpenAirsAsync();
        Task<Concert> GetConcertByIdAsync(int id);
        Task<Classic?> GetClassicAsync(int id);
        Task<Party?> GetPartyAsync(int id);
        Task<OpenAir?> GetOpenAirAsync(int id);
        Task<List<Concert>> GetConcertByCriteriaAsync(string? criteria);
        Task AddClassicAsync(Classic classic);
        Task AddPartyAsync(Party party);
        Task AddOpenAirAsync(OpenAir openAir);
        Task DeleteConcertAsync(Concert concert);
        Task DeleteClassicAsync(Classic classic);
        Task DeletePartyAsync(Party party);
        Task DeleteOpenAirAsync(OpenAir openAir);
    }
}
