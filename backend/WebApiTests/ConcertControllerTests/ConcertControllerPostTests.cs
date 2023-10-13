
using AutoFixture;
using AutoMapper;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Classes;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace WebApiTests.ConcertControllerTests
{
    public class ConcertControllerPostTests
    {
        private Fixture _fixture;
        private Mock<IConcertRepository> _concertRepoMock;
        private Mock<IMapper> _mapperMock;

        public ConcertControllerPostTests()
        {
            _concertRepoMock = new Mock<IConcertRepository>();
            _mapperMock = new Mock<IMapper>();
            _fixture = new Fixture();

        }

        [Fact]
        public async Task Add_ClassicAsync_ReturnOk()
        {
            var classic = _fixture.Create<Classic>();
            var classicVM = _fixture.Create<ClassicViewModel>();
            _concertRepoMock.Setup(c => c.AddConcertAsync(classic));
            _mapperMock.Setup(m => m.Map<Classic>(classicVM)).Returns(classic);

            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);
            var actualAttribute = concertController.GetType().GetMethod("AddClassic").GetCustomAttributes(typeof(AuthorizeAttribute), true).FirstOrDefault();

            var result = await concertController.AddClassic(classicVM);
            var obj = result as OkResult;

            _concertRepoMock.Verify(m => m.AddConcertAsync(It.IsAny<Classic>()), Times.Once());
            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
            Assert.Equal(typeof(AuthorizeAttribute), actualAttribute.GetType());
            
        }

        [Fact]
        public async Task Add_ClassicAsync_ReturnBadRequest()
        {
            var classicVM = _fixture.Create<ClassicViewModel>();
            classicVM.Price = -1;
            var classic = _fixture.Create<Classic>();
            _mapperMock.Setup(m => m.Map<Classic>(It.IsAny<ClassicViewModel>())).Returns(classic);
            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);
            concertController.ModelState.AddModelError("key", "error message");

            var result = await concertController.AddClassic(classicVM);
            var obj = result as ObjectResult;
            
            Assert.NotNull(obj);
            Assert.Equal(400, obj.StatusCode);

        }

        [Fact]
        public async Task Add_NullClassicAsync_ReturnBadRequest()
        {
            _mapperMock.Setup(m => m.Map<Classic>(It.IsAny<ClassicViewModel>())).Returns(It.IsAny<Classic>);
            var concertController = new ConcertController(_concertRepoMock.Object, _mapperMock.Object);

            var result = await concertController.AddClassic(null);
            var obj = result as BadRequestResult;   

            Assert.NotNull(obj);
            Assert.Equal(400, obj.StatusCode);
        }
    }
}
