using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

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

        [AllowAnonymous]
        [HttpGet("concerts")]
        public async Task<ActionResult<List<Concert>>> GetAllConcerts()
        {
            var concerts = await _concertRepository.GetConcertsAsync();
            if (concerts == null)
            {
                return NotFound();
            }

            return Ok(concerts);
        }

        [AllowAnonymous]
        [HttpGet("classic")]
        public async Task<ActionResult<List<Classic>>> GetAllClassics() {
            var classics = await _concertRepository.GetClassicsAsync();

            if (classics == null)
                return NotFound();

            return Ok(classics);
        }

        [AllowAnonymous]
        [HttpGet("party")]
        public async Task<ActionResult<List<Party>>> GetAllParties()
        {
            var parties = await _concertRepository.GetPartiesAsync();

            if (parties == null)
                return NotFound();

            return Ok(parties);
        }

        [AllowAnonymous]
        [HttpGet("openair")]
        public async Task<ActionResult<List<OpenAir>>> GetAllOpenAirs()
        {
            var openAirs = await _concertRepository.GetOpenAirsAsync();

            if (openAirs == null)
                return NotFound();

            return Ok(openAirs);
        }

        [AllowAnonymous]
        [HttpGet("search/{criteria}")]
        public async Task<ActionResult<List<Concert>>> GetConcertsByCriteria(string? criteria)
        {
            var searchedConcerts = await _concertRepository.GetConcertByCriteriaAsync(criteria);
            return Ok(searchedConcerts);
        }

        //[AllowAnonymous]
        //[HttpGet("coordinates/{id}")]
        //public async Task<ActionResult<Coordinates>> GetCoordinatesByConcertId(int id)
        //{
        //    var coordinates = await _concertRepository.GetCoordinatesByConcertIdAsync(id);

        //    if (coordinates == null)
        //        return NotFound();

        //    return Ok(coordinates);
        //}

        [AllowAnonymous]
        [HttpGet("classic/{id}")]
        public async Task<ActionResult<Classic>> GetClassicById(int id)
        {
            var concert = await _concertRepository.GetClassicAsync(id);

            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("concert/{id}")]
        public async Task<ActionResult<Concert>> GetConcertById(int id)
        {
            var concert = await _concertRepository.GetConcertByIdAsync(id);
            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("party/{id}")]
        public async Task<ActionResult<Party>> GetPartyById(int id)
        {
            var concert = await _concertRepository.GetPartyAsync(id);

            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("openair/{id}")]
        public async Task<ActionResult<OpenAir>> GetOpenAirById(int id)
        {
            var concert = await _concertRepository.GetOpenAirAsync(id);

            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [Authorize]
        [HttpPost("classic")]
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
                Coordinates = concert.Coordinates,
            };

            await _concertRepository.AddClassicAsync(classicConcert);
            return Ok();
        }

        [Authorize]
        [HttpPost("party")]
        public async Task<ActionResult> AddParty(PartyDto partyDto)
        {
            if (partyDto == null)
                return BadRequest();

            var party = new Party()
            {
                Performer = partyDto.Performer,
                TicketsCount = partyDto.TicketsCount,
                ConcertDate = partyDto.ConcertDate,
                Location = partyDto.Location,
                ConcertType = "Party",
                Price = partyDto.Price,
                AgeLimit = partyDto.AgeLimit,
                Coordinates = partyDto.Coordinates,
            };

            await _concertRepository.AddPartyAsync(party);
            return Ok();

        }

        [Authorize]
        [HttpPost("openair")]
        public async Task<ActionResult> AddOpenAir(OpenAirDto openairDto)
        {
            if (openairDto == null)
                return BadRequest();

            var openair = new OpenAir()
            {
                Performer = openairDto.Performer,
                TicketsCount = openairDto.TicketsCount,
                ConcertDate = openairDto.ConcertDate,
                Location = openairDto.Location,
                ConcertType = "OpenAir",
                Price = openairDto.Price,
                Journey = openairDto.Journey,
                Headliner = openairDto.Headliner,
                Coordinates = openairDto.Coordinates,
            };

            await _concertRepository.AddOpenAirAsync(openair);
            return Ok();
        }

        //[Authorize]
        //[HttpPost("coordinates")]
        //public async Task<ActionResult> AddCoordinatesAsync([FromBody] CoordinatesDto coordinatesDto)
        //{
        //    var coordinates = new Coordinates
        //    {
        //        ConcertId = coordinatesDto.ConcertId,
        //        Longitude = coordinatesDto.Longitude,
        //        Latitude = coordinatesDto.Latitude,
        //    };
        //    var concert = await _concertRepository.AddCoordinatesAsync(coordinates);

        //    if (concert == null)
        //        return NotFound();

        //    return Ok();
        //}

        [Authorize]
        [HttpDelete("classic/{id}")]
        public async Task<ActionResult> DeleteClassic(int id)
        {
            var concert = await _concertRepository.GetClassicAsync(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeleteClassicAsync(concert);
            return Ok();
        }


        [Authorize]
        [HttpDelete("party/{id}")]
        public async Task<ActionResult> DeleteParty(int id)
        {
            var concert = await _concertRepository.GetPartyAsync(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeletePartyAsync(concert);
            return Ok();
        }

        [Authorize]
        [HttpDelete("openair/{id}")]
        public async Task<ActionResult> DeleteOpenAir(int id)
        {
            var concert = await _concertRepository.GetOpenAirAsync(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeleteOpenAirAsync(concert);
            return Ok();
        }

        //[Authorize]
        //[HttpDelete("coordinates/{id}")]
        //public async Task<ActionResult> DeleteCoordinates(int id)
        //{
        //    var coordinates = await _concertRepository.GetCoordinatesByConcertIdAsync(id);
        //    if (coordinates == null) return NotFound();

        //    await _concertRepository.DeleteCoordinatesAsync(coordinates);
        //    return Ok();
        //}

        [Authorize(Policy = "admin")]
        [HttpDelete("concerts/{id}")]
        public async Task<ActionResult> DeleteConcert(int id)
        {
            var concert = _concertRepository.GetConcertByIdAsync(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeleteConcertAsync(concert.Result);
            return Ok();
        }
    }
}