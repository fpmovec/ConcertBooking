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
            var concerts = await _concertRepository.GetConcertsAsync();
            if (concerts == null)
            {
                return NotFound();
            }
  
            return Ok(concerts);
        }

        [HttpGet("classic")]
        public async Task<ActionResult<List<Classic>>> GetAllClassics() { 
            var classics = await _concertRepository.GetClassicsAsync();

            if (classics == null)
                return NotFound();

            return Ok(classics);
        }

        [HttpGet("party")]
        public async Task<ActionResult<List<Party>>> GetAllParties()
        {
            var parties = await _concertRepository.GetPartiesAsync();

            if (parties == null)
                return NotFound();

            return Ok(parties);
        }

        [HttpGet("openair")]
        public async Task<ActionResult<List<OpenAir>>> GetAllOpenAirs()
        {
            var openAirs = await _concertRepository.GetOpenAirsAsync();

            if (openAirs == null)
                return NotFound();

            return Ok(openAirs);
        }

        [HttpGet("search/{criteria}")]
        public async Task<ActionResult<List<Concert>>> GetConcertsByCriteria(string? criteria)
        {
            var searchedConcerts = await _concertRepository.GetConcertByCriteriaAsync(criteria);
            return Ok(searchedConcerts);
        }

        [HttpGet("coordinates/{id}")]
        public async Task<ActionResult<Coordinates>> GetCoordinatesByConcertId(int id)
        {
            var coordinates = await _concertRepository.GetCoordinatesByConcertIdAsync(id);

            if (coordinates == null)
                return NotFound();

            return Ok(coordinates);
        }



        [HttpPost]
        public async Task<ActionResult> AddClassic([FromBody] ClassicDto concert)
        {
            if (concert == null)
                return BadRequest();

            var classicConcert = new Classic
            {
                Performer = concert.Performer,
                TicketsCount = concert.TicketsCount,
                ConcertDate = concert.ConcertDate,
                Location = concert.Location,
                ConcertType = "Classic",
                Price = concert.Price,
                VoiceType = concert.VoiceType,
                ConcertName = concert.ConcertName,
                Composer = concert.Composer,
            };

            await _concertRepository.AddClassicAsync(classicConcert);
            return Ok();
        }

        [HttpPost("coordinates")]
        public async Task<ActionResult> AddCoordinatesAsync([FromBody] CoordinatesDto coordinatesDto)
        {
            var coordinates = new Coordinates
            {
                ConcertId = coordinatesDto.ConcertId,
                Longitude = coordinatesDto.Longitude,
                Latitude = coordinatesDto.Latitude,
            };
            var concert = await _concertRepository.AddCoordinatesAsync(coordinates);

            if (concert == null)
                return NotFound();

            return Ok();
        }
    }
}