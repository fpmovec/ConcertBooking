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

        [Authorize(Policy = "admin"), Authorize(Policy = "user")]
        [HttpPost]
        public ActionResult SendEmail(EmailDto email)
        {
            _service.SendEmail(email.EmailAddress);

            return Ok();
        }

        [Authorize(Policy = "admin"), Authorize(Policy = "user")]
        [HttpGet("confirmation")]
        public ActionResult<Guid> GetConfirmationCode()
        {
            var confirmationCode = _service.GetConfirmationCode();
            return Ok(confirmationCode);
        }
    }
}
