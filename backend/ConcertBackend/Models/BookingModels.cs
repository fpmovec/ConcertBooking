using System.ComponentModel.DataAnnotations;

namespace ConcertBackend.Models
{
    public class Booking
    {
        public int Id { get; set; }
        [Required, MinLength(3)]
        public string FirstName { get; set; } = string.Empty;
        [Required, MinLength(3)]
        public string LastName { get; set; } = string.Empty;
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required, Phone]
        public string PhoneNumber { get; set; } = string.Empty;
        [Required, Range(1, 250)]
        public int TicketQuantity { get; set; }
        [Required, Range(1, int.MaxValue)]
        public float PurchaseAmount { get; set; }
        public int ConcertId { get; set; }

    }
}
