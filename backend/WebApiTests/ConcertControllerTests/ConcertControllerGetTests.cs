using AutoFixture;
using AutoMapper;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace WebApiTests.ConcertControllerTests
{
    
    public class ConcertControllerGetTests 
    {
        private Mock<IConcertRepository> _concertsRepoMock;
        private Mock<IMapper> _mapperMock;
        private Fixture _fixture;

        public ConcertControllerGetTests()
        {
                _fixture = new Fixture();
                _concertsRepoMock = new Mock<IConcertRepository>();
                _mapperMock = new Mock<IMapper>();
                _mapperMock.Setup(m => m.Map<ClassicViewModel, Classic>(It.IsAny<ClassicViewModel>()))
                           .Returns(It.IsAny<Classic>());
        }

        [Fact]
        public async Task Get_AllConcertsAsync_ReturnOk()
        {
            var concerts = _fixture.CreateMany<Concert>(3).ToList();
            var classic = _fixture.Create<Classic>();
            _concertsRepoMock.Setup(c => c.GetConcertsAsync()).ReturnsAsync(concerts);
          
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetAllConcerts();
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj!.StatusCode);
        }

        [Fact]
        public async Task Get_AllConcertsAsync_ReturnNotFound()
        {
            _concertsRepoMock.Setup(c => c.GetConcertsAsync()).ReturnsAsync((List<Concert>?)null);
           
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetAllConcerts();
            var obj = result.Result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }

        [Fact]
        public async Task Get_AllClassicsAsync_ReturnOk()
        {
            var concerts = _fixture.CreateMany<Classic>(3).ToList();
            _concertsRepoMock.Setup(c => c.GetConcertsWithTypeAsync<Classic>()).ReturnsAsync(concerts);
          
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetAllClassics();
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
            Assert.Equal(typeof(List<Classic>), obj.Value!.GetType());
        }

        [Fact]
        public async Task Get_AllClassicsAsync_ReturnNotFound()
        {
            _concertsRepoMock.Setup(c => c.GetConcertsWithTypeAsync<Classic>()).ReturnsAsync((List<Classic>?)null);
         
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetAllClassics();
            var obj = result.Result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }

        [Fact]
        public async Task Get_AllPartiesAsync_ReturnOk()
        {
            var concerts = _fixture.CreateMany<Party>(3).ToList();
            _concertsRepoMock.Setup(c => c.GetConcertsWithTypeAsync<Party>()).ReturnsAsync(concerts);
          
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetAllParties();
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
            Assert.Equal(typeof(List<Party>), obj.Value!.GetType());
        }

        [Fact]
        public async Task Get_AllPartiesAsync_ReturnNotFound()
        {
            _concertsRepoMock.Setup(c => c.GetConcertsWithTypeAsync<Party>()).ReturnsAsync((List<Party>?)null);
        
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetAllParties();
            var obj = result.Result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }

        [Fact]
        public async Task Get_ClassicByIdAsync_ReturnOk()
        {
            var classic = _fixture.Create<Classic>();
            _concertsRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<Classic>(classic.Id)).ReturnsAsync(classic);
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetClassicById(classic.Id);
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
            Assert.Equivalent(classic, obj.Value);
        }

        [Fact]
        public async Task Get_ClassicByIdAsync_ReturnNotFound()
        {
            var id = It.IsAny<int>();
            _concertsRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<Classic>(id)).ReturnsAsync((Classic)null);
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetClassicById(id);
            var obj = result.Result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }

        [Fact]
        public async Task Get_PartyByIdAsync_ReturnOk()
        {
            var party = _fixture.Create<Party>();
            _concertsRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<Party>(party.Id)).ReturnsAsync(party);
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetPartyById(party.Id);
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
            Assert.Equivalent(party, obj.Value);
        }

        [Fact]
        public async Task Get_PartyByIdAsync_ReturnNotFound()
        {
            var id = It.IsAny<int>();
            _concertsRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<Party>(id)).ReturnsAsync((Party)null);
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetPartyById(id);
            var obj = result.Result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }

        [Fact]
        public async Task Get_OpenAirByIdAsync_ReturnOk()
        {
            var openAir = _fixture.Create<OpenAir>();
            _concertsRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<OpenAir>(openAir.Id)).ReturnsAsync(openAir);
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetOpenAirById(openAir.Id);
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
            Assert.Equivalent(openAir, obj.Value);
        }

        [Fact]
        public async Task Get_OpenairByIdAsync_ReturnNotFound()
        {
            var id = It.IsAny<int>();
            _concertsRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<OpenAir>(id)).ReturnsAsync((OpenAir)null);
            var concertsController = new ConcertController(_concertsRepoMock.Object, _mapperMock.Object);

            var result = await concertsController.GetClassicById(id);
            var obj = result.Result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }

    }
}
