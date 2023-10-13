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

namespace WebApiTests.BookingControllerTests
{
    public class BookingControllerDeleteTests
    {
        private Fixture _fixture;
        private Mock<IBookingRepository> _bookingRepoMock;
        private Mock<IMapper> _mapperMock;

        public BookingControllerDeleteTests()
        {
            _bookingRepoMock = new Mock<IBookingRepository>();
            _mapperMock = new Mock<IMapper>();
            _fixture = new Fixture();
            _mapperMock.Setup(b => b.Map<BookingViewModel, Booking>(It.IsAny<BookingViewModel>())).Returns(It.IsAny<Booking>());
        }

        [Fact]
        public async Task Delete_BookingAsync_ReturnOk()
        {
            int id = It.IsAny<int>();
            var booking = _fixture.Build<Booking>()
                .With(b => b.Id, id)
                .Create();
            _bookingRepoMock.Setup(b => b.GetBookingByIdAsync(id)).ReturnsAsync(booking);
            var bookingController = new BookingController(_bookingRepoMock.Object, _mapperMock.Object);

            var result = await bookingController.DeleteBookingAsync(id);
            var obj = result as OkResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public async Task Delete_BookingAsync_ReturnNotFound()
        {
            int id = It.IsAny<int>();
            _bookingRepoMock.Setup(b => b.GetBookingByIdAsync(id)).ReturnsAsync((Booking)null);
            var bookingController = new BookingController(_bookingRepoMock.Object, _mapperMock.Object);

            var result = await bookingController.DeleteBookingAsync(id);
            var obj = result as NotFoundResult;

            Assert.NotNull(obj);
            Assert.Equal(404, obj.StatusCode);
        }
    }
}
