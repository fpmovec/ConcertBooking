using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ConcertBackend.Models
{
    public class Concert
    {
        public int Id { get; set; }
        [Required]
        [MinLength(3), MaxLength(20)]
        public required string Performer { get; set; }
        [Required, Range(5, 250)]
        public int TicketsCount { get; set; }
        [Required]
        public required string ConcertDate { get; set; }
        [Required, MinLength(3), MaxLength(50)]
        public required string Location { get; set; }
        [Required, MinLength(3), MaxLength(10)]
        public required string ConcertType { get; set; }
        [Required, Range(3, 1000)]
        public float Price { get; set; }
        [JsonIgnore]
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        [JsonIgnore]
        public ICollection<Order> Orders { get; set; } = new List<Order>();
        public Coordinates? Coordinates { get; set; }
    }

    [Table("Classics")]
    public class Classic : Concert
    {
        [Required, MinLength(3), MaxLength(15)]
        public string? VoiceType { get; set; }
        [Required, MinLength(3), MaxLength(25)]
        public string? ConcertName { get; set; }
        [Required, MinLength(3), MaxLength(25)]
        public string? Composer { get; set; }
    }

    [Table("Parties")]
    public class Party : Concert
    {
        [Required, Range(0, 100)]
        public int AgeLimit { get; set; }
    }

    [Table("OpenAirs")]
    public class OpenAir : Concert
    {
        [Required, MinLength(3), MaxLength(25)]
        public string? Headliner { get; set; }
        [Required, MinLength(3), MaxLength(125)]
        public string? Journey { get; set; }
    }

    public class Coordinates
    {
        public int Id { get; set; }
        [Required]
        public float Longitude { get; set; }
        [Required]
        public float Latitude { get; set; }

    }
}
