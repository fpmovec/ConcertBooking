using AutoFixture;
using AutoMapper;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace WebApiTests.BookingControllerTests
{
    public class BookingControllerPostTests
    {
        private Fixture _fixture;
        private Mock<IBookingRepository> _bookingRepoMock;
        private Mock<IMapper> _mapperMock;

        public BookingControllerPostTests()
        {
            _bookingRepoMock = new Mock<IBookingRepository>();
            _mapperMock = new Mock<IMapper>();
            _fixture = new Fixture();
            _mapperMock.Setup(b => b.Map<BookingViewModel, Booking>(It.IsAny<BookingViewModel>())).Returns(It.IsAny<Booking>());
        }

        [Fact]
        public async Task Add_Booking_ReturnOk()
        {
            var bookingVM = _fixture.Create<BookingViewModel>();
            var booking = _fixture.Create<Booking>();
            _bookingRepoMock.Setup(b => b.AddBookingAsync(booking));
            _mapperMock.Setup(m => m.Map<Booking>(bookingVM)).Returns(booking);
            var bookingController = new BookingController(_bookingRepoMock.Object, _mapperMock.Object);

            var result = await bookingController.AddBookingAsync(bookingVM);
            var obj = result as OkResult;

            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
        }

        [Fact]
        public async Task Add_Booking_ReturnBadRequest()
        {
            var booking = _fixture.Create<Booking>();
            var bookingVM = _fixture.Create<BookingViewModel>();
            //_bookingRepoMock.Setup(b => b.AddBookingAsync(booking));
            var bookingController = new BookingController(_bookingRepoMock.Object, _mapperMock.Object);
            bookingController.ModelState.AddModelError("key", "message");

            var result = await bookingController.AddBookingAsync(bookingVM);
            var obj = result as BadRequestObjectResult;

            Assert.NotNull(obj);
            Assert.Equal(400, obj.StatusCode);

        }
    }
}
