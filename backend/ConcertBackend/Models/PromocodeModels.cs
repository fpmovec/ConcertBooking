namespace ConcertBackend.Models
{
    public class Promocode
    {
        public int Id { get; set; }
        public required string Code { get; set; }
        public float Total { get; set; }

    }
}
