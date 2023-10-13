using ConcertBackend.Models;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;

namespace ConcertBackend.EmailConfirmation.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private Guid ConfirmationCode { get; set; }

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Guid GetConfirmationCode()
            => ConfirmationCode;

        public void SendEmail(string emailBooking)
        {
            ConfirmationCode = Guid.NewGuid();
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("concertsemailconfirmation@gmail.com"));
            email.To.Add(MailboxAddress.Parse(emailBooking));
            email.Subject = "Booking Confirmation";
            email.Body = new TextPart(TextFormat.Text) { 
                Text = $"Hello! Please confirm your booking by inserting this code: {ConfirmationCode}" 
            };

            using var smtp = new SmtpClient();
            smtp.Connect(_configuration.GetSection("EmailHost").Value, 465, MailKit.Security.SecureSocketOptions.SslOnConnect);
            smtp.Authenticate(_configuration.GetSection("Email").Value, _configuration.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);

        }
    }
}
