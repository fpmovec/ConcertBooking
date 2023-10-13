using AutoMapper;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ConcertBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _repository;
        private readonly IMapper _mapper;

        public OrdersController(IOrderRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByEmail([EmailAddress]string email)
        {
            var orders = await _repository.GetOrdersByEmailAsync(email);
            return Ok(orders);
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> AddOrderAsync([FromBody]OrderViewModel orderDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = _mapper.Map<Order>(orderDto);

            await _repository.AddOrderAsync(order);

            return Ok(order);
        }
    }
}
