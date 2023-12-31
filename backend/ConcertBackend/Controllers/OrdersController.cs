﻿using ConcertBackend.Models;
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

        public OrdersController(IOrderRepository repository)
        {
            _repository = repository;
        }

        [Authorize]
        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByEmail([EmailAddress]string email)
        {
            var orders = await _repository.GetOrdersByEmailAsync(email);
            return Ok(orders);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> AddOrderAsync([FromBody]OrderDto orderDto)
        {
            var order = new Order()
            {
                FullName = orderDto.FirstName + " " + orderDto.LastName,
                PhoneNumber = orderDto.PhoneNumber,
                Email = orderDto.Email,
                PurchaseAmount = orderDto.PurchaseAmount,
                TicketQuantity = orderDto.TicketQuantity,
                ConcertId = orderDto.ConcertId,
            };
            await _repository.AddOrderAsync(order);

            return Ok(order);
        }
    }
}
