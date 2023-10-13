
using AutoFixture;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace WebApiTests.PromocodeControllerTests
{
    public class PromocodeControllerGetTests
    {
        private Mock<IPromocodesRepository> _promoRepoMock;
        private Fixture _fixture;

        public PromocodeControllerGetTests()
        {
            _fixture = new Fixture();
            _promoRepoMock = new Mock<IPromocodesRepository>();
        }

        [Fact]
        public async Task Get_PromocodesAsync_ReturnOk()
        {
            var promocodes = _fixture.CreateMany<Promocode>(5);
            _promoRepoMock.Setup(p => p.GetPromocodesAsync()).ReturnsAsync(promocodes);
            var promoController = new PromocodeController(_promoRepoMock.Object);

            var result = await promoController.GetPromocodesAsync();
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public async Task Get_EmptyPromocodesAsync_ReturnOk()
        {
            _promoRepoMock.Setup(p => p.GetPromocodesAsync()).ReturnsAsync(new List<Promocode>());
            var promoController = new PromocodeController(_promoRepoMock.Object);

            var result = await promoController.GetPromocodesAsync();
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
            Assert.True((obj.Value as List<Promocode>).Count == 0);
        }

        [Fact]
        public async Task Get_PromocodeByIdAsync_ReturnOk()
        {
            int id = It.IsAny<int>();
            var promo = _fixture.Build<Promocode>()
                                .With(p => p.Id, id)
                                .Create();
            _promoRepoMock.Setup(p => p.GetPromocodeByIdAsync(id)).ReturnsAsync(promo);
            var promoController = new PromocodeController(_promoRepoMock.Object);

            var result = await promoController.GetPromocodeByIdAsync(id);
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public async Task Get_PromocodeByIdAsync_ReturnNotFound()
        {
            int id = It.IsAny<int>();
            _promoRepoMock.Setup(p => p.GetPromocodeByIdAsync(id)).ReturnsAsync((Promocode)null);
            var promoController = new PromocodeController(_promoRepoMock.Object);

            var result = await promoController.GetPromocodeByIdAsync(id);
            var obj = result.Result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }
    }
}
