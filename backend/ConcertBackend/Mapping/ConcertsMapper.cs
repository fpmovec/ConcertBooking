using AutoMapper;
using ConcertBackend.Models;

namespace ConcertBackend.Mapping
{
    public class ConcertsMapper : Profile
    {
        public ConcertsMapper()
        {
            CreateMap<ClassicViewModel, Classic>();
            CreateMap<PartyViewModel, Party>();
            CreateMap<OpenAirViewModel, OpenAir>();
        }
    }
}
