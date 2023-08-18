using AutoMapper;
using ConcertBackend.Models;

namespace ConcertBackend.Mapping
{
    public class ConcertsMapper : Profile
    {
        public ConcertsMapper()
        {
            CreateMap<ClassicDto, Classic>();
            CreateMap<PartyDto, Party>();
            CreateMap<OpenAirDto, OpenAir>();
        }
    }
}
