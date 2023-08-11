using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ConcertBackend.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingController(IBookingRepository repository)
        {
            _bookingRepository = repository;
        }

        [Authorize(Policy = "user")]
        [HttpGet("{email}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookingsByEmailAsync([EmailAddress]string email)
        {
            return Ok(await _bookingRepository.GetAllBookingsByEmailAsync(email));
        }

        [Authorize(Policy = "user")]
        [HttpPost]
        public async Task<ActionResult> AddBookingAsync([FromBody]BookingDto bookingDto)
        {
            var booking = new Booking()
            {
                FirstName = bookingDto.FirstName,
                LastName = bookingDto.LastName,
                Email = bookingDto.Email,
                PhoneNumber = bookingDto.PhoneNumber,
                PurchaseAmount = bookingDto.PurchaseAmount,
                TicketQuantity = bookingDto.TicketQuantity,
                ConcertId = bookingDto.ConcertId,
            };
            await _bookingRepository.AddBookingAsync(booking);
            return Ok();
        }

        [Authorize(Policy = "user")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBookingAsync(int id)
        {
            var booking = await _bookingRepository.GetBookingByIdAsync(id);

            if (booking == null)
                return NotFound();

            await _bookingRepository.RemoveBookingAsync(booking);
            return Ok();
        }
    }
}
