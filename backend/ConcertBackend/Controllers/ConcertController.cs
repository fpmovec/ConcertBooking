using AutoMapper;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using ConcertBackend.Repositories.Realizations.Concerts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ConcertBackend.Controllers
{
    [ApiController]
    [Route("")]
    public class ConcertController : ControllerBase
    {
        //private readonly IConcertRepository _concertRepository;
        private readonly ClassicRepository _classicRepository;
        private readonly PartyRepository _partyRepository;
        private readonly OpenAirRepository _openAirRepository;
        private readonly CommonRepository _commonRepository;
        private readonly IMapper _mapper;
        public ConcertController(ClassicRepository repository,
            PartyRepository partyRepository,
            OpenAirRepository openAirRepository,
            CommonRepository commonRepository,
            IMapper mapper)
        {
            //_concertRepository = repository;
            _mapper = mapper;
             _classicRepository = repository;
            _partyRepository = partyRepository;
            _openAirRepository = openAirRepository;
            _commonRepository = commonRepository;
        }

        [AllowAnonymous]
        [HttpGet("concerts")]
        public async Task<ActionResult<List<Concert>>> GetAllConcerts()
        {
            var concerts = await _commonRepository.GetAllAsync();
            if (concerts == null)
            {
                return NotFound();
            }

            return Ok(concerts);
        }

        [AllowAnonymous]
        [HttpGet("classic")]
        public async Task<ActionResult<List<Classic>>> GetAllClassics()
        {

            var classics = await _classicRepository.GetAllAsync();
            if (classics == null)
                return NotFound();

            return Ok(classics);
        }

        [AllowAnonymous]
        [HttpGet("party")]
        public async Task<ActionResult<List<Party>>> GetAllParties()
        {

            var parties = await _partyRepository.GetAllAsync();

            if (parties == null)
                return NotFound();

            return Ok(parties);
        }

        [AllowAnonymous]
        [HttpGet("openair")]
        public async Task<ActionResult<List<OpenAir>>> GetAllOpenAirs()
        {

            var openAirs = await _openAirRepository.GetAllAsync();

            if (openAirs == null)
                return NotFound();

            return Ok(openAirs);
        }

        [AllowAnonymous]
        [HttpGet("search/{criteria}")]
        public async Task<ActionResult<List<Concert>>> GetConcertsByCriteria(string? criteria)
        {
            var searchedConcerts = await _commonRepository.GetByCriteriaAsync(criteria);
            return Ok(searchedConcerts);
        }


        [AllowAnonymous]
        [HttpGet("classic/{id}")]
        public async Task<ActionResult<Classic>> GetClassicById(int id)
        {
            var concert = await _classicRepository.GetByIdAsync(id);

            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("concert/{id}")]
        public async Task<ActionResult<Concert>> GetConcertById(int id)
        {
            var concert = await _commonRepository.GetByIdAsync(id);
            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("party/{id}")]
        public async Task<ActionResult<Party>> GetPartyById(int id)
        {
            var concert = await _partyRepository.GetByIdAsync(id);

            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("openair/{id}")]
        public async Task<ActionResult<OpenAir>> GetOpenAirById(int id)
        {
            var concert = await _openAirRepository.GetByIdAsync(id);

            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [Authorize(Policy = "admin")]
        [HttpPost("classic")]
        public async Task<ActionResult> AddClassic([FromBody] ClassicViewModel concert)
        {
            if (concert == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var classic = _mapper.Map<Classic>(concert);
            classic.ConcertType = "Classic";

            await _classicRepository.AddAsync(classic);
            return Ok();
        }

        [Authorize(Policy = "admin")]
        [HttpPost("party")]
        public async Task<ActionResult> AddParty(PartyViewModel partyDto)
        {
            if (partyDto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var party = _mapper.Map<Party>(partyDto);
            party.ConcertType = "Party";

            await _partyRepository.AddAsync(party);
            return Ok();

        }

        [Authorize(Policy = "admin")]
        [HttpPost("openair")]
        public async Task<ActionResult> AddOpenAir(OpenAirViewModel openairDto)
        {
            if (openairDto == null)
                return BadRequest();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var openAir = _mapper.Map<OpenAir>(openairDto);
            openAir.ConcertType = "OpenAir";

            await _openAirRepository.AddAsync(openAir);
            return Ok();
        }



        [Authorize(Policy = "admin")]
        [HttpDelete("classic/{id}")]
        public async Task<ActionResult> DeleteClassic(int id)
        {
            var concert = await _classicRepository.GetByIdAsync(id);
            if (concert == null) return NotFound();

            await _classicRepository.DeleteAsync(concert);
            return Ok();
        }


        [Authorize(Policy = "admin")]
        [HttpDelete("party/{id}")]
        public async Task<ActionResult> DeleteParty(int id)
        {
            var concert = await _partyRepository.GetByIdAsync(id);
            if (concert == null) return NotFound();

            await _partyRepository.DeleteAsync(concert);
            return Ok();
        }

        [Authorize(Policy = "admin")]
        [HttpDelete("openair/{id}")]
        public async Task<ActionResult> DeleteOpenAir(int id)
        {
            var concert = await _openAirRepository.GetByIdAsync(id);
            if (concert == null) return NotFound();

            await _openAirRepository.DeleteAsync(concert);
            return Ok();
        }

        [Authorize(Policy = "admin")]
        [HttpDelete("concerts/{id}")]
        public async Task<ActionResult> DeleteConcert(int id)
        {
            var concert = _commonRepository.GetByIdAsync(id);
            if (concert == null) return NotFound();

            await _commonRepository.DeleteAsync(concert.Result);
            return Ok();
        }
    }
    }