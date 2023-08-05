using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promocode>>> GetPromocodesAsync()
        {
            return Ok(await _promocodesRepository.GetPromocodesAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Promocode>> GetPromocodeByIdAsync(int id)
        {
            var promocode = await _promocodesRepository.GetPromocodeByIdAsync(id);

            if (promocode == null)
                return NotFound();

            return Ok(promocode);
        }

        [HttpPost]
        public async Task<ActionResult> AddPromocodeAsync([FromBody]PromocodeDto promocode)
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
