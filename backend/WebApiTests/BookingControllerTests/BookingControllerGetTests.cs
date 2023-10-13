
using AutoFixture;
using AutoMapper;
using ConcertBackend.Controllers;
using ConcertBackend.Models;
using ConcertBackend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace WebApiTests.BookingControllerTests
{
    public class BookingControllerGetTests
    {
        private Fixture _fixture;
        private Mock<IBookingRepository> _bookingRepoMock;
        private Mock<IMapper> _mapperMock;

        public BookingControllerGetTests()
        {
            _bookingRepoMock = new Mock<IBookingRepository>();
            _mapperMock = new Mock<IMapper>();
            _fixture = new Fixture();
            _mapperMock.Setup(b => b.Map<BookingViewModel, Booking>(It.IsAny<BookingViewModel>())).Returns(It.IsAny<Booking>());
        }

        [Fact]
        public async Task Get_AllBookingsByEmailAsync_ReturnOk()
        {
            var email = "10.maks.10k@gmail.com";
            var bookings = new List<Booking>()
            {
                new Booking { Email = email },
                new Booking { Email = "centaurea@gmail.com" },
                new Booking { Email = email },
            };
            _bookingRepoMock.Setup(b => b.GetAllBookingsByEmailAsync(email)).ReturnsAsync(bookings.Where(i => i.Email == email));
            var bookingController = new BookingController(_bookingRepoMock.Object, _mapperMock.Object);

            var result = await bookingController.GetAllBookingsByEmailAsync(email);
            var obj = result.Result as OkObjectResult;

            _bookingRepoMock.Verify();
            Assert.NotNull(obj);
            Assert.Equal(200, obj.StatusCode);
                 
        }
    }
}
