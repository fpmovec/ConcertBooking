using AutoFixture;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiTests.PromocodeControllerTests
{
    public class PromocodeControllerPostTests
    {
        private Mock<IPromocodesRepository> _promoRepoMock;
        private Fixture _fixture;

        public PromocodeControllerPostTests()
        {
            _fixture = new Fixture();
            _promoRepoMock = new Mock<IPromocodesRepository>();
        }

        [Fact]
        public async Task Add_PromocodeAsync_ReturnOk()
        {
            var promo = _fixture.Create<PromocodeViewModel>();
            _promoRepoMock.Setup(p => p.AddPromocodeAsync(new Promocode()
            {
                Code = promo.Code,
                Total = promo.Total,
            }));
            var promoController = new PromocodeController(_promoRepoMock.Object);

            var result = await promoController.AddPromocodeAsync(promo);
            var obj = result as OkResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public async Task Add_PromocodeAsync_ReturnBadRequest()
        {
            var promo = _fixture.Create<PromocodeViewModel>();
            _promoRepoMock.Setup(p => p.AddPromocodeAsync(new Promocode()
            {
                Code = promo.Code,
                Total = promo.Total,
            }));
            var promoController = new PromocodeController(_promoRepoMock.Object);

            var result = await promoController.AddPromocodeAsync(null);
            var obj = result as BadRequestResult;

            Assert.NotNull(obj);
            Assert.Equal(400, obj.StatusCode);
        }
    }
}
