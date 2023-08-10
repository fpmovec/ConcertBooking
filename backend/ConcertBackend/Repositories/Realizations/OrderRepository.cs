using ConcertBackend.Context;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ConcertBackend.Repositories.Realizations
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ConcertsDbContext _context;

        public OrderRepository(ConcertsDbContext context)
        {
            _context = context;
        }
        public async Task AddOrderAsync(Order orderDto)
        {
            //var order = new Order()
            //{
            //    FullName = (string)orderDto.FirstName.Concat($" {orderDto.LastName}"),
            //    PhoneNumber = orderDto.PhoneNumber,
            //    Email = orderDto.Email,
            //    PurchaseAmount = orderDto.PurchaseAmount,
            //    TicketQuantity = orderDto.TicketQuantity,
            //    ConcertId = orderDto.ConcertId,
            //};
            _context.Orders.Add(orderDto);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByEmailAsync(string email)
        {
            var orders = await _context.Orders
                .Where(o => o.Email == email)
                .ToListAsync();

            return orders;
        }
    }
}
