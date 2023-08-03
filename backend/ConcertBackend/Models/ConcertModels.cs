using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ConcertBackend.Models
{
    public class Concert
    {
        public int Id { get; set; }
        public required string Performer { get; set; }
        public int TicketsCount { get; set; }
        public required string ConcertDate { get; set; }
        public required string Location { get; set; }
        public required string ConcertType { get; set; }
        public float Price { get; set; }

        public Coordinates? Coordinates { get; set; }
    }

    [Table("Classics")]
    public class Classic : Concert
    {
        public string? VoiceType { get; set; }
        public string? ConcertName { get; set; }
        public string? Composer { get; set; }
    }

    [Table("Parties")]
    public class Party : Concert
    {
        public int AgeLimit { get; set; }
    }

    [Table("OpenAirs")]
    public class OpenAir : Concert
    {
        public string? Headliner { get; set; }
        public string? Journey { get; set; }
    }

    public class Coordinates
    {
        public int Id { get; set; }
        public int ConcertId { get; set; }
        public float Longitude { get; set; }
        public float Latitude { get; set; }

    }
}
