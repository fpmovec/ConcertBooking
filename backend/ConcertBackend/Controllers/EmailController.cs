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
        public ActionResult SendEmail(EmailDto email)
        {
            _service.SendEmail(email);

            return Ok();
        }
    }
}
