using AutoMapper;
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
        private readonly IMapper _mapper;

        public BookingController(IBookingRepository repository, IMapper mapper)
        {
            _bookingRepository = repository;
            _mapper = mapper;
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
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var booking = _mapper.Map<Booking>(bookingDto);

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
