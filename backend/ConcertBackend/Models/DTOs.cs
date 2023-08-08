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
    }

    public class PartyDto
    {
        public required string Performer { get; set; }
        public int TicketsCount { get; set; }
        public required string ConcertDate { get; set; }
        public required string Location { get; set; }
        public float Price { get; set; }
        public int AgeLimit { get; set; }
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
    }

    public class CoordinatesDto
    {
        public int ConcertId { get; set; }
        public float Longitude { get; set; }
        public float Latitude { get; set; }
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
}
