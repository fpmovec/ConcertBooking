using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ConcertBackend.Controllers
{
    [ApiController]
    [Route("")]
    public class ConcertController : ControllerBase
    {
        private readonly IConcertRepository _concertRepository;
        public ConcertController(IConcertRepository repository)
        {
                _concertRepository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Concert>>> GetAllConcerts()
        {
            var concerts = await _concertRepository.GetConcerts();
            if (concerts == null)
            {
                return NotFound();
            }

            return Ok(concerts);
        }

        [HttpGet("classic")]
        public async Task<ActionResult<List<Classic>>> GetAllClassics() { 
            var classics = await _concertRepository.GetClassics();

            if (classics == null)
                return NotFound();

            return Ok(classics);
        }

        [HttpGet("party")]
        public async Task<ActionResult<List<Party>>> GetAllParties()
        {
            var parties = await _concertRepository.GetParties();

            if (parties == null)
                return NotFound();

            return Ok(parties);
        }

        [HttpGet("openair")]
        public async Task<ActionResult<List<OpenAir>>> GetAllOpenAirs()
        {
            var openAirs = await _concertRepository.GetOpenAirs();

            if (openAirs == null)
                return NotFound();

            return Ok(openAirs);
        }

    }
}
