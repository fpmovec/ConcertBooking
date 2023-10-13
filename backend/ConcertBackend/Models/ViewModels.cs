using System.ComponentModel.DataAnnotations;

namespace ConcertBackend.Models
{
    public class ClassicViewModel
    {
        [Required]
        [MinLength(2), MaxLength(20)]
        public required string Performer { get; set; }
        [Required, Range(1, 250)]
        public int TicketsCount { get; set; }
        [Required]
        public required string ConcertDate { get; set; }
        [Required, MinLength(3), MaxLength(100)]
        public required string Location { get; set; }
        [Required, Range(0, 1000)]
        public float Price { get; set; }
        [Required, MinLength(3), MaxLength(15)]
        public string? VoiceType { get; set; }
        [Required, MinLength(3), MaxLength(25)]
        public string? ConcertName { get; set; }
        [Required, MinLength(3), MaxLength(25)]
        public string? Composer { get; set; }
        public Coordinates? Coordinates { get; set; }
    }

    public class PartyViewModel
    {
        [Required]
        [MinLength(2), MaxLength(20)]
        public required string Performer { get; set; }
        [Required, Range(1, 250)]
        public int TicketsCount { get; set; }
        [Required]
        public required string ConcertDate { get; set; }
        [Required, MinLength(3), MaxLength(100)]
        public required string Location { get; set; }
        [Required, Range(0, 1000)]
        public float Price { get; set; }
        [Required, Range(0, 100)]
        public int AgeLimit { get; set; }
        public Coordinates? Coordinates { get; set; }
    }

    public class OpenAirViewModel
    {
        [Required]
        [MinLength(2), MaxLength(20)]
        public required string Performer { get; set; }
        [Required, Range(1, 250)]
        public int TicketsCount { get; set; }
        [Required]
        public required string ConcertDate { get; set; }
        [Required, MinLength(3), MaxLength(100)]
        public required string Location { get; set; }
        [Required, Range(0, 1000)]
        public float Price { get; set; }
        [Required, MinLength(3), MaxLength(125)]
        public string Journey { get; set; } = string.Empty;
        [Required, MinLength(3), MaxLength(25)]
        public string Headliner { get; set; } = string.Empty;
        public Coordinates? Coordinates { get; set; }
    }

    public class PromocodeViewModel
    {
        [Required, MinLength(1)]
        public required string Code { get; set; }
        [Required, Range(0.74, 0.98)]
        public float Total { get; set; }
    }

    public class EmailViewModel
    {
        [Required, EmailAddress]
        public required string EmailAddress { get; set; }
    }

    public class BookingViewModel
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

    public class OrderViewModel
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
