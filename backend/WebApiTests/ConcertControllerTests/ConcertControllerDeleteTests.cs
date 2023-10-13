

using AutoFixture;
using AutoMapper;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace WebApiTests.ConcertControllerTests
{
    public class ConcertControllerDeleteTests
    {
        private Mock<IConcertRepository> _concertRepoMock;
        private Mock<IMapper> _mapperMock;
        private Fixture _fixture;

        public ConcertControllerDeleteTests()
        {
            _fixture = new Fixture();
            _mapperMock = new Mock<IMapper>();
            _concertRepoMock = new Mock<IConcertRepository>();
            _mapperMock.Setup(m => m.Map<ClassicViewModel, Classic>(It.IsAny<ClassicViewModel>()))
                          .Returns(It.IsAny<Classic>());
        }

        [Fact]
        public async Task Delete_ClassicById_ReturnOk()
        {
            var classic = _fixture.Create<Classic>();
            _concertRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<Classic>(It.IsAny<int>())).ReturnsAsync(classic);
            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);
            var actualAttribute = concertController.GetType().GetMethod("AddClassic").GetCustomAttributes(typeof(AuthorizeAttribute), true).FirstOrDefault();

            var result = await concertController.DeleteClassic(It.IsAny<int>());
            var obj = result as OkResult;

            _concertRepoMock.Verify(m => m.DeleteConcertAsync(It.IsAny<Classic>()), Times.Once());
            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
            Assert.Equal(typeof(AuthorizeAttribute), actualAttribute.GetType());
        }


        [Fact]
        public async Task Delete_ClassicById_ReturnNotFound()
        {
            var classic = _fixture.Create<Classic>();
            _concertRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<Classic>(It.IsAny<int>())).ReturnsAsync((Classic)null);
            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);

            var result = await concertController.DeleteClassic(It.IsAny<int>());
            var obj = result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }

        [Fact]
        public async Task Delete_PartyById_ReturnOk()
        {
            var party = _fixture.Create<Party>();
            _concertRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<Party>(It.IsAny<int>())).ReturnsAsync(party);
            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);

            var result = await concertController.DeleteParty(It.IsAny<int>());
            var obj = result as OkResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }


        [Fact]
        public async Task Delete_PartyById_ReturnNotFound()
        {
            var party = _fixture.Create<Party>();
            _concertRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<Party>(It.IsAny<int>())).ReturnsAsync((Party)null);
            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);

            var result = await concertController.DeleteParty(It.IsAny<int>());
            var obj = result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }

        [Fact]
        public async Task Delete_OpenAirById_ReturnOk()
        {
            var openAir = _fixture.Create<OpenAir>();
            _concertRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<OpenAir>(It.IsAny<int>())).ReturnsAsync(openAir);
            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);

            var result = await concertController.DeleteOpenAir(It.IsAny<int>());
            var obj = result as OkResult;

            _concertRepoMock.Verify();
            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }


        [Fact]
        public async Task Delete_OpenAirById_ReturnNotFound()
        {
            var openAir = _fixture.Create<OpenAir>();
            _concertRepoMock.Setup(c => c.GetConcertByIdWithTypeAsync<OpenAir>(It.IsAny<int>())).ReturnsAsync((OpenAir)null);
            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);

            var result = await concertController.DeleteOpenAir(It.IsAny<int>());
            var obj = result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }
    }
}
