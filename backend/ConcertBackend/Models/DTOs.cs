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

    public class CoordinatesDto
    {
        public int ConcertId { get; set; }
        public float Longitude { get; set; }
        public float Latitude { get; set; }
    }
}
