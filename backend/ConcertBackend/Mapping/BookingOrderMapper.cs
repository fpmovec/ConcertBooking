using AutoMapper;
using ConcertBackend.Models;

namespace ConcertBackend.Mapping
{
    public class BookingOrderMapper : Profile
    {
        public BookingOrderMapper()
        {
            CreateMap<BookingViewModel, Booking>();
            CreateMap<OrderViewModel, Order>()
                .ForMember(o => o.FullName, opt => opt
                      .MapFrom(src => $"{src.FirstName} {src.LastName}"));
        }
    }
}
