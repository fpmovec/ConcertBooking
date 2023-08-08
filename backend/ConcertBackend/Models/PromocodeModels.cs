using System.ComponentModel.DataAnnotations;

namespace ConcertBackend.Models
{
    public class Promocode
    {
        public int Id { get; set; }
        [Required, MinLength(1)]
        public required string Code { get; set; }
        [Required, Range(0.74, 0.98)]
        public float Total { get; set; }

    }
}
