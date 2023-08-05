using ConcertBackend.EmailConfirmation.EmailService;
using ConcertBackend.Models;
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

        [HttpPost]
        public ActionResult SendEmail(string email)
        {
            _service.SendEmail(email);

            return Ok();
        }

        [HttpGet("confirmation")]
        public ActionResult<Guid> GetConfirmationCode()
        {
            var confirmationCode = _service.GetConfirmationCode();
            return Ok(confirmationCode);
        }
    }
}
