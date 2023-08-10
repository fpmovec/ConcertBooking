using System.ComponentModel.DataAnnotations;

namespace ConcertBackend.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required, MinLength(5)]
        public string FullName { get; set; } = string.Empty;
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
