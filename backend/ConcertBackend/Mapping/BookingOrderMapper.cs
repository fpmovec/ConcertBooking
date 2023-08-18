using AutoMapper;
using ConcertBackend.Models;

namespace ConcertBackend.Mapping
{
    public class BookingOrderMapper : Profile
    {
        public BookingOrderMapper()
        {
            CreateMap<BookingDto, Booking>();
            CreateMap<OrderDto, Order>()
                .ForMember(o => o.FullName, opt => opt
                      .MapFrom(src => $"{src.FirstName} {src.LastName}"));
        }
    }
}
