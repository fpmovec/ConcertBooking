using AutoFixture;
using AutoMapper;
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

namespace WebApiTests.OrdersControllerTests
{
    public class OrderControllerGetTests
    {
        private Fixture _fixture;
        private Mock<IOrderRepository> _orderRepoMock;
        private Mock<IMapper> _mapperMock;

        public OrderControllerGetTests()
        {
            _orderRepoMock = new Mock<IOrderRepository>();
            _mapperMock = new Mock<IMapper>();
            _fixture = new Fixture();
            _mapperMock.Setup(o => o.Map<OrderViewModel, Order>(It.IsAny<OrderViewModel>())).Returns(It.IsAny<Order>());
        }

        [Fact]
        public async Task Get_OrdersByEmailAsync_ReturnOk()
        {
            string email = "10.maks.10k@gmail.com";
            var orders = _fixture.Build<Order>()
                                 .With(o => o.Email, email)
                                 .CreateMany(5);
            _orderRepoMock.Setup(o => o.GetOrdersByEmailAsync(email)).ReturnsAsync(orders);
            var ordersController = new OrdersController(_orderRepoMock.Object, _mapperMock.Object);

            var result = await ordersController.GetOrdersByEmail(email);
            var obj = result.Result as ObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }
    }
}
