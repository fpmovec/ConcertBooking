using ConcertBackend.EmailConfirmation.EmailService;
using ConcertBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConcertBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _service;

        public EmailController(IEmailService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost]
        public ActionResult SendEmail(EmailDto email)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _service.SendEmail(email.EmailAddress);

            return Ok();
        }

        [Authorize]
        [HttpGet("confirmation")]
        public ActionResult<Guid> GetConfirmationCode()
        {
            var confirmationCode = _service.GetConfirmationCode();
            return Ok(confirmationCode);
        }
    }
}
