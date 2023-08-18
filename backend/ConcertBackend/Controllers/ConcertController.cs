using AutoMapper;
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
        private readonly IMapper _mapper;
        public ConcertController(IConcertRepository repository, IMapper mapper)
        {
            _concertRepository = repository;
            _mapper = mapper;
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

        [Authorize(Policy = "admin")]
        [HttpPost("classic")]
        public async Task<ActionResult> AddClassic([FromBody] ClassicDto concert)
        {
            if (concert == null)
                return BadRequest();

            var classic = _mapper.Map<Classic>(concert);
            if (ModelState.IsValid)
            {

            }
            classic.ConcertType = "Classic";

            await _concertRepository.AddClassicAsync(classic);
            return Ok();
        }

        [Authorize(Policy = "admin")]
        [HttpPost("party")]
        public async Task<ActionResult> AddParty(PartyDto partyDto)
        {
            if (partyDto == null)
                return BadRequest();

            var party = _mapper.Map<Party>(partyDto);
            party.ConcertType = "Party";

            await _concertRepository.AddPartyAsync(party);
            return Ok();

        }

        [Authorize(Policy = "admin")]
        [HttpPost("openair")]
        public async Task<ActionResult> AddOpenAir(OpenAirDto openairDto)
        {
            if (openairDto == null)
                return BadRequest();

            var openAir = _mapper.Map<OpenAir>(openairDto);
            openAir.ConcertType = "OpenAir";

            await _concertRepository.AddOpenAirAsync(openAir);
            return Ok();
        }

     

        [Authorize(Policy = "admin")]
        [HttpDelete("classic/{id}")]
        public async Task<ActionResult> DeleteClassic(int id)
        {
            var concert = await _concertRepository.GetClassicAsync(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeleteClassicAsync(concert);
            return Ok();
        }


        [Authorize(Policy = "admin")]
        [HttpDelete("party/{id}")]
        public async Task<ActionResult> DeleteParty(int id)
        {
            var concert = await _concertRepository.GetPartyAsync(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeletePartyAsync(concert);
            return Ok();
        }

        [Authorize(Policy = "admin")]
        [HttpDelete("openair/{id}")]
        public async Task<ActionResult> DeleteOpenAir(int id)
        {
            var concert = await _concertRepository.GetOpenAirAsync(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeleteOpenAirAsync(concert);
            return Ok();
        }

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