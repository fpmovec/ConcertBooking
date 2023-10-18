﻿using AutoMapper;
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
            var concerts = await _concertRepository.GetConcertsWithTypeAsync<Concert>();
            if (concerts == null)
            {
                return NotFound();
            }

            return Ok(concerts);
        }

        [AllowAnonymous]
        [HttpGet("classic")]
        public async Task<ActionResult<List<Classic>>> GetAllClassics() {

            var classics = await _concertRepository.GetConcertsWithTypeAsync<Classic>();

            if (classics == null)
                return NotFound();

            return Ok(classics);
        }

        [AllowAnonymous]
        [HttpGet("party")]
        public async Task<ActionResult<List<Party>>> GetAllParties()
        {

            var parties = await _concertRepository.GetConcertsWithTypeAsync<Party>();

            if (parties == null)
                return NotFound();

            return Ok(parties);
        }

        [AllowAnonymous]
        [HttpGet("openair")]
        public async Task<ActionResult<List<OpenAir>>> GetAllOpenAirs()
        {

            var openAirs = await _concertRepository.GetConcertsWithTypeAsync<OpenAir>();

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
            var concert = await _concertRepository.GetConcertByIdWithTypeAsync<Classic>(id);

            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("concert/{id}")]
        public async Task<ActionResult<Concert>> GetConcertById(int id)
        {
            var concert = await _concertRepository.GetConcertByIdWithTypeAsync<Concert>(id);
            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("party/{id}")]
        public async Task<ActionResult<Party>> GetPartyById(int id)
        {
            var concert = await _concertRepository.GetConcertByIdWithTypeAsync<Party>(id);

            if (concert == null)
                return NotFound();

            return Ok(concert);
        }

        [AllowAnonymous]
        [HttpGet("openair/{id}")]
        public async Task<ActionResult<OpenAir>> GetOpenAirById(int id)
        {
            var concert = await _concertRepository.GetConcertByIdWithTypeAsync<OpenAir>(id);

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

            await _concertRepository.AddConcertAsync(classic);
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

            await _concertRepository.AddConcertAsync(party);
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

            await _concertRepository.AddConcertAsync(openAir);
            return Ok();
        }

     

        [Authorize(Policy = "admin")]
        [HttpDelete("classic/{id}")]
        public async Task<ActionResult> DeleteClassic(int id)
        {
            var concert = await _concertRepository.GetConcertByIdWithTypeAsync<Classic>(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeleteConcertAsync(concert);
            return Ok();
        }


        [Authorize(Policy = "admin")]
        [HttpDelete("party/{id}")]
        public async Task<ActionResult> DeleteParty(int id)
        {
            var concert = await _concertRepository.GetConcertByIdWithTypeAsync<Party>(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeleteConcertAsync(concert);
            return Ok();
        }

        [Authorize(Policy = "admin")]
        [HttpDelete("openair/{id}")]
        public async Task<ActionResult> DeleteOpenAir(int id)
        {
            var concert = await _concertRepository.GetConcertByIdWithTypeAsync<OpenAir>(id);
            if (concert == null) return NotFound();

            await _concertRepository.DeleteConcertAsync(concert);
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