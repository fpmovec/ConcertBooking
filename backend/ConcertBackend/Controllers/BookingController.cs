using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConcertBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingController(IBookingRepository repository)
        {
            _bookingRepository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetAllBookingsAsync()
        {
            return Ok(await _bookingRepository.GetAllBookingsAsync());
        }

        [HttpPost]
        public async Task<ActionResult> AddBookingAsync([FromBody]Booking booking)
        {
            await _bookingRepository.AddBookingAsync(booking);
            return Ok();
        }

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
