using ConcertBackend.Models;
using MailKit.Net.Smtp;
using MimeKit;
using MimeKit.Text;
// ycpbpzzjflrbjogh

namespace ConcertBackend.EmailConfirmation.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public void SendEmail(EmailDto emailDto)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("ConcertsBooking"));
            email.To.Add(MailboxAddress.Parse(emailDto.To));
            email.Subject = emailDto.Subject;
            email.Body = new TextPart(TextFormat.Text) { Text = emailDto.Body };

            using var smtp = new SmtpClient();
            smtp.Connect(_configuration.GetSection("EmailHost").Value, 587, MailKit.Security.SecureSocketOptions.StartTls);
            smtp.Authenticate(_configuration.GetSection("Email").Value, _configuration.GetSection("EmailPassword").Value);
            smtp.Send(email);
            smtp.Disconnect(true);


        }
    }
}
