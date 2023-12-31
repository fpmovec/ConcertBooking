﻿using ConcertBackend.Models;

namespace ConcertBackend.EmailConfirmation.EmailService
{
    public interface IEmailService
    {
        void SendEmail(string email);
        Guid GetConfirmationCode();
    }
}
