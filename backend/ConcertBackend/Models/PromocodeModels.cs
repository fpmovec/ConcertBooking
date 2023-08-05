using System.ComponentModel.DataAnnotations;

namespace ConcertBackend.Models
{
    public class Promocode
    {
        public int Id { get; set; }
        [Required, MinLength(1)]
        public required string Code { get; set; }
        [Required, Range(0.75, 0.97)]
        public float Total { get; set; }

    }
}
