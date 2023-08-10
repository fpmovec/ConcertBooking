using ConcertBackend.Models;

namespace ConcertBackend.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrdersByEmailAsync(string Email);
        Task AddOrderAsync(Order orderDto);
    }
}
