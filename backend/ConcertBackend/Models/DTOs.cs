using System.ComponentModel.DataAnnotations;

namespace ConcertBackend.Models
{
    public class ClassicDto
    {
        public required string Performer { get; set; }
        public int TicketsCount { get; set; }
        public required string ConcertDate { get; set; }
        public required string Location { get; set; }
        public float Price { get; set; }
        public string? VoiceType { get; set; }
        public string? ConcertName { get; set; }
        public string? Composer { get; set; }
        public Coordinates? Coordinates { get; set; }
    }

    public class PartyDto
    {
        public required string Performer { get; set; }
        public int TicketsCount { get; set; }
        public required string ConcertDate { get; set; }
        public required string Location { get; set; }
        public float Price { get; set; }
        public int AgeLimit { get; set; }
        public Coordinates? Coordinates { get; set; }
    }

    public class OpenAirDto
    {
        public required string Performer { get; set; }
        public int TicketsCount { get; set; }
        public required string ConcertDate { get; set; }
        public required string Location { get; set; }
        public float Price { get; set; }
        public string Journey { get; set; } = string.Empty;
        public string Headliner { get; set; } = string.Empty;
        public Coordinates? Coordinates { get; set; }
    }

    public class PromocodeDto
    {
        public required string Code { get; set; }
        public float Total { get; set; }
    }

    public class EmailDto
    {
        [Required, EmailAddress]
        public required string EmailAddress { get; set; }
    }

    public class BookingDto
    {
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

    public class OrderDto
    {
        [Required]
        public string FirstName { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required, Phone]
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        [Required, Range(1, 250)]
        public int TicketQuantity { get; set; }
        [Required, Range(1, int.MaxValue)]
        public float PurchaseAmount { get; set; }
        public int ConcertId { get; set; }
    }
}
