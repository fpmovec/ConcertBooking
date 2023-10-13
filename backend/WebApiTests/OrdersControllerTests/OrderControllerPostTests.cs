using AutoFixture;
using AutoMapper;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace WebApiTests.OrdersControllerTests
{
    public class OrderControllerPostTests
    {
        private Fixture _fixture;
        private Mock<IOrderRepository> _orderRepoMock;
        private Mock<IMapper> _mapperMock;

        public OrderControllerPostTests()
        {
            _fixture = new Fixture();
            _mapperMock = new Mock<IMapper>();  
            _orderRepoMock = new Mock<IOrderRepository>();
        }

        [Fact]
        public async Task Add_OrderAsync_ReturnOk()
        {
            var orderVM = _fixture.Create<OrderViewModel>();
            var order = _fixture.Create<Order>();
            _orderRepoMock.Setup(o => o.AddOrderAsync(order));
            var ordersController = new OrdersController(_orderRepoMock.Object, _mapperMock.Object);

            var result = await ordersController.AddOrderAsync(orderVM);
            var obj = result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public async Task Add_OrderAsync_ReturnBadRequest()
        {
            var orderVM = _fixture.Create<OrderViewModel>();
            var ordersController = new OrdersController(_orderRepoMock.Object, _mapperMock.Object);
            ordersController.ModelState.AddModelError("key", "message");

            var result = await ordersController.AddOrderAsync(orderVM);
            var obj = result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(400, obj.StatusCode);
        }
    }
}
