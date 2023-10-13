using AutoFixture;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace WebApiTests.PromocodeControllerTests
{
    public class PromocodeControllerDeleteTests
    {
        private Mock<IPromocodesRepository> _promoRepoMock;
        private Fixture _fixture;

        public PromocodeControllerDeleteTests()
        {
            _fixture = new Fixture();
            _promoRepoMock = new Mock<IPromocodesRepository>();
        }

        [Fact]
        public async Task Delete_PromocodeAsync_ReturnOk()
        {
            int id = It.IsAny<int>();
            var promo = _fixture.Build<Promocode>()
                                .With(p => p.Id, id)
                                .Create();
            _promoRepoMock.Setup(p => p.GetPromocodeByIdAsync(id)).ReturnsAsync(promo);
            var promoController = new PromocodeController(_promoRepoMock.Object);

            var result = await promoController.DeletePromocodeAsync(id);
            var obj = result as OkResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public async Task Delete_PromocodeAsync_ReturnNotFound()
        {
            int id = It.IsAny<int>();
            _promoRepoMock.Setup(p => p.GetPromocodeByIdAsync(id)).ReturnsAsync((Promocode)null);
            var promoController = new PromocodeController(_promoRepoMock.Object);

            var result = await promoController.DeletePromocodeAsync(id);
            var obj = result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }
    }
}
