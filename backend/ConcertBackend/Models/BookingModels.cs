namespace ConcertBackend.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public int TicketQuantity { get; set; }
        public float PurchaseAmount { get; set; }
        public int ConcertId { get; set; }

    }
}
