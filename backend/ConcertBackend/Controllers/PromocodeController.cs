using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ConcertBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PromocodeController : ControllerBase
    {
        private readonly IPromocodesRepository _promocodesRepository;

        public PromocodeController(IPromocodesRepository repository)
        {
                _promocodesRepository = repository;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promocode>>> GetPromocodesAsync()
        {
            return Ok(await _promocodesRepository.GetPromocodesAsync());
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Promocode>> GetPromocodeByIdAsync(int id)
        {
            var promocode = await _promocodesRepository.GetPromocodeByIdAsync(id);

            if (promocode == null)
                return NotFound();

            return Ok(promocode);
        }

        [Authorize(Policy = "admin")]
        [HttpPost]
        public async Task<ActionResult> AddPromocodeAsync([FromBody]PromocodeViewModel promocode)
        {
            if (promocode == null)
                return BadRequest();

            await _promocodesRepository.AddPromocodeAsync(new Promocode()
            {
                Code = promocode.Code,
                Total = promocode.Total,
            });
            return Ok();
        }

        [Authorize(Policy = "admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePromocodeAsync(int id)
        {
            var promocode = await _promocodesRepository.GetPromocodeByIdAsync(id);
            if (promocode == null)
                return NotFound();
            await _promocodesRepository.DeletePromocodeAsync(promocode);
            return Ok();
        }
    }
}
